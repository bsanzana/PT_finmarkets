export interface History {
  success: boolean;
  code: number;
  data: Data;
}

interface Data {
  info: Info;
  chart: Chart[];
}

export interface Chart {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number;
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  volume: number;
  volumeMoney: number;
  performanceRelative: number;
  performanceAbsolute: number;
  tend: Tend;
}

enum Tend {
  Down = 'down',
  Same = 'same',
  Up = 'up',
}

interface Info {
  name: string;
  shortName: string;
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  hourOpen: string;
  hourClose: string;
}
