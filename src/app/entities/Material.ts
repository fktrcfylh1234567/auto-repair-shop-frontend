export class Material {
  constructor(
    public material_id: number = 0,
    public material_name: string = "",
    public part: boolean = false,
    public measure: string = "",
    public article: string = ""
  ) {}
}
