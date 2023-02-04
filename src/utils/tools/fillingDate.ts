import { formatDate } from '@/utils/tools/formatTime'
export function fillingDate(beginDate:Date, dateNum:number, sub:number,  formateTimeStr:string):Array<string>{
    let result = [];
    for(let i = 0; i < dateNum ; i++){
        let date=formatDate(new Date(beginDate.getTime() - ( i * sub )),formateTimeStr);
        result.unshift(date);
    }
    return result;
}
