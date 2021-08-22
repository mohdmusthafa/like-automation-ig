import prompt from "prompt";
import nconf from 'nconf';
import colors from "colors/safe";
import {
  IgApiClient,
  IgCheckpointError,
  IgLoginRequiredError,
  IgUserHasLoggedOutError,
} from "instagram-private-api";
import chalk from "chalk";
import {
  existsSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
  mkdirSync,
} from "fs";
import moment from "moment";
import {
    UserInput
} from './app.types'
import { accountReLoginAndExit, likeMedia } from './common'

prompt.start({ delimiter: colors.green(" >") });
prompt.message = "";

nconf.use('memory');


(async () => {
  let {
    username,
    password,
    sleep,
  }: UserInput = await prompt.get([
    {
      name: "username",
      required: true,
      message: "username is not allowed to be empty",
      description: colors.white("Enter your username"),
    },
    {
      name: "password",
      required: true,
      message: "password is not allowed to be empty",
      description: colors.white("Enter your password"),
    },
    {
      name: "sleep",
      required: true,
      message: "sleep is not allowed to be empty",
      description: colors.white("Enter sleep in seconds"),
      type: "number",
    },
  ]);

  nconf.set('sleep', sleep)

  const ig = new IgApiClient();
  ig.state.generateDevice(username);

  let tokenPath = `${__dirname}/token/${username}.json`;
  let tokenDirectory = `${__dirname}/token`;

  
  nconf.set('tokenPath', tokenPath);
  nconf.set('tokenDirectory', tokenDirectory);


  if (!existsSync(tokenDirectory)) {
    mkdirSync(tokenDirectory);
  }

  if (!existsSync(tokenPath)) {
    await ig.account.login(username, password).catch((error) => {
      console.log(chalk.red(error.message));
      console.log(chalk.red("Login failed try again !."));
      process.exit();
    });

    console.log(chalk.green("successfully logged in."));

    console.log(chalk.yellow("Saving token"));

    const serialized = await ig.state.serialize();
    delete serialized.constants;
    writeFileSync(tokenPath, JSON.stringify(serialized));

    console.log(chalk.greenBright("Token successfully saved."));
  } else {
    console.log(chalk.yellowBright("Token exist."));

    let token = readFileSync(tokenPath, { encoding: "utf-8" });
    await ig.state.deserialize(token);
    console.log(chalk.green("successfully logged in."));
  }

  while (true) {
    let medias = await ig.feed
      .timeline()
      .items()
      .catch((error) => {
        console.log(chalk.red(error.message));

        if (
          error instanceof IgLoginRequiredError ||
          error instanceof IgUserHasLoggedOutError ||
          error instanceof IgCheckpointError
        ) {
          accountReLoginAndExit()
        }
      });

      await likeMedia(medias, ig);
  }
})();


