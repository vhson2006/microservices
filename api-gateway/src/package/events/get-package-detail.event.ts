export class GetPackageDetailEvent {
  constructor(
    public readonly packageId: string,
  ) {}

  toString() {
    return JSON.stringify({
      packageId: this.packageId,
    });
  }
}