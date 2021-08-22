import chalk from "chalk";

const { log } = console;

const successMessages = {
    foundJustNowPost: () => log(chalk.blueBright("found just now post.")),
    likeSuccess: (username: string) => log(chalk.green(`Post liked successfully ===> ${username}`)),
    successLogin: () => log(chalk.green("successfully logged in.")),
    tokenSaved: () => log(chalk.greenBright("Token successfully saved.")),
}

const commonMessages = {
    posted: (time: any) => log(chalk.yellow(`posted ${time}`)),
    nextRun: (time: any) => log(chalk.magenta(`next run ${time}`)),
    savingToken: () => log(chalk.yellow("Saving token")),
    tokenExists: () => log(chalk.yellowBright("Token exist."))
}

const errorMessages = {
    error: (message: any) => log(chalk.red(message)),
    likeFailed: () => log(chalk.redBright("Post like failed.")),
    accountReLogin: () => log(chalk.red("Account relogin required")),
    loginFailed: () => log(chalk.red("Login Failed, Try Again!"))
}


const messages = {...successMessages, ...commonMessages, ...errorMessages};

export default messages