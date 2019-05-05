import { Category } from "src/app/models/locations";
import { ObjectMapperMap } from "src/app/models/mapper";

export const locationItemMapper: ObjectMapperMap = {
  name: {
    path: ['name']
  },
  address: {
    path: ['address']
  },
  long: {
    path: ['coordinates', 'long']
  },
  lat: {
    path: ['coordinates', 'lat']
  },
  catagories: {
    path: ['catagories'],
    actions: [
      {
        name: 'mapArray',
        action: (catagory: Category) => catagory.id
      }
    ]
  }
};
