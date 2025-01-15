export interface Option<T> {
  label: string;
  value: T;
}

export interface CurrencyOption extends Option<string> {
  price?: number;
}
