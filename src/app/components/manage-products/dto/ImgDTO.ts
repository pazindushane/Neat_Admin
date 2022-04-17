export class ImgDTO{
  private _image_path: string;
  private _product_name: string;

  constructor(image_path: string, product_name: string) {
    this._image_path = image_path;
    this._product_name = product_name;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }

  get product_name(): string {
    return this._product_name;
  }

  set product_name(value: string) {
    this._product_name = value;
  }
}
