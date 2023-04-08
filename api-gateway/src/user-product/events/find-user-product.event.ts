export class FindUserProductEvent {
  constructor(
    public readonly params: string,
  ) {}

  toString() {
    return JSON.stringify({
      params: this.params,
    });
  }
}