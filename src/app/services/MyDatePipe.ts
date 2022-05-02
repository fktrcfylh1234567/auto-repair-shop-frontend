import {Injectable} from "@angular/core";

@Injectable()
export class MyDatePipe {

  public transform_rus(date: Date | string) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    let month = date.getMonth() + 1;
    let  day = date.getDate();
    return (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + date.getFullYear()
  }

  public transform(date: Date | string) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    let month = date.getMonth() + 1;
    let  day = date.getDate();
    return date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
  }

}
