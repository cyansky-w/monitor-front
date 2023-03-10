import {tracker} from "../utils/tracker";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";

export function longTask() {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent();
        requestIdleCallback(() => {
          // tracker.send({
          //   type: "longTask",
          //   eventType: lastEvent ? lastEvent.type|| '' : '',
          //   startTime: entry.startTime+window.performance.timeOrigin, // 开始时间
          //   duration: entry.duration, // 持续时间
          //   selector: lastEvent
          //     ? getSelector(lastEvent.path || lastEvent.target)
          //     : "",
          // });
          tracker.gifSend({
            type: "longTask",
            eventType: lastEvent ? lastEvent.type|| '' : '',
            startTime: entry.startTime+window.performance.timeOrigin, // 开始时间
            duration: entry.duration, // 持续时间
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : "",
          });
        });
      }
    });
  }).observe({ entryTypes: ["longtask"] });
}
