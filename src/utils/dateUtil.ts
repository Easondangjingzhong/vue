/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
// import moment from 'moment';
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_MINUTE_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDateMinute(
  date: dayjs.ConfigType = undefined,
  format = DATE_MINUTE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function currentDate(format = DATE_FORMAT): string {
  return dayjs().format(format);
}
export const dateUtil = dayjs;
