import { Feature, Point } from 'geojson';

export const createPointFeature = (coordinates: number[]): Feature<Point> => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coordinates,
    },
    properties: null,
  };
};
