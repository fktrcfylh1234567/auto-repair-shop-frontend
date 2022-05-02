import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Staffer} from "../entities/Staffer";

enum Roles {
  manager = "manager",
  master = "master",
  storekeeper = "storekeeper",
  repairman = "repairman"
}

@Component({
  selector: 'staffer',
  templateUrl: './staffer.component.html'
})
export class StafferComponent {

  staffer = new Staffer()
  id = 0
  role = Roles.repairman
  roleOptions = [Roles.manager, Roles.master, Roles.storekeeper, Roles.repairman]
  isError = false
  errorMessage = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
    activateRouter.params.subscribe(param => {
      this.id = param['id']
    })
  }

  ngOnInit(): void {
    if (this.id == 0) {
      this.staffer.role = Roles.repairman
      return
    }
    this.getStafferInfo().catch(console.error)
  }

  async getStafferInfo() {
    let res = await this.dbService.getStafferInfo(this.id)
    this.staffer = res
  }

  async staffer_save() {
    let res = await this.dbService.sendStafferInfo(this.staffer)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.staffer_cancel()
  }

  async staffer_cancel() {
    await this.router.navigate(['staffers'], {
      queryParams: {}
    })
  }

}
