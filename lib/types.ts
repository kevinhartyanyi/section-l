export interface Property {
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
    neighborhoods: Neighborhood[];
    map_pin: MapPin;
    offers: Offer[];
    artist_depracated: any | null;
    room_types: RoomType[];
    amenities: any[];
    map_coordinate: any | null;
    property_type: PropertyType;
    carousel_images: CarouselImage[];
    access_points: AccessPoint[];
    artworks: any[];
    happy_hours: any[];
    localizations: any[];
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
  }

  export interface NeighborhoodCore {
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
    city_gems: CityGem[];
    properties: PropertyBasic[];
    city: City;
    map_pin: MapPin;
    offers: Offer[];
    one_day_itinerary: any | null;
    tags: any[];
    vibes: any[];
    cardImage: CardImage;
    carousel_images: CarouselImage[];
    hashtagOneIcon: any | null;
    hashtagTwoIcon: any | null;
    localizations: any[];
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
  