import chalk from "chalk";
import PubSub from 'pubsub-js';

const dashboardEnabled = true;
const ANSI_ESCAPE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g


const dashboardLogger = (message: any) => {
    console.log(message);
    // const chalkEscapedString = message.replace(ANSI_ESCAPE, "")
    PubSub.publish("LOGGER", message);
}

let log = dashboardEnabled ? dashboardLogger : console.log;

const successMessages = {
    foundJustNowPost: () => log(chalk.blueBright("found just now post.")),
    likeSuccess: (username: string) => log(chalk.green(`Post liked successfully ===> ${username}`)),
    successLogin: () => log(chalk.green("successfully logged in.")),
    tokenSaved: () => log(chalk.greenBright("Token successfully saved.")),
    loggedOut: () => log(chalk.green("logged out successfully!"))
}

const commonMessages = {
    posted: (time: any) => log(chalk.yellow(`posted ${time}`)),
    nextRun: (time: any) => log(chalk.magenta(`next run ${time}`)),
    savingToken: () => log(chalk.yellow("Saving token")),
    tokenExists: () => log(chalk.yellowBright("Token exist.")),
    noDashboard: () => log(chalk.blue("Dashboard disabled 💔, Run with --dashboard true for dashboard 💻 🚀")),
    graceExit: () => log(chalk.whiteBright("Gracefully exiting... 🌞"))
}

const errorMessages = {
    error: (message: any) => log(chalk.red(message)),
    likeFailed: () => log(chalk.redBright("Post like failed.")),
    accountReLogin: () => log(chalk.red("Account relogin required")),
    loginFailed: () => log(chalk.red("Login Failed, Try Again!"))
}


const messages = {...successMessages, ...commonMessages, ...errorMessages};

export default messages