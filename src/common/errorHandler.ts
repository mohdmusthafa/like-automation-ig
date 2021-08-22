import chalk from "chalk";
import { IgLoginRequiredError, IgUserHasLoggedOutError, IgCheckpointError } from 'instagram-private-api';
import { unlinkSync } from 'fs';
import nconf from 'nconf';

const accountReLoginAndExit = () => {
    let tokenPath: string = nconf.get("tokenPath");
    unlinkSync(tokenPath);
    console.log(chalk.red("account relogin required."));
    process.exit();
  };

const handleError = (error: any) => {
    if (
        error instanceof IgLoginRequiredError ||
        error instanceof IgUserHasLoggedOutError ||
        error instanceof IgCheckpointError
      ) {
        accountReLoginAndExit();
      }
}

export default handleError;