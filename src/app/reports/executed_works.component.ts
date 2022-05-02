import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DbService} from "../services/db.service";
import {MyDatePipe} from "../services/MyDatePipe";
import {ExecutedWork} from "../entities/ExecutedWork";

@Component({
  selector: 'executed_works',
  templateUrl: './executed_works.component.html',
})
export class ExecutedWorksComponent {

  executedWorks: Array<ExecutedWork> = []
  begin_date: string = ""
  end_date: string = ""

  constructor(private router: Router, private dbService: DbService, public datePipe: MyDatePipe) {
  }

  async ngOnInit() {
    await this.getExecutedWorks()
  }

  async getExecutedWorks(begin_date = "", end_date = "") {
    let res = await this.dbService.getExecutedWorks(begin_date, end_date)
    this.executedWorks = res
  }

  async filterList() {
    await this.getExecutedWorks(this.begin_date, this.end_date)
  }
}
