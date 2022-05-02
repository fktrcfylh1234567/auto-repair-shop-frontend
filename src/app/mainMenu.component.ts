import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'mainMenu',
  templateUrl: './mainMenu.component.html'
})

export class MainMenuComponent {

  constructor(private router: Router, private apiService: ApiService) {
  }

  async clickStaffers(event: Event) {
    event.preventDefault()
    await this.router.navigate(['staffers'], {
      queryParams: {}
    })
  }

  async clickDiscountCards(event: Event) {
    event.preventDefault()
    await this.router.navigate(['discount-cards'], {
      queryParams: {}
    })
  }

  async clickServices(event: Event) {
    event.preventDefault()
    await this.router.navigate(['services'], {
      queryParams: {}
    })
  }

  async clickMaterials(event: Event) {
    event.preventDefault()
    await this.router.navigate(['materials'], {
      queryParams: {}
    })
  }

  async clickPurchases(event: Event) {
    event.preventDefault()
    await this.router.navigate(['purchases'], {
      queryParams: {}
    })
  }

  async clickOrders(event: Event) {
    event.preventDefault()
    await this.router.navigate(['orders'], {
      queryParams: {}
    })
  }

  async clickExecutedWork(event: Event) {
    event.preventDefault()
    await this.router.navigate(['executed_works'], {
      queryParams: {}
    })
  }

  async clickMaterialsUsing(event: Event) {
    event.preventDefault()
    await this.router.navigate(['materials_using'], {
      queryParams: {}
    })
  }

  async clickSalary(event: Event) {
    event.preventDefault()
    await this.router.navigate(['salary'], {
      queryParams: {}
    })
  }

  section_available(section: string): boolean {
    return this.apiService.role == "manager" || section == "storage" && this.apiService.role == "storekeeper" || section == "orders" && this.apiService.role == "master";
  }

}
