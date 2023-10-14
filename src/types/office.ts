export type OpenHoursType = {
  days: string;
  hours: string;
};

// export type OfficeType = {
//   salePointName: string;
//   address: string;
//   openHours: OpenHoursType[];
//   rko: string;
//   openHoursIndividual: OpenHoursType[];
//   officeType: string;
//   salePointFormat: string;
//   suoAvailability: null | string;
//   hasRamp: null | string;
//   latitude: number;
//   longitude: number;
//   metroStation: null | string;
//   distance: number;
//   kep: null | boolean;
//   myBranch: boolean;
// };

export type OfficeType = {
  id: number,
  salePointName: string,
  address: string,
  status: string,
  salePointCode?: string,
  openHours: OpenHoursType[],
  rko: string,
  network?: null,
  openHoursIndividual: OpenHoursType[],
  officeType: string,
  salePointFormat: string,
  suoAvailability: null | string,
  hasRamp: null | string,
  latitude: number,
  longitude: number,
  metroStation: null | string,
  distance: number,
  kep: null | boolean,
  myBranch: boolean,
  cardsService: boolean,
  creditService: boolean,
  mortgageService: boolean,
  carCreditService: boolean,
  depositsService: boolean,
  isOpen: boolean,
  workload: { [service: string]: WorkLoadType[] },
  queueLoad: { [service: string]: QueueLoadType }
}

export type WorkLoadType = { day: number, count: number }
export type QueueLoadType = { time: number, count: number }

export enum PointEnum {
  OFFICE = "office",
  ATM = "atm"
}

