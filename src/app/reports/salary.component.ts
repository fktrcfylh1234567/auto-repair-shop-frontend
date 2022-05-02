import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DbService} from "../services/db.service";
import {MyDatePipe} from "../services/MyDatePipe";
import {Salary} from "../entities/Salary";

@Component({
  selector: 'salary',
  templateUrl: './salary.component.html',
})
export class SalaryComponent {

  salary: Array<Salary> = []
  begin_date: string = ""
  end_date: string = ""
  coeff: number = 0
  isError = false
  errorMessage = ""

  constructor(private router: Router, private dbService: DbService, public datePipe: MyDatePipe) {
  }

  async getSalary(begin_date = "", end_date = "", coeff = 0) {
    let res = await this.dbService.getSalary(begin_date, end_date, coeff)
    this.salary = res
  }

  async filterList() {
    if (this.begin_date == "" || this.end_date == "") {
      this.isError = true
      this.errorMessage = "Не задан период"
      return
    }
    this.isError = false
    await this.getSalary(this.begin_date, this.end_date, this.coeff)
  }

  isStafferName(element: Salary) {
    return (element.order_id === 0);
  }

  getRowsForStaffer(staffer_id: number) {
    return this.salary.filter(it => it.staffer_id == staffer_id && it.order_id != 0)
  }

}
