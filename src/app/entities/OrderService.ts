export class OrderService {
  constructor(
    public order_id: number = 0,
    public order_line: number = 0,
    public service_id: number = 0,
    public service_name: string = "",
    public price: number = 0,
    public quantity: number = 0,
    public sum: number = 0
  ) {}
}
