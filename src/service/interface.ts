import ApiService from '@/service/api';

import urls from './url'



const apis={
    error: {
        jsPromise:{
            getNumber:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.JS_PROMISE.NUMBER, params)
            },
            getList:(params:{projectId: string, type?: 'jsError'|'promiseError'|'custommessage', timestamp?: Date|number, timeType?: 'days'|'hours'|'minutes', env?: string, range?: number, pageSize?: number, pageNum?: number})=>{
                return ApiService.get(urls.ERROR.JS_PROMISE.LIST, params)
            },
        },
        api:{
            getNumber:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.API.NUMBER,params)
            },
            getList:(params:{projectId:string,timestamp:Date|number,env?: string, timeType?:'days'|'hours'|'minutes', range?: number, pageSize?: number, pageNum?: number})=>{
                return ApiService.get(urls.ERROR.API.LIST,params)
            },
        },
        resource:{
            getNumber:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.RESOURCE.NUMBER,params)
            },
            getList:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.RESOURCE.LIST,params)
            },
            getTody:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.RESOURCE.TODY,params)
            },
        },
        overView: {
            getProjectScore:(params:{projectId:string,timestamp:Date|number,env?: string})=>{
                return ApiService.get(urls.ERROR.OVER_VIEW.PROJECT_SCORE,params)
            },
            getJsError24h:(params:{projectId:string,timestamp:Date|number,env?: string, errorType?:string})=>{
                params.errorType = 'js';
                return ApiService.get(urls.ERROR.OVER_VIEW.ERROR_24H,params)
            },
            getCustomError24h:(params:{projectId:string,timestamp:Date|number,env?: string, errorType?:string})=>{
                params.errorType = 'customMessage';
                return ApiService.get(urls.ERROR.OVER_VIEW.ERROR_24H,params)
            },
            getResourceError24h:(params:{projectId:string,timestamp:Date|number,env?: string, errorType?:string})=>{
                params.errorType = 'resourceError';
                return ApiService.get(urls.ERROR.OVER_VIEW.ERROR_24H,params)
            },
            getApiError24h:(params:{projectId:string,timestamp:Date|number,env?: string, errorType?:string})=>{
                params.errorType = 'apiError';
                return ApiService.get(urls.ERROR.OVER_VIEW.ERROR_24H,params)
            },
            getPromiseError24h:(params:{projectId:string,timestamp:Date|number, env?: string, errorType?:string})=>{
                params.errorType = 'promise';
                return ApiService.get(urls.ERROR.OVER_VIEW.ERROR_24H,params)
            },
        }
    },
    project:{
        getAppTrific:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
            return ApiService.get(urls.PROJECT.APP_TRIFIC,params)
        }
    },
    user:{
        overView: {
            getStatistical30D:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.STATISTICAL_30,params)
            },
            getPv24H:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.PV_24H,params)
            },
            getUv24H:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.UV_24H,params)
            },
            getNewUser24H:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.NEW_USER_24H,params)
            },
            getAvgStay10H:(params:{projectId:string, timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.AVG_STAY_10H,params)
            },
            getNextDay10H:(params:{projectId:string,timestamp:Date|number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.NEXT_DAY_10H,params)
            },
            getTopUrl:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_URL,params)
            },
            getTopByResourceUrl:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_RESOURCEURL,params)
            },
            getTopCity:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_CITY,params)
            },
            getTopOS:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_OS,params)
            },
            getTopBrowser:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_BROWSER,params)
            },
            getTopScreen:(params:{projectId:string,appointNumber:number,env?:string})=>{
                return ApiService.get(urls.USER.OVER_VIEW.TOP_SCREEN,params)
            },
            getTopByCountry:(params: { projectId: string, isWorld: 0|1, appointNumber?: number,  timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.USER.OVER_VIEW.TOP_COUNTRY, params)
            },
        },
        visit:{
            getList:(params: { projectId: string, timestamp: Date|number, pageSize: number, numSize: number, ip?: string ,}) => {
                return ApiService.get(urls.USER.VISIT.LIST, params)
            },
            getPageLoadInfo:(params: { mainId: string }) => {
                return ApiService.get(urls.USER.VISIT.PAGE_LOAD, params)
            },
            getApiLoadInfo:(params: { mainId: string }) => {
                return ApiService.get(urls.USER.VISIT.API_LOAD, params)
            },
            getActionList:(params: { mainId: string }) => {
                return ApiService.get(urls.USER.VISIT.ACTION, params)
            },
        }
    },
    performance:{
        overView: {
            getPageAVGTime: (params: { projectId: string,  timestamp:Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.OVER_VIEW.PAGE_AVG_TIME,params)
            },
            getApiAVGTime: (params: { projectId: string,  timestamp:Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.OVER_VIEW.API_AVG_TIME,params)
            },
            getPageNumberInSevenDaysBySub: (params: { projectId: string,  timestamp:Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.OVER_VIEW.Page_Number_7D_By_Sub, params)
            },
            getApiNumberInSevenDaysBySub: (params: { projectId: string,  timestamp:Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.OVER_VIEW.API_Number_7D_By_Sub, params)
            }
        },
        api: {
            getApiNumberAndPercentage:(params: { projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.API.RANGE_NUMBER_PERCENTAGE, params)
            },
            getApiNumber:(params: { projectId: string, sub: number, timestamp?: Date|number, env?: string, timeType?: 'days'|'hours'|'minutes', range: number }) => {
                return ApiService.get(urls.PERFORMANCE.API.NUMBER, params)
            },
            getApiMessage: (params: { projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.API.MESSAGE, params)
            },
            getApiInfo: (params: { address: string, projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.API.INFO, params)
            }
        },
        page: {
            getPageNumberAndPercentage:(params: { projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.PAGE.RANGE_NUMBER_PERCENTAGE, params)
            },
            getPageNumber:(params: { projectId: string, sub: number, timestamp?: Date|number, env?: string, timeType?: 'days'|'hours'|'minutes', range: number }) => {
                return ApiService.get(urls.PERFORMANCE.PAGE.NUMBER, params)
            },
            getPageMessage: (params: { projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.PAGE.MESSAGE, params)
            },
            getPageInfo: (params: { url: string, projectId: string, sub: number, timestamp?: Date|number, env?: string }) => {
                return ApiService.get(urls.PERFORMANCE.PAGE.INFO, params)
            }
        }
    }
    
    
}
export default apis;