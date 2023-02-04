import { de } from "element-plus/es/locale";
import {tracker} from "../utils/tracker";

export function proxyFetch(){
    if (window.fetch) {
        let oldFetch = window.fetch
        window.fetch = new Proxy(oldFetch,{
            apply:function(target,thisArg,argumentsList:[input: URL | RequestInfo, init?: RequestInit | undefined]){
                
                let monitorFlag=false;//是否监听该接口标记
                let startTime = Date.now();//请求开始时间
                let url='';//请求路径
                // if(!argumentsList[0].toString().match(/upload/) && !argumentsList[0].toString().match(/sockjs/)){
                    monitorFlag=true;
                    let fetchInput = argumentsList[0]
                    let method = 'GET'
                    if (typeof fetchInput === 'string') {
                        url = fetchInput
                    } else if ('Request' in window && fetchInput instanceof window.Request) {
                        url = fetchInput.url
                        if (fetchInput.method) {
                            method = fetchInput.method
                        }
                    } else {
                        url = '' + fetchInput
                    }
                    if (argumentsList[1] && argumentsList[1].method) {
                        method = argumentsList[1].method
                    }
                // }
                
                let responseCopy:Response;

                return target.apply(thisArg, argumentsList).then((response)=>{
                        responseCopy=response.clone();
                        console.log('fetchResponse',responseCopy)
                        return response.json()
                }).then((res)=>{
                    console.log(res);
                    if(monitorFlag){
                        
                        let handler = () => {
                        // 持续时间
                        let duration = Date.now() - startTime;
                        console.log("_response_",responseCopy,res);
                        // tracker.send({
                        //     type: "fetch",
                        //     pathname: url,
                        //     status: responseCopy.status + "-" + responseCopy.statusText, // 状态码
                        //     duration,
                        //     response: res ? JSON.stringify(res) : "", // 响应体
                        //     params: argumentsList[0] || "", // 入参
                        // });
                        tracker.gifSend({
                            type: "fetch",
                            pathname: url?encodeURIComponent(url) : "",
                            status: responseCopy.status + "-" + responseCopy.statusText, // 状态码
                            duration,
                            response: res ? JSON.stringify(res) : "", // 响应体
                        });
                    }
                        handler();
                    }
                    return Promise.resolve(responseCopy);
                });
            }
        })
    }
}

