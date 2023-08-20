export interface ICity {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: ICords;
}

export interface ICords {
  lat: number;
  lng: number;
}

export interface Ilocation {
  name: string;
  coords: ICords;
}

export interface IinitialState {
  data: ICity[];
  viewList: ICity[];
  searchParams: ISearchParams;
}

export interface ISearchParams {
  searchString?: string;
  continent?: string;
  sortByName?: boolean;
  userLocation?: ICity | null;
  units?: string;
}

export interface IState {
  cities: IinitialState;
}

export interface IWeather {
  weather: [{ description: string }];
  main: { temp: number; pressure: number; humidity: number };
  dt_txt: string;
}

export interface IForecast {
  list: IWeather[];
}
