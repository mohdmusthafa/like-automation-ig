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
          messages.foundJustNowPost();

          const status = await like(media, ig).catch((error: any) => {
            messages.error(error.message);
            messages.likeFailed();
            handleError(error);
          });

          if (status) messages.likeSuccess(media.user.username);
        } else {
          const postedTime = moment(
            new Date(media.taken_at * 1000).getTime()
          ).fromNow();
          messages.posted(postedTime);
        }
      }
    }

    const nextRun = moment(
      new Date().getTime() + parseInt(sleep) * 1000
    ).fromNow();
    messages.nextRun(nextRun);

    await new Promise((r) => setTimeout(r, parseInt(sleep) * 1000));
  }
};

export const getMedias = async (ig: any) => {
  return ig.feed
    .timeline()
    .items()
    .catch((error: { message: unknown }) => {
      messages.error(error.message);
      handleError(error);
    });
};
