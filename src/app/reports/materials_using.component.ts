import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DbService} from "../services/db.service";
import {MyDatePipe} from "../services/MyDatePipe";
import {MaterialsUsing} from "../entities/MaterialsUsing";

@Component({
  selector: 'materials_using',
  templateUrl: './materials_using.component.html',
})
export class MaterialsUsingComponent {

  materialsUsing: Array<MaterialsUsing> = []
  begin_date: string = ""
  end_date: string = ""
  is_available: boolean = false
  isError = false
  errorMessage = ""

  constructor(private router: Router, private dbService: DbService, public datePipe: MyDatePipe) {
  }

  async getMaterialsUsing(begin_date = "", end_date = "", is_available = false) {
    let res = await this.dbService.getMaterialsUsing(begin_date, end_date, is_available)
    this.materialsUsing = res
  }

  async filterList() {
    if (this.begin_date == "" || this.end_date == "") {
      this.isError = true
      this.errorMessage = "Не задан период"
      return
    }
    this.isError = false
    await this.getMaterialsUsing(this.begin_date, this.end_date, this.is_available)
  }
}
