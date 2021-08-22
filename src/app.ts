import prompt from "prompt";
import nconf from "nconf";
import colors from "colors/safe";
import {
  IgApiClient,
} from "instagram-private-api";
import chalk from "chalk";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from "fs";
import { likeMedia, getMedias, UserInput, login } from "./common";
import { getCredentials } from "./helpers";
import messages from "./common/messages";

prompt.start({ delimiter: colors.green(" >") });
prompt.message = "";

nconf.use("memory");

(async () => {
  
  const { username, password, sleep } = await getCredentials();
  nconf.set("sleep", sleep);

  const ig = new IgApiClient();
  ig.state.generateDevice(username);

  let tokenPath = `${__dirname}/token/${username}.json`;
  let tokenDirectory = `${__dirname}/token`;

  nconf.set("tokenPath", tokenPath);
  nconf.set("tokenDirectory", tokenDirectory);

  if (!existsSync(tokenDirectory)) {
    mkdirSync(tokenDirectory);
  }

  if (!existsSync(tokenPath)) {
    await login(username, password, ig);

    messages.successLogin()
    messages.savingToken()

    const serialized = await ig.state.serialize();
    delete serialized.constants;
    writeFileSync(tokenPath, JSON.stringify(serialized));

    messages.tokenSaved()
  } else {
    messages.tokenExists()

    let token = readFileSync(tokenPath, { encoding: "utf-8" });
    await ig.state.deserialize(token);

    messages.successLogin()
  }

  while (true) {
    let medias = await getMedias(ig);
    await likeMedia(medias, ig);
  }
  
})();
