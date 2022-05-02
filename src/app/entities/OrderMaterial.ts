export class OrderMaterial {
  constructor(
    public order_id: number = 0,
    public order_line: number = 0,
    public material_id: number = 0,
    public material_name: string = "",
    public measure: string = "",
    public quantity: number = 0
  ) {}
}
