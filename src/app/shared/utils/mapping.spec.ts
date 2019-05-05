import { mapObject } from "./mapping";
import { locationItemMapper } from "src/app/locations/config/location-item-mapper";

describe('mapObject', () => {
  it('should return a list of key/value object', () => {
    const blankLocation = {
      id: null,
      name: null,
      address: null,
      coordinates: {
        long: null,
        lat: null
      },
      catagories: []
    };
    const mappedObject = mapObject(locationItemMapper, blankLocation);
  });
});

