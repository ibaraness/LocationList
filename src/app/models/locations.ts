export interface Coordinates {
  long: string;
  lat: string;
}

export interface LocationItem {
  id: number;
  name: string;
  address: string;
  coordinates: Coordinates;
  catagories: Category[];
}

export interface Category {
  name: string;
  id: number;
}
