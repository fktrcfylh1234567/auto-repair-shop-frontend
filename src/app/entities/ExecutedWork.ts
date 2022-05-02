export class ExecutedWork {
  constructor(
    public sum: number = 0,
    public orders: number = 0,
    public service_name: string = "",
    public average_percent_off: number = 0,
    public max_percent_off: number = 0,
    public discount_sum: number = 0,
    public order_ids: string = ""
  ) {}
}
