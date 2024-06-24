import { ICountry } from './Country';

export interface IDashboard {
  id: number | string;
  result: {
    skillScore: {
      scores: Score[];
    };
  };
  assessment_country: ICountry[];
}

export interface Score {
  country_id: number;
  score: number | string;
  type: string;
}
