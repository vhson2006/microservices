export class CompleteItemInPackageEvent {
  constructor(
    public readonly userId: string,
    public readonly data: any,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      data: this.data,
    });
  }
}