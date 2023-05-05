import request from "./request"

const apiKey = 'xcsDSO3NqsAV3YxyQ2zVAgA64wWoqK6X'

//获取地址KEY GET /locations/v1/cities/search?apikey=xcsDSO3NqsAV3YxyQ2zVAgA64wWoqK6X&q=Versailles HTTP/1.1
export const reqGetLocationKey = (city) => request({ url: `/locations/v1/cities/search?apikey=${apiKey}&q=${city}`, method: 'get'})

//获取地区信息 GET/currentconditions/v1/106577?apikey=xcsDSO3NqsAV3YxyQ2zVAgA64wWoqK6X
export const reqGetLocationInfo = (cityId) => request({ url: `/currentconditions/v1/${cityId}?apikey=${apiKey}`, method: 'get'})