export class GetCardEvent {
  constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly size: number,
  ) {}

  toString() {
    return JSON.stringify({
      search: this.search,
      page: this.page,
      size: this.size
    });
  }
}