import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {MyDatePipe} from "../services/MyDatePipe";
import {Order} from "../entities/Order";
import {DiscountCard} from "../entities/DiscountCard";

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {

  ordersList: Array<Order> = []
  discountCards: Array<DiscountCard> = []
  begin_date: string = ""
  end_date: string = ""
  card_number: string = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService, public datePipe: MyDatePipe) {
  }

  async ngOnInit() {
    await this.getOrdersList()
    this.ordersList.map(s => s.order_date = new Date(s.order_date))
    await this.getDiscountCardsList()
  }

  async getOrdersList(card_number= "", begin_date = "", end_date = "") {
    let res = await this.dbService.getOrdersList(card_number, begin_date, end_date)
    console.log(res)
    this.ordersList = res
  }

  async getDiscountCardsList() {
    let res = await this.dbService.getDiscountCardsList()
    this.discountCards = res
  }

  async order_open(order_id: number) {
    await this.router.navigate(['order/' + order_id], {
      queryParams: {}
    })
  }

  async order_delete(order_id: number) {
    let res = await this.dbService.deleteOrder(order_id)
    if (res) {
      await this.getOrdersList()
    }
  }

  async changeDiscountCard(value: any) {
    this.card_number = value
    await this.filterList()
  }

  async filterList() {
    await this.getOrdersList(this.card_number, this.begin_date, this.end_date)
    this.ordersList.map(s => s.order_date = new Date(s.order_date))
  }

}
