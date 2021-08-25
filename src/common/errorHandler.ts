import chalk from "chalk";
import {
  IgLoginRequiredError,
  IgUserHasLoggedOutError,
  IgCheckpointError,
  IgLoginBadPasswordError,
} from "instagram-private-api";
import { unlinkSync } from "fs";
import nconf from "nconf";
import messages from "./messages";
import PubSub from "pubsub-js";

const gracefullyShutdown = () => {
  messages.graceExit()
  nconf.reset();
  PubSub.clearAllSubscriptions();
  process.exit(1);
}


const accountReLoginAndExit = () => {
  let tokenPath: string = nconf.get("tokenPath");
  unlinkSync(tokenPath);
  messages.accountReLogin();
  gracefullyShutdown();
};

const loginFailed = (error: any) => {
  messages.error(error.message);
  messages.loginFailed();
  gracefullyShutdown()
};

const handleError = (error: any) => {
  if (
    error instanceof IgLoginRequiredError ||
    error instanceof IgUserHasLoggedOutError ||
    error instanceof IgCheckpointError
  ) {
    accountReLoginAndExit();
  } else if (error instanceof IgLoginBadPasswordError) {
    loginFailed(error);
  }
};

export default handleError;
