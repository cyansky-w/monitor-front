import { injectJsError } from "./lib/jsError";
import { proxyXHR } from "./lib/xhr";
import { blankScreen } from "./lib/blankScreen";
import { timing } from "./lib/timing";
import { longTask } from "./lib/longTask";
import { pv } from "./lib/pv";
import {hash} from './lib/hash'
import {proxyFetch} from './lib/proxyFetch'
import {resource} from './lib/resource'
import tracker from './utils/tracker'

type configType={
    firstScreen?:boolean,
    resource?:boolean,
    api?:boolean,
    blank?:boolean,
    hash?:boolean,
    history?:boolean
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
            resource();
        }
        injectJsError();
        if(this.config.firstScreen){
            timing();
        }
        hash(this.config.hash,this.config.history);
        pv();
        longTask();
    }
}

export default new Monitor();