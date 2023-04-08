export class GetOrderDetailEvent {
  constructor(
    public readonly orderId: string,
  ) {}

  toString() {
    return JSON.stringify({
      orderId: this.orderId,
    });
  }
}