export class MaterialsUsing {
  constructor(
    public material_name: string = "",
    public purchase_ids: string = "",
    public order_ids: string = "",
    public balance_begin: number = 0,
    public incoming_sum: number = 0,
    public outgoing_sum: number = 0,
    public balance_end: number = 0,
  ) {}
}
