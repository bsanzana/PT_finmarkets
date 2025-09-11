export interface Constituens {
  success: boolean;
  code: number;
  data: Data;
}

export interface Data {
  info: Info;
  constituents: Constituent[];
}

export interface Constituent {
  codeInstrument: string;
  name: string;
  shortName: string;
  pctDay: number;
  pct30D: number;
  pctCY: number;
  pct1Y: number;
  lastPrice: number;
  datetimeLastPrice: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  tend: Tend;
  performanceAbsolute: number;
  performanceRelative: number;
}

export enum Tend {
  Down = 'down',
  Same = 'same',
  Up = 'up',
}

export interface Info {
  name: string;
  shortName: string;
  countryName: string;
  codeInstrument: string;
}
