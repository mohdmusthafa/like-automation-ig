import nconf from "nconf";
import chalk from "chalk";
import moment from "moment";
import handleError from "./errorHandler";
import messages from "./messages";
import { checkIsJustNow, like } from "../services";

export * from "./types";

export const likeMedia = async (medias: any, ig: any) => {
  let sleep = nconf.get("sleep");
  if (medias?.length) {
    for (const media of medias) {
      if (!media.has_liked) {
        if (checkIsJustNow(media)) {
          messages.foundJustNowPost()
          
          const status = await like(media, ig).catch((error: any) => {
            console.log(chalk.red(error.message));
            console.log(chalk.redBright("Post like failed."));
            handleError(error);
          });

          if (status) {
            console.log(
              chalk.green(
                `Post liked successfully ===> ${media.user.username} `
              )
            );
          }
        } else {
          console.log(
            chalk.yellow(
              `posted ${moment(
                new Date(media.taken_at * 1000).getTime()
              ).fromNow()}`
            )
          );
        }
      }
    }

    console.log(
      chalk.magenta(
        `next run ${moment(
          new Date().getTime() + parseInt(sleep) * 1000
        ).fromNow()}`
      )
    );
    await new Promise((r) => setTimeout(r, parseInt(sleep) * 1000));
  }
};

export const getMedias = async (ig: any) => {
  return ig.feed
    .timeline()
    .items()
    .catch((error: { message: unknown }) => {
      console.log(chalk.red(error.message));
      handleError(error);
    });
};
