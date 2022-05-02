import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Service} from "../entities/Service";

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
})
export class ServicesComponent {

  servicesList: Array<Service> = []
  filter_name: string = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.getServicesList().catch(console.error)
  }

  async getServicesList(filter_name: string = "") {
    let res = await this.dbService.getServicesList(filter_name)
    console.log(res)
    this.servicesList = res
  }

  async service_open(service_id: number) {
    await this.router.navigate(['service/' + service_id], {
      queryParams: {}
    })
  }

  async service_delete(service_id: number) {
    let res = await this.dbService.deleteService(service_id)
    if (res) {
      this.getServicesList().catch(console.error)
    }
  }

  filter_name_change() {
    this.getServicesList(this.filter_name).catch(console.error)
  }
}
