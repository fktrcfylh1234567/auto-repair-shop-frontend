import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Purchase} from "../entities/Purchase";
import {MyDatePipe} from "../services/MyDatePipe";
import {Material} from "../entities/Material";

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent {

  purchase = new Purchase()
  id = 0
  isError = false
  errorMessage = ""
  materials: Array<Material> = []

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService, public datePipe: MyDatePipe) {
    activateRouter.params.subscribe(param => {
      this.id = param['id']
    })
  }

  ngOnInit(): void {
    this.getMaterialsList().catch(console.error)
    if (this.id == 0) {
      this.purchase.purchase_date = new Date()
      return
    }
    this.getPurchaseInfo().catch(console.error)
  }

  async getMaterialsList() {
    this.materials = await this.dbService.getMaterialsList()
  }

  async getPurchaseInfo() {
    let res = await this.dbService.getPurchaseInfo(this.id)
    this.purchase = res
    this.purchase.purchase_date = new Date(this.purchase.purchase_date)
  }

  async purchase_save() {
    let res = await this.dbService.sendPurchaseInfo(this.purchase)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.purchase_cancel()
  }

  async purchase_cancel() {
    await this.router.navigate(['purchases'], {
      queryParams: {}
    })
  }

  calcsum() {
    this.purchase.sum = Math.round((this.purchase.price * this.purchase.quantity)*100)/100
  }

  setDateValue(e: any) {
    this.purchase.purchase_date = new Date(e.target.value.toString());
  }
}
