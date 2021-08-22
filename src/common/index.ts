import nconf from "nconf";
import moment from "moment";
import handleError from "./errorHandler";
import messages from "./messages";
import { checkIsJustNow, like } from "../services";

export * from "./types";

const scheduleNextRun = () => {
  let sleep = nconf.get("sleep");
  const nextRun = moment(
    new Date().getTime() + parseInt(sleep) * 1000
  ).fromNow();
  messages.nextRun(nextRun);
  return new Promise((r) => setTimeout(r, parseInt(sleep) * 1000));
}

export const likeMedia = async (medias: any, ig: any) => {
  if (medias?.length) {
    for (const media of medias) {
      if (!media.has_liked) {
        if (checkIsJustNow(media)) {
          messages.foundJustNowPost();
          try {
            const status = await like(media, ig);
            if (status) messages.likeSuccess(media.user.username);
          } catch (error) {
            messages.error(error.message);
            messages.likeFailed();
            handleError(error);
          }
        } else {
          const postedTime = moment(
            new Date(media.taken_at * 1000).getTime()
          ).fromNow();
          messages.posted(postedTime);
        }
      }
    }

    await scheduleNextRun()
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

export const login = async (username: string, password: string, ig: any) => {
  try {
    await ig.account.login(username, password)
  } catch (error) {
    handleError(error)
  }
}