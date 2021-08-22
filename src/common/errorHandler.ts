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

const accountReLoginAndExit = () => {
  let tokenPath: string = nconf.get("tokenPath");
  unlinkSync(tokenPath);
  messages.accountReLogin();
  process.exit();
};

const loginFailed = (error: any) => {
  messages.error(error.message);
  messages.loginFailed();
  process.exit();
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
