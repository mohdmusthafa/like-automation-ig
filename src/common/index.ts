import nconf from "nconf";
import { IgLoginRequiredError, IgUserHasLoggedOutError, IgCheckpointError } from 'instagram-private-api'
import { unlinkSync } from "fs";
import chalk from "chalk";
import moment from "moment";

export const accountReLoginAndExit = () => {
  let tokenPath: string = nconf.get("tokenPath");
  unlinkSync(tokenPath);
  console.log(chalk.red("account relogin required."));
  process.exit();
};

export const likeMedia = async (medias:any, ig:any) => {
    let sleep = nconf.get('sleep')
  if (medias?.length) {
    for (const media of medias) {
      if (!media.has_liked) {
        if (
          moment(new Date(media.taken_at * 1000).getTime()).isAfter(
            moment(new Date().getTime() - 18000000)
          )
        ) {
          console.log(chalk.blueBright("found just now post."));

          let { status } = await ig.media
            .like({
              mediaId: media.id,
              moduleInfo: { module_name: "feed_timeline" },
              d: 0,
            })
            .catch((error:any) => {
              console.log(chalk.red(error.message));

              console.log(chalk.redBright("Post like failed."));

              if (
                error instanceof IgLoginRequiredError ||
                error instanceof IgUserHasLoggedOutError ||
                error instanceof IgCheckpointError
              ) {
                accountReLoginAndExit();
              }
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
