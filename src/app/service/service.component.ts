import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Service} from "../entities/Service";

@Component({
  selector: 'service',
  templateUrl: './service.component.html'
})
export class ServiceComponent {

  service = new Service()
  id = 0
  isError = false
  errorMessage = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
    activateRouter.params.subscribe(param => {
      this.id = param['id']
    })
  }

  ngOnInit(): void {
    if (this.id == 0) {
      return
    }
    this.getServiceInfo().catch(console.error)
  }

  async getServiceInfo() {
    let res = await this.dbService.getServiceInfo(this.id)
    this.service = res
  }

  async service_save() {
    let res = await this.dbService.sendServiceInfo(this.service)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.service_cancel()
  }

  async service_cancel() {
    await this.router.navigate(['services'], {
      queryParams: {}
    })
  }

}
