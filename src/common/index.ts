import nconf from "nconf";
import { unlinkSync } from 'fs';
import chalk from "chalk";

export const accountReLoginAndExit = () => {
    let tokenPath: string = nconf.get('tokenPath');
    unlinkSync(tokenPath);
    console.log(chalk.red("account relogin required."));
    process.exit();
}