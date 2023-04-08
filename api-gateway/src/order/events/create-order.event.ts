export class CreateOrderEvent {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly data: any,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      address: this.address,
      phone: this.phone,
      data: this.data,
    });
  }
}