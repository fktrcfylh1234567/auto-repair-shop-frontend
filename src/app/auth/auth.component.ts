import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {environment} from "../../environments/environment";
import {User} from "../entities/User";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginIncorrect = false
  login = ""
  password = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService, private apiService: ApiService) {
  }

  loginIsEmpty() {
    return this.login.length < 1 || this.password.length < 1
  }

  async submit() {
    let res = await this.dbService.auth(this.login, this.password)
    if (!res.ok) {
      this.isLoginIncorrect = true
      return
    }
    let response: User = await res.json();
    // @ts-ignore
    this.apiService.setSessionParams(response)
    await this.router.navigate(['mainMenu'], {
      queryParams: {}
    })

  }

}
