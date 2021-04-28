
/* eslint-disable */

/**
 * api接口统一管理
 */
import { postcssVersion } from 'postcss-url';
import { get, post } from './http';

export const getLocation = data => get('http://ip-api.com/json/?fields=61439', data)

export const getWeatherCondition = data => get('https://devapi.qweather.com/v7/weather/now?', data)

export const getAirCondition = data => get('https://devapi.qweather.com/v7/air/now?', data)
