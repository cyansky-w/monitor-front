import {tracker} from "../utils/tracker";
export function hash(){
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: function (target, thisBinding, args) {
        const {current} = args[0];
        var connection = navigator.connection;
        tracker.gifSend({
          type: "pv",
          source:document.referrer||"",
          effectiveType: connection.effectiveType, //网络环境
          rtt: connection.rtt, //往返时间
          screen: `${window.screen.width}x${window.screen.height}`, //设备分辨率
        });
        return target.apply(thisBinding, args);
      },
    });
}