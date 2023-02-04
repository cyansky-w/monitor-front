// 项目中用到的所有地址
const urls = {
    MANAGR : {
        REGISTER : '/enhance/userInfo/userRegister',
        LOGIIN : '/enhance/userInfo/userRegister',
        CREATE_TEAM : '/enhance/team/createTeam',
        ADD_MEBRE : '/enhance/team/addTeamMember',
        CRATEE_TEAM : '/enhance/project/createProject',
        LIST_TEEAM : '',
    },
    ERROR:{
        JS_PROMISE:{
            NUMBER: '/enhance/error/numberOfJsAndPromiseError',
            LIST:'/enhance/main/searchDataByDesignation'
        },
        API:{
            NUMBER: '/enhance/error/numberOfApiError',
            LIST:'/enhance/error/searchApiErrorDataByDesignation'
        },
        RESOURCE:{
            NUMBER: '/enhance/error/numberOfResourceError',
            LIST:'/enhance/main/searchDataByDesignation',
            TODY:'/enhance/error/numberOfResourceErrorTodayData'
        },
        OVER_VIEW:{
            PROJECT_SCORE: '/enhance/error/getProjectScore',
            ERROR_24H: '/enhance/error/getTwentyForeHourError',
        }
    },
    USER:{
        OVER_VIEW: {
            STATISTICAL_30: '/enhance/user/statisticsThirtyDaysInUser',
            PV_24H: '/enhance/user/getTwentyFourHourPv',
            UV_24H: '/enhance/user/getTwentyFourHourUv',
            NEW_USER_24H: '/enhance/user/getTwentyFourHourNewUser',
            AVG_STAY_10H: '/enhance/user/getTenDaysUserAvgStay',
            NEXT_DAY_10H: '/enhance/user/getTenDaysNewUserInNextDay',
            TOP_URL: '/enhance/user/getTopByUrl',
            TOP_RESOURCEURL: '/enhance/user/getTopByResourceUrl',
            TOP_CITY: '/enhance/user/getTopByCity',
            TOP_OS: '/enhance/user/getTopByOS',
            TOP_BROWSER: '/enhance/user/getTopByBrowser',
            TOP_SCREEN: '/enhance/user/getTopByScreen',
            TOP_COUNTRY: '/enhance/user/getTopByCountry'
        },
        
    },
    PROJECT:{
        APP_TRIFIC:'/enhance/project/applicationTraffic',
    },
    PERFORMANCE:{
        OVER_VIEW: {
            PAGE_AVG_TIME:'/enhance/performance/getPageAVGTime',
            API_AVG_TIME:'/enhance/performance/getApiAVGTime',
            Page_Number_7D_By_Sub: '/enhance/performance/getPageNumberInSevenDaysBySub',
            API_Number_7D_By_Sub: '/enhance/performance/getApiNumberInSevenDaysBySub'
        }

    }

};
export default urls