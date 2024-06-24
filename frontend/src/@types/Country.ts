export interface ICountry {
  hasDetails: boolean;
  code: number| string;
  personalWorth?: number | string;
  id: number | string;
  short_description?: string;
  flag?: string;
  video_links?: string;
  continent: string;
  gdp?: number | string;
  stats?: [string, string][];
  muslim_percentage?: number | string;
  muslim_population?: number | string;
  name: string;
  pakistanis?: number | string;
  total_population?: number | string;
}

export interface IContinent {
  name: string;
  countries: ICountry[];
}
