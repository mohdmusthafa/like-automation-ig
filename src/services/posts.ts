import moment from "moment";

export const checkIsJustNow = (media: any) => {
  const mediaTime = new Date(media.taken_at * 1000).getTime();
  const justNowTime = new Date().getTime() - 60 * 60 * 60 * 24 * 7 * 3;
  return moment(mediaTime).isAfter(moment(justNowTime)) ? true : false;
};
