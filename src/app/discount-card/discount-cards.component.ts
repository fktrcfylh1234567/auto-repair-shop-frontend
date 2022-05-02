import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {DiscountCard} from "../entities/DiscountCard";
import {Option} from "@angular/cli/models/interface";

@Component({
  selector: 'discount-cards',
  templateUrl: './discount-cards.component.html',
})
export class DiscountCardsComponent implements OnInit {

  discountCardsList: Array<DiscountCard> = []

  constructor (private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.getDiscountCardsList().catch(console.error)
  }

  async getDiscountCardsList() {
    let res = await this.dbService.getDiscountCardsList()
    console.log(res)
    this.discountCardsList = res
  }

  async discount_card_open(card_number: string) {
    await this.router.navigate(['discount-card/' + card_number], {
      queryParams: {}
    })
  }

  async discount_card_delete(card_number: string) {
    let res = await this.dbService.deleteDiscountCard(card_number)
    if (res) {
      this.getDiscountCardsList().catch(console.error)
    }
  }

}
