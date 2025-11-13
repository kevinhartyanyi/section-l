export interface Property {
  id: number;
  documentId: string;
  name: string;
  acronym: string;
}

export interface Neighborhood {
  id: number;
  documentId: string;
  name: string;
  hashtagOne: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  hashtagTwo: string;
  slug: string;
  hashtagOneDescription: string;
  hashtagTwoDescription: string;
  city_gems?: CityGem[];
  properties?: PropertyBasic[];
  city?: City;
  map_pin?: MapPin;
  offers?: Offer[];
  one_day_itinerary?: any | null;
  tags?: Tag[];
  vibes?: any[];
  cardImage?: CardImage;
  carousel_images?: CarouselImage[];
  hashtagOneIcon?: any | null;
  hashtagTwoIcon?: any | null;
  localizations?: any[];
}

export interface CityGem {
  id: number;
  documentId: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  googleMapsUrl: string;
  tip: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  substatus: string | null;
  coverImage?: CoverImage;
  neighborhoods?: NeighborhoodBasic[];
  tags?: Tag[];
  icon?: any | null;
  localizations?: any[];
}

export interface PropertyBasic {
  id: number;
  documentId: string;
  name: string;
  acronym: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  bookingPage: string;
  slug: string;
  description: string | null;
  lobbyWifiSSID: string | null;
}

export interface NeighborhoodBasic {
  id: number;
  documentId: string;
  name: string;
  hashtagOne: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  hashtagTwo: string;
  slug: string;
  hashtagOneDescription: string;
  hashtagTwoDescription: string;
}

export interface City {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  type: string | null;
}

export interface CardImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isUrlSigned: boolean;
}

export interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isUrlSigned: boolean;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  isUrlSigned: boolean;
}

export interface MapPin {
  id: number;
  documentId: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  geohash: string;
  map: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Offer {
  id: number;
  documentId: string;
  name: string;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  claimOfferUrl: string;
  slug: string;
}

export interface RoomType {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  roomCleaningFee: number;
  floorArea: string;
  description: string;
  bookingEngineRoomId: string | null;
}

export interface PropertyType {
  id: number;
  documentId: string;
  name: string;
  carouselSectionHeaderTitle: string;
  carouselSectionHeaderDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface CarouselImage {
  id: number;
  documentId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

export interface AccessPoint {
  id: number;
  documentId: string;
  name: string;
  description: string;
  isTrainStation: boolean | null;
  isAirport: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}