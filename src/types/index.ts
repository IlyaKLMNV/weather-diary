export interface WeatherRecord {
    id: string;
    date: string;
    temperature: number;
    weather: string;
    filledBy: string;
    comment: string;
  }
  
  export interface WeatherState {
    records: WeatherRecord[];
  }
  