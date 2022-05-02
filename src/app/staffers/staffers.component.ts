import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Staffer} from "../entities/Staffer";

@Component({
  selector: 'staffers',
  templateUrl: './staffers.component.html'
})
export class StaffersComponent {

  staffersList: Array<Staffer> = []

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.getStaffersList().catch(console.error)
  }

  async getStaffersList() {
    let res = await this.dbService.getStaffersList()
    console.log(res)
    this.staffersList = res
  }

  async staffer_open(staffer_id: number) {
    await this.router.navigate(['staffer/' + staffer_id], {
      queryParams: {}
    })
  }

  async staffer_delete(staffer_id: number) {
    let res = await this.dbService.deleteStaffer(staffer_id)
    if (res) {
      this.getStaffersList().catch(console.error)
    }
  }

}
