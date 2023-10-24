export interface Photo {
  uri: string;
  type: string;
  name: string;
}

export interface StrapiPhoto {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          url: string;
        };
        large: {
          url: string;
        };
        medium: {
          url: string;
        };
        small: {
          url: string;
        };
      };
      url: string;
    };
  };
}

export interface List<D> {
  data: Array<D>;
  start: number;
  limit: number;
  reachEnd: boolean;
}

export const emptyList: List<any> = {
  data: [],
  start: 0,
  limit: 10,
  reachEnd: false,
};
