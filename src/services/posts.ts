import moment from "moment";
import nconf from 'nconf';

export const checkIsJustNow = (media: any) => {
  const mediaTime = new Date(media.taken_at * 1000).getTime();
  const justNowTime = new Date().getTime() - nconf.get('JUST_NOW_TIME')
  return moment(mediaTime).isAfter(moment(justNowTime)) ? true : false;
};
