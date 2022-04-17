export class componentDTO {
  private _product_name: string;
  private _description : string;
  private _details: string[];
  private _image_path: string;
  private _pan_size: string;
  private _dimension: string;
  private _netweight: string;
  private _power_supply: string;
  private _status: string;
  private _category_name: string;

  constructor(product_name: string, description: string, details: string[], image_path: string, pan_size: string, dimension: string, netweight: string, power_supply: string, status: string, category_name: string) {
    this._product_name = product_name;
    this._description = description;
    this._details = details;
    this._image_path = image_path;
    this._pan_size = pan_size;
    this._dimension = dimension;
    this._netweight = netweight;
    this._power_supply = power_supply;
    this._status = status;
    this._category_name = category_name;
  }

  get product_name(): string {
    return this._product_name;
  }

  set product_name(value: string) {
    this._product_name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get details(): string[] {
    return this._details;
  }

  set details(value: string[]) {
    this._details = value;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }

  get pan_size(): string {
    return this._pan_size;
  }

  set pan_size(value: string) {
    this._pan_size = value;
  }

  get dimension(): string {
    return this._dimension;
  }

  set dimension(value: string) {
    this._dimension = value;
  }

  get netweight(): string {
    return this._netweight;
  }

  set netweight(value: string) {
    this._netweight = value;
  }

  get power_supply(): string {
    return this._power_supply;
  }

  set power_supply(value: string) {
    this._power_supply = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get category_name(): string {
    return this._category_name;
  }

  set category_name(value: string) {
    this._category_name = value;
  }
}
