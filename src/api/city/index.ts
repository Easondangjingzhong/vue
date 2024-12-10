//import { ResInfoList } from './model';
import { get } from '/@/utils/http';

enum URL {
  city_country = '/candidate/query-city-country.action',
  city_province = '/candidate/query-city-province.action',
  city_cheiese_city = '/candidate/query-city-Cheiese-city.action',
}
const country = async () =>
  get<any>({ url: URL.city_country });
const province = async () =>
  get<any>({ url: URL.city_province });
const cheieseCity = async () =>
  get<any>({ url: URL.city_cheiese_city });
export default { province,country,cheieseCity };
