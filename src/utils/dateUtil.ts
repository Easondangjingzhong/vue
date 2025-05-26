/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
// import moment from 'moment';
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_MINUTE_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';
/**
 * 格式化日期
 * @param date 
 * @param format 'YYYY-MM-DD HH:mm:ss'
 * @returns 
 */
export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}
/**
 * 格式化日期
 * @param date 
 * @param format 'YYYY-MM-DD HH:mm'
 * @returns 
 */
export function formatToDateMinute(
  date: dayjs.ConfigType = undefined,
  format = DATE_MINUTE_FORMAT,
): string {
  return dayjs(date).format(format);
}
/**
 * 格式化日期
 * @param date 
 * @param format 'YYYY-MM-DD'
 * @returns 
 */
export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}
/**
 * 当前日期
 * @param date 
 * @param format 'YYYY-MM-DD'
 * @returns 
 */
export function currentDate(format = DATE_FORMAT): string {
  return dayjs().format(format);
}
/**
 * 当前日期
 * @param date 
 * @param format 'YYYY-MM-DD'
 * @returns 
 */
export function formatDateToMonth(month): string {
  return (month - 0 < 10 ? '0' + (+month) : month);
}
export const dateUtil = dayjs;
