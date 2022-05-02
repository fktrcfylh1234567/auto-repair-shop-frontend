import {Injectable} from "@angular/core"
import {environment} from "../../environments/environment"
import {Staffer} from "../entities/Staffer";
import {ApiService} from "./api.service";
import {DiscountCard} from "../entities/DiscountCard";
import {Service} from "../entities/Service";
import {Material} from "../entities/Material";
import {Purchase} from "../entities/Purchase";
import {Order} from "../entities/Order";
import {ExecutedWork} from "../entities/ExecutedWork";
import {MaterialsUsing} from "../entities/MaterialsUsing";
import {Salary} from "../entities/Salary";

@Injectable()
export class DbService {

  constructor(private apiService: ApiService) {
  }

  public async auth(login: string, password: string): Promise<Response> {
    return fetch(environment.serverUrl + "/auth/?login=" + login + "&password=" + password, {
      method: 'get',
    })
  }

  // *** Staffers ***

  public async getStaffersList(role = ""): Promise<Array<Staffer>> {
    let par = ""
    if (role != "")
      par = "?role=" + role
    return await this.apiService.get('/staffer' + par)
  }

  async deleteStaffer(id: number) {
    let js = await this.apiService.delete('/staffer/' + id)
    return js
  }

  async getStafferInfo(id: number) {
    return await this.apiService.get('/staffer/' + id)
  }

  public async sendStafferInfo(staffer: Staffer): Promise<boolean | null> {
    let js = await this.apiService.post('/staffer/', staffer)
    return js
  }

  // *** Discount cards ***

  async getDiscountCardsList(): Promise<Array<DiscountCard>> {
    return await this.apiService.get('/discount_card/')
  }

  async deleteDiscountCard(id: string) {
    let js = await this.apiService.delete('/discount_card/' + id)
    return js
  }

  async getDiscountCardInfo(id: string) {
    return await this.apiService.get('/discount_card/' + id)
  }

  async sendDiscountCardInfo(discountCard: DiscountCard, isNew: boolean): Promise<boolean | null> {
    if (isNew)
      return await this.apiService.post('/discount_card/', discountCard)
    else
      return await this.apiService.put('/discount_card/', discountCard)
  }

  // *** Services ***

  public async getServicesList(filter_name: string = ""): Promise<Array<Service>> {
    let par = ""
    if (filter_name != "")
      par = "?filter_name=" + filter_name
    return await this.apiService.get('/service' + par)
  }

  async deleteService(id: number) {
    let js = await this.apiService.delete('/service/' + id)
    return js
  }

  async getServiceInfo(id: number) {
    return await this.apiService.get('/service/' + id)
  }

  public async sendServiceInfo(service: Service): Promise<boolean | null> {
    let js = await this.apiService.post('/service/', service)
    return js
  }

  // *** Materials ***

  public async getMaterialsList(filter_name: string = "", filter_part: boolean | null = null): Promise<Array<Material>> {
    let par = ""
    let s = "?"
    if (filter_name != "") {
      par = s + "filter_name=" + filter_name
      s = "&"
    }
    if (filter_part != null)
      par = par + s + "filter_part=" + String(filter_part)
    return await this.apiService.get('/material' + par)
  }

  async deleteMaterial(id: number) {
    let js = await this.apiService.delete('/material/' + id)
    return js
  }

  async getMaterialInfo(id: number) {
    return await this.apiService.get('/material/' + id)
  }

  public async sendMaterialInfo(material: Material): Promise<boolean | null> {
    let js = await this.apiService.post('/material/', material)
    return js
  }

  // *** Purchases ***

  public async getPurchasesList(filter_id = 0, begin_date = "", end_date = ""): Promise<Array<Purchase>> {
    let par = ""
    let s = "?"
    if (filter_id != 0) {
      par = s + "material_id=" + filter_id
      s = "&"
    }
    if (begin_date != "") {
      par = par + s + "begin_date=" + begin_date
      s = "&"
    }
    if (end_date != "")
      par = par + s + "end_date=" + end_date
    return await this.apiService.get('/purchase' + par)
  }

  async deletePurchase(id: number) {
    let js = await this.apiService.delete('/purchase/' + id)
    return js
  }

  async getPurchaseInfo(id: number) {
    return await this.apiService.get('/purchase/' + id)
  }

  public async sendPurchaseInfo(purchase: Purchase): Promise<boolean | null> {
    console.log(purchase)
    let js = await this.apiService.post('/purchase/', purchase)
    return js
  }

  // *** Orders ***

  public async getOrdersList(card_number = "", begin_date = "", end_date = ""): Promise<Array<Order>> {
    let par = ""
    let s = "?"
    if (card_number != "") {
      par = s + "card_number=" + card_number
      s = "&"
    }
    if (begin_date != "") {
      par = par + s + "begin_date=" + begin_date
      s = "&"
    }
    if (end_date != "")
      par = par + s + "end_date=" + end_date
    return await this.apiService.get('/order' + par)
  }

  async deleteOrder(id: number) {
    let js = await this.apiService.delete('/order/' + id)
    return js
  }

  async getOrderInfo(id: number) {
    return await this.apiService.get('/order/' + id)
  }

  public async sendOrderInfo(order: Order): Promise<boolean | null> {
    console.log(order)
    let js = await this.apiService.post('/order/', order)
    return js
  }

  async getDiscountCardsPercentOff(card_number: string) {
    return await this.apiService.get('/discount_card_percent/' + card_number)
  }

  async getServicePrice(service_id: number) {
    return await this.apiService.get('/service_price/' + service_id)
  }

  // *** Reports ***

  public async getExecutedWorks(begin_date = "", end_date = ""): Promise<Array<ExecutedWork>> {
    let par = ""
    let s = "?"
    if (begin_date != "") {
      par = par + s + "begin_date=" + begin_date
      s = "&"
    }
    if (end_date != "")
      par = par + s + "end_date=" + end_date
    return await this.apiService.get('/executed_works' + par)
  }

  public async getMaterialsUsing(begin_date = "", end_date = "", is_available = false): Promise<Array<MaterialsUsing>> {
    let par = "?begin_date=" + begin_date + "&end_date=" + end_date + "&is_available=" + is_available
    return await this.apiService.get('/materials_using' + par)
  }

  public async getSalary(begin_date = "", end_date = "", coeff: number = 0): Promise<Array<Salary>> {
    let par = "?begin_date=" + begin_date + "&end_date=" + end_date + "&coeff=" + coeff
    return await this.apiService.get('/salary' + par)
  }

}
