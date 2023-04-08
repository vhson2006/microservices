export class DeleteUserProductEvent {
  constructor(
    public readonly userId: string,
    public readonly userProductId: string,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      userProductId: this.userProductId,
    });
  }
}