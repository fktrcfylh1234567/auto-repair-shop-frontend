import {OrderService} from "./OrderService";
import {OrderMaterial} from "./OrderMaterial";
import {OrderStaffer} from "./OrderStaffer";

export class Order {
  constructor(
    public order_id: number = 0,
    public order_date: Date = new Date(),
    public car: string = "",
    public card_number: string = "",
    public customer_telephone: string = "",
    public percent_off: number = 0,
    public order_lines: number = 0,
    public total: number = 0,
    public discounted_total: number = 0,
    public order_services: Array<OrderService> = [],
    public order_materials: Array<OrderMaterial> = [],
    public order_staffers: Array<OrderStaffer> = []
  ) {}
}
