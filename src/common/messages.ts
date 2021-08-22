import chalk from "chalk";

const { log } = console;

const successMessages = {
    foundJustNowPost: () => log(chalk.blueBright("found just now post.")),
    likeSuccess: (username: string) => log(chalk.green(`Post liked successfully ===> ${username}`)),
}

const commonMessages = {
    posted: (time: any) => log(chalk.yellow(`posted ${time}`)),
    nextRun: (time: any) => log(chalk.magenta(`next run ${time}`)),
}

const errorMessages = {
    error: (message: any) => log(chalk.red(message)),
    likeFailed: () => log(chalk.redBright("Post like failed."))
}


const messages = {...successMessages, ...commonMessages, ...errorMessages};

export default messages