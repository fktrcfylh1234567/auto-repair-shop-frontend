import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {MyDatePipe} from "../services/MyDatePipe";
import {Order} from "../entities/Order";
import {DiscountCard} from "../entities/DiscountCard";
import {Service} from "../entities/Service";
import {OrderService} from "../entities/OrderService";
import {Material} from "../entities/Material";
import {OrderMaterial} from "../entities/OrderMaterial";
import {Staffer} from "../entities/Staffer";
import {OrderStaffer} from "../entities/OrderStaffer";

@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent {

  order = new Order()
  id = 0
  isError = false
  errorMessage = ""
  discountCards: Array<DiscountCard> = []
  services: Array<Service> = []
  materials: Array<Material> = []
  staffers: Array<Staffer> = []
  total = 0
  discounted_total = 0
  tabNumber = 0

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService, public datePipe: MyDatePipe) {
    activateRouter.params.subscribe(param => {
      this.id = param['id']
    })
  }

  async ngOnInit() {
    await this.getDiscountCardsList()
    await this.getServicesList()
    await this.getMaterialsList()
    await this.getStaffersList()
    if (this.id == 0) {
      this.order.order_date = new Date()
      return
    }
    await this.getOrderInfo()
  }

  async getDiscountCardsList() {
    this.discountCards = await this.dbService.getDiscountCardsList()
  }

  async getServicesList() {
    this.services = await this.dbService.getServicesList()
  }

  async getMaterialsList() {
    this.materials = await this.dbService.getMaterialsList()
  }

  async getStaffersList() {
    this.staffers = await this.dbService.getStaffersList("repairman")
  }

  async getOrderInfo() {
    let res = await this.dbService.getOrderInfo(this.id)
    this.order = res
    this.order.order_date = new Date(this.order.order_date)
    this.calcTotal()
  }

  async order_save() {
    if (this.order.order_staffers.length > 0) {
      let sum_ktu = 0
      for (let i = 0; i < this.order.order_staffers.length; i++) {
        sum_ktu = sum_ktu + this.order.order_staffers[i].ktu
      }
      if (sum_ktu != 100) {
        this.isError = true
        this.errorMessage = "Сумма КТУ по всем ремонтникам должна быть равна 100!"
        return
      }
    }
    let res = await this.dbService.sendOrderInfo(this.order)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.order_cancel()
    }

  async order_cancel() {
    await this.router.navigate(['orders'], {
      queryParams: {}
    })
  }

   setDateValue(e: any) {
    this.order.order_date = new Date(e.target.value.toString());
  }

  async changeDiscountCard(value: string) {
    if (value == undefined) {
      this.order.percent_off = 0
    }
    else
      this.order.percent_off = await this.dbService.getDiscountCardsPercentOff(value)
    this.calcTotal()
  }

  changeTab(number: number) {
    this.tabNumber = number
  }

  // *** Услуги

  calcsum(row_s: OrderService) {
    row_s.sum = Math.round((row_s.price * row_s.quantity)*100)/100
    this.calcTotal()
  }

  calcTotal() {
    let sum = 0
    for(let i=0; i<this.order.order_services.length; i++){
      sum = sum + this.order.order_services[i].sum
    }
    this.total = sum
    this.discounted_total = Math.round((sum * (1 - this.order.percent_off/100))*100)/100
  }

  async changeService(row_s: OrderService) {
    row_s.price = await this.dbService.getServicePrice(row_s.service_id)
    this.calcsum(row_s)
  }

  servicesAddLine() {
    this.order.order_services.push(new OrderService())
    this.services_enumerate_lines()
  }

  services_enumerate_lines() {
    for(let i=0; i<this.order.order_services.length; i++){
       this.order.order_services[i].order_line = i+1
    }
  }

  services_line_delete(row_s: OrderService) {
    const index = this.order.order_services.indexOf(row_s, 0);
    this.order.order_services.splice(index, 1);
    this.services_enumerate_lines()
    this.calcTotal()
  }

  // *** Материалы

  materialsAddLine() {
    this.order.order_materials.push(new OrderMaterial())
    this.materials_enumerate_lines()
  }

  materials_enumerate_lines() {
    for(let i=0; i<this.order.order_materials.length; i++){
      this.order.order_materials[i].order_line = i+1
    }
  }

  materials_line_delete(row_m: OrderMaterial) {
    const index = this.order.order_materials.indexOf(row_m, 0);
    this.order.order_materials.splice(index, 1);
    this.materials_enumerate_lines()
  }

  // *** Ремонтники

  staffersAddLine() {
    this.order.order_staffers.push(new OrderStaffer())
    this.staffers_enumerate_lines()
  }

  staffers_enumerate_lines() {
    for(let i=0; i<this.order.order_staffers.length; i++){
      this.order.order_staffers[i].order_line = i+1
    }
  }

  staffers_line_delete(row_r: OrderStaffer) {
    const index = this.order.order_staffers.indexOf(row_r, 0);
    this.order.order_staffers.splice(index, 1);
    this.staffers_enumerate_lines()
  }
}
