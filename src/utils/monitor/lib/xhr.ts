import {tracker} from "../utils/tracker";

export function proxyXHR() {
  //代理xhr.open方法
  let oldOpen=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=new Proxy(oldOpen,{ 
    apply:function(target,thisArg,argumentsList:[method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined]){
      
      if(typeof argumentsList[1]!=='string'){
        argumentsList[1]=argumentsList[1].toString();
      }
      if (!argumentsList[1].match(/upload/) && !argumentsList[1].match(/sockjs/)) {
        thisArg.logData = argumentsList;
      }else{
        thisArg.logData = [];
      }
        console.log('thisArg',thisArg) 
        console.log('argumentsList',argumentsList) 
        return target.apply(thisArg,argumentsList) 
    } 
});
//代理xhr.send方法
let oldSend=XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send=new Proxy(oldSend,{
    apply:function(target,thisArg,argumentsList:[body?: Document | XMLHttpRequestBodyInit | null | undefined]){
      if (thisArg.logData.length>0) {
        console.log('thisArg.logData',thisArg.logData);
        let startTime = Date.now();
        let handler = (type?:string) => (event: any) => {
          // 持续时间
          let duration = Date.now() - startTime;
          let status = thisArg.status;
          let statusText = thisArg.statusText;
          // tracker.send({
          //   type: "xhr",
          //   eventType: type,
          //   pathname: thisArg.logData.url,
          //   status: status + "-" + statusText, // 状态码
          //   duration,
          //   response: thisArg.response ? JSON.stringify(thisArg.response) : "", // 响应体
          //   params: argumentsList[0] || "", // 入参
          // });
          tracker.gifSend({
            type: "xhr",
            eventType: type,
            pathname: thisArg.logData.url,
            status: status + "-" + statusText, // 状态码
            duration,
            response: thisArg.response ? JSON.stringify(thisArg.response) : "", // 响应体
            params: argumentsList[0] || "", // 入参
          });
        };
        thisArg.addEventListener("load", handler("load"), false);
        thisArg.addEventListener("error", handler("error"), false);
        thisArg.addEventListener("abort", handler("abort"), false);
      }
      return target.apply(thisArg, argumentsList);
    } 
});
}
