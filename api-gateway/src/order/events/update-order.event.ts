export class UpdateOrderEvent {
  constructor(
    public readonly userId: string,
    public readonly userProductId: string,
    public readonly data: any,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      userProductId: this.userProductId,
      data: this.data,
    });
  }
}