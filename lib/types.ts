export interface Property {
  id: number;
  documentId: string;
  name: string;
  acronym: string;
}

export interface Neighborhood {
  id: number;
  properties?: PropertyMinimal[];
  city_gems?: CityGemMinimal[];
}

export interface PropertyMinimal {
  id: number;
}

export interface CityGemMinimal {
  id: number;
  name: string;
  category: string;
}

export interface CityGem {
  id: number;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  googleMapsUrl: string;
  tip: string;
  slug: string;
  coverImage?: CoverImage;
  tags?: Tag[];
}

export interface CoverImage {
  url: string;
  alternativeText: string | null;
  formats?: {
    large?: {
      url: string;
    };
    medium?: {
      url: string;
    };
    small?: {
      url: string;
    };
  };
}

export interface Tag {
  id: number;
  name: string;
}
