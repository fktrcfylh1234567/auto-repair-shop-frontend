import {Injectable} from "@angular/core"
import {environment} from "../../environments/environment"
import {User} from "../entities/User";
import {Staffer} from "../entities/Staffer";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {
  sessionToken: string | null = null
  role: string | null = null

  constructor(private router: Router) {
    this.sessionToken = localStorage.getItem("session_token")
    this.role = localStorage.getItem("role")
  }

  public setSessionParams(user: User) {
    this.sessionToken = user.token
    this.role = user.role
    localStorage.setItem("session_token", this.sessionToken)
    localStorage.setItem("role", this.role)
  }

  public async checkAuthStatus(stat: number) {
    if (stat == 401)
      await this.router.navigate(['auth/'], {queryParams: {}})
  }


  public async get(suffix: string): Promise<any | null> {
    let headers: any = {}

    if (this.sessionToken != null) {
      headers['token'] = this.sessionToken
    }

    let res = await fetch(environment.serverUrl + suffix, {
      method: 'get',
      headers: headers
    })

    if (!res.ok) {
      await this.checkAuthStatus(res.status)
      return null
    }

    return await res.json()
  }


  public async post(suffix: string, data: any): Promise<any | null> {
    return this.request(suffix, data, "post")
  }


  public async put(suffix: string, data: any): Promise<any | null> {
    return this.request(suffix, data, "put")
  }


  public async request(suffix: string, data: any, method: string): Promise<any | null> {
    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (this.sessionToken != null) {
      headers['token'] = this.sessionToken
    }

    let res = await fetch(environment.serverUrl + suffix, {
      body: JSON.stringify(data),
      method: method,
      headers: headers
    })

    if (!res.ok) {
      await this.checkAuthStatus(res.status)
    }
    return res.ok
  }


  public async delete(suffix: string): Promise<any | null> {
    let headers: any = {}

    if (this.sessionToken != null) {
      headers['token'] = this.sessionToken
    }

    let res = await fetch(environment.serverUrl + suffix, {
      method: 'delete',
      headers: headers
    })

    if (!res.ok) {
      await this.checkAuthStatus(res.status)
    }
    return res.ok
  }

}
