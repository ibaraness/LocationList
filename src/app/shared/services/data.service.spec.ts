import { TestBed, async } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLocations should return a list of LocationItem items', async(() => {
    service.getLocations().subscribe(locations => {
      expect(Array.isArray(locations)).toBeTruthy();
      const locationKeys = ["id", "name", "address", "coordinates", "catagories"];
      expect(Object.keys(locations[0])).toEqual(locationKeys);
    });
  }));

  it('getCategories should return a list of Category items', async(() => {
    service.getCategories().subscribe(categories => {
      expect(Array.isArray(categories)).toBeTruthy();
      expect(categories[0].hasOwnProperty('name')).toBeTruthy();
    });
  }));

  it('getBlankLocation should return a LocationItem object', async(() => {
    const location = service.getBlankLocation();
    const locationKeys = ["id", "name", "address", "coordinates", "catagories"];
    expect(Object.keys(location)).toEqual(locationKeys);
  }));
});
