export class CreateUserProductEvent {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly data: any,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      userName: this.userName,
      data: this.data,
    });
  }
}