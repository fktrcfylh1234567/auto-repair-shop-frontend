import {Component} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Material} from "../entities/Material";

@Component({
  selector: 'material',
  templateUrl: './material.component.html'
})
export class MaterialComponent {

  material = new Material()
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
    this.getMaterialInfo().catch(console.error)
  }

  async getMaterialInfo() {
    let res = await this.dbService.getMaterialInfo(this.id)
    this.material = res
  }

  async material_save() {
    let res = await this.dbService.sendMaterialInfo(this.material)
    if (!res) {
      this.isError = true
      this.errorMessage = "Не удалось отправить данные"
      return
    }
    await this.material_cancel()
  }

  async material_cancel() {
    await this.router.navigate(['materials'], {
      queryParams: {}
    })
  }

}
