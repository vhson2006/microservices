export class RemovePackageEvent {
  constructor(
    public readonly userId: string,
    public readonly packageId: string,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      packageId: this.packageId,
    });
  }
}