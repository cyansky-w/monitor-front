import { injectJsError } from "./lib/jsError";
import { proxyXHR } from "./lib/xhr";
import { blankScreen } from "./lib/blankScreen";
import { timing } from "./lib/timing";
import { longTask } from "./lib/longTask";
import { pv } from "./lib/pv";
import {hash} from './lib/hash'
import {proxyFetch} from './lib/proxyFetch'
import {resource} from './lib/resource'
import {gifName,tracker} from './utils/tracker'

type configType={
    firstScreen?:boolean,
    resource?:boolean,
    api?:boolean,
    blank?:boolean,
    spa?:boolean,
    pid:string,
    production:'dev'|'sit'|'stag'|'prod'
}

class Monitor{
    
    config:configType={
        pid:'',
        production:'dev'
    }

    constructor(){}

    setconfig(config:configType){
        this.config=Object.assign(this.config,config)
    }

    useMonitor(){
        tracker.setPid(this.config.pid);
        tracker.setProduction(this.config.production);
        if(this.config.api){
            proxyXHR();
            proxyFetch();
        }
        if(this.config.blank){
            blankScreen();
        }
        if(this.config.resource){
            resource(gifName);
        }
        injectJsError();
        if(this.config.firstScreen){
            timing();
        }
        if(this.config.spa){
            hash();
        }
        pv();
        longTask();
    }
}

export default new Monitor();