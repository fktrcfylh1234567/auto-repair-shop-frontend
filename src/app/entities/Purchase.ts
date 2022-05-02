export class Purchase {
  constructor(
    public purchase_id: number = 0,
    public purchase_date: Date = new Date(),
    public trader: string = "",
    public material_id: number = 0,
    public price: number = 0,
    public quantity: number = 0,
    public sum: number = 0,
    public material_name: string = "",
    public measure: string = "",
  ) {}
}
