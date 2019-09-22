export interface Customer {
  latitude: number,
  longitude: number,
  name: string,
  user_id: string,
}

export enum CustomerField {
  latitude = "latitude",
  longitude = "longitude",
  name = "name",
  user_id = "user_id"
}

export enum DataSrc {
  local = "local",
  web = "web"
  // @todo add alternate data sources
}

export enum OrderDir {
  asc = "asc",
  desc = "desc"
}
