import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {DiscountCard} from "../entities/DiscountCard";

@Component({
  selector: 'discount-card',
  templateUrl: './discount-card.component.html'
})
export class DiscountCardComponent {

  discountCard = new DiscountCard()
  id = ""
  isNew = false
  isError = false
  errorMessage = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
    activateRouter.params.subscribe(param => {
      this.id = param['id']
      this.isNew = this.id == "new"
    })
  }

  ngOnInit(): void {
    if (!this.isNew)
      this.getDiscountCardInfo().catch(console.error)
  }

  async getDiscountCardInfo() {
    let res = await this.dbService.getDiscountCardInfo(this.id)
    this.discountCard = res
  }

  async discount_card_save() {
    let res = await this.dbService.sendDiscountCardInfo(this.discountCard, this.isNew)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.discount_card_cancel()
  }

  async discount_card_cancel() {
    await this.router.navigate(['discount-cards'], {
      queryParams: {}
    })
  }

}
