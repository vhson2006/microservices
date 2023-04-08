export class SendEmailEvent {
  constructor(
    public readonly type: string,
    public readonly email: string,
    public readonly url: string,
  ) {}

  toString() {
    return JSON.stringify({
      type: this.type,
      email: this.email,
      url: this.url
    });
  }
}
