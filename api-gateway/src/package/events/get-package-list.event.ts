export class GetPackageListEvent {
  constructor(
    public readonly userId: string,
    public readonly search: string,
    public readonly page: number,
    public readonly size: number,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      search: this.search,
      page: this.page,
      size: this.size
    });
  }
}