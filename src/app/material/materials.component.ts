import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {DbService} from "../services/db.service";
import {Material} from "../entities/Material";
import {Option} from "@angular/cli/models/interface";

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
})
export class MaterialsComponent {

  materialsList: Array<Material> = []
  filter_name: string = ""
  filter_part: "true" | "false" | "" = ""

  constructor(private router: Router, private activateRouter: ActivatedRoute, private dbService: DbService) {
  }

  ngOnInit(): void {
    this.getMaterialsList().catch(console.error)
  }

  async getMaterialsList(filter_name: string = "", filter_part: boolean | null = null) {
    let res = await this.dbService.getMaterialsList(filter_name, filter_part)
    this.materialsList = res
  }

  async material_open(material_id: number) {
    await this.router.navigate(['material/' + material_id], {
      queryParams: {}
    })
  }

  async material_delete(material_id: number) {
    let res = await this.dbService.deleteMaterial(material_id)
    if (res) {
      this.getMaterialsList().catch(console.error)
    }
  }

  filter_name_change() {
    let part = null
    if (this.filter_part == "true")
      part = true
    else if (this.filter_part == "false")
      part = false
    this.getMaterialsList(this.filter_name, part).catch(console.error)
  }
}
