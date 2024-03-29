export interface StrapiCategory {
  data: PlaceCategory;
}

export interface PlaceCategory {
  id: number;
  attributes: {
    name: string;
    icon: string;
    order: number;
    locale: string;
    localizations: {
      data: {
        attributes: {
          name: string;
          icon: string;
          order: number;
          locale: string;
        };
      }[];
    };
  };
}
