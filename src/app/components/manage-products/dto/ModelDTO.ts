export class ModelDTO{
  private _model_name: string;
  private _capacity: string;
  private _readability: string;
  private _calibration_weight: string;
  private _product_name: string;

  constructor(model_name: string, capacity: string, readability: string, calibration_weight: string, product_name: string) {
    this._model_name = model_name;
    this._capacity = capacity;
    this._readability = readability;
    this._calibration_weight = calibration_weight;
    this._product_name = product_name;
  }

  get model_name(): string {
    return this._model_name;
  }

  set model_name(value: string) {
    this._model_name = value;
  }

  get capacity(): string {
    return this._capacity;
  }

  set capacity(value: string) {
    this._capacity = value;
  }

  get readability(): string {
    return this._readability;
  }

  set readability(value: string) {
    this._readability = value;
  }

  get calibration_weight(): string {
    return this._calibration_weight;
  }

  set calibration_weight(value: string) {
    this._calibration_weight = value;
  }

  get product_name(): string {
    return this._product_name;
  }

  set product_name(value: string) {
    this._product_name = value;
  }
}
