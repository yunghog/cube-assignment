export interface ICustomer {
  user: User;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
  registered: number;
  dob: number;
  phone: string;
  cell: string;
  picture: Picture;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  zip: number;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface IPhotos {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

export interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
