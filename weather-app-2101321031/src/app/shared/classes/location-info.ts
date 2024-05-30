export class LocationInfo {
  name: String;
  country_code: String;
  latitude: number;
  longitude: number;

  constructor(
    name: String,
    country_code: String,
    latitude: number,
    longitude: number
  ) {
    this.name = name;
    this.country_code = country_code;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
