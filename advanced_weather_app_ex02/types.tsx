//export type WeatherData = {
  //  temperature: number;
    //weathercode: number;
    //time: string;
//};

export type locationData = {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  weather?: WeatherData | null;
};

export type WeatherData = {
  city: string;
  temperature: number;
};

