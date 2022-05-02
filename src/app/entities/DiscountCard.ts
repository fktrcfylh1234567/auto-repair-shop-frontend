export class DiscountCard {
  constructor(
    public card_number: string = "",
    public customer_name: string = "",
    public customer_telephone: string = "",
    public percent_off: number = 0,
  ) {}
}
