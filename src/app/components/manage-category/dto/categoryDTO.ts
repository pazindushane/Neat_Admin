export class categoryDTO {
  private _category_name: string;
  private _status : string;

  constructor(category_name: string, status: string) {
    this._category_name = category_name;
    this._status = status;
  }

  get category_name(): string {
    return this._category_name;
  }

  set category_name(value: string) {
    this._category_name = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
