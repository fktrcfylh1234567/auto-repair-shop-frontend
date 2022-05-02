import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Purchase} from "../entities/Purchase";
import {MyDatePipe} from "../services/MyDatePipe";
import {Material} from "../entities/Material";

@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent {

  purchasesList: Array<Purchase> = []
  materials: Array<Material> = []
  begin_date: string = ""
  end_date: string = ""
  material: number = 0

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService, public datePipe: MyDatePipe) {
  }

  async ngOnInit() {
    await this.getPurchasesList()
    this.purchasesList.map(s => s.purchase_date = new Date(s.purchase_date))
    await this.getMaterialsList()
  }

  async getPurchasesList(filter_id=0, begin_date = "", end_date = "") {
    let res = await this.dbService.getPurchasesList(filter_id, begin_date, end_date)
    console.log(res)
    this.purchasesList = res
  }

  async getMaterialsList() {
    let res = await this.dbService.getMaterialsList()
    this.materials = res
  }

  async purchase_open(purchase_id: number) {
    await this.router.navigate(['purchase/' + purchase_id], {
      queryParams: {}
    })
  }

  async purchase_delete(purchase_id: number) {
    let res = await this.dbService.deletePurchase(purchase_id)
    if (res) {
      await this.getPurchasesList()
    }
  }

  async changeMaterial(value: any) {
    this.material = value
    await this.filterList()
  }

  async filterList() {
    await this.getPurchasesList(this.material, this.begin_date, this.end_date)
    this.purchasesList.map(s => s.purchase_date = new Date(s.purchase_date))
  }

}
