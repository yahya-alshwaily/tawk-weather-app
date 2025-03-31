import { ref } from "vue";

export interface HourData {
  time: string;
  temp: number;
  icon: string;
}

export interface DayData {
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface ForecastResponse {
  list: ForecastEntry[]
  city: {
    name: string
    country: string
    timezone: number
  }
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface CurrentWeatherResponse {
    name: string
    sys: {
      country: string
    }
    main: {
      temp: number
      temp_min: number
      temp_max: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }

  export interface Weather {
    city: string;
    location: string;
    temperature: number;
    description: string;
    high: number;
    low: number;
  }