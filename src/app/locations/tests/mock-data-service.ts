import { LocationItem, Category } from "src/app/models/locations";
import { Observable } from "rxjs";

export class MockDataService {
  getLocations() {
    const locations: LocationItem[] = [{
      id: 1,
      name: 'Parents home',
      address: 'Israel, Bat-Yam, Katsenelson 42',
      coordinates: {
        lat: '123323',
        long: '123123'
      },
      catagories: [{
        name: 'home',
        id:1
      },
      {
        name: 'israel',
        id:2
      },
      {
        name: 'family',
        id:3
      }]
    },
    {
      id: 2,
      name: 'My home',
      address: 'Israel, Hertzliya, Habanim 63',
      coordinates: {
        lat: '123323',
        long: '123123'
      },
      catagories: [{
        name: 'home',
        id:1
      },
      {
        name: 'israel',
        id:2
      }]
    },
    {
      id: 3,
      name: 'Dani',
      address: 'Beer-Sheva',
      coordinates: {
        lat: '123323',
        long: '123123'
      },
      catagories: [{
        name: 'friend',
        id:5
      },
      {
        name: 'south',
        id:7
      }]
    },
    {
      id: 4,
      name: 'Moshe',
      address: 'Haifa',
      coordinates: {
        lat: '123323',
        long: '123123'
      },
      catagories: [{
        name: 'friend',
        id:5
      },
      {
        name: 'north',
        id:6
      }]
    }];
    return new Observable(subscriber => {
      subscriber.next(locations);
      subscriber.complete();
    });
  }

  getBlankLocation(): LocationItem {
    return {
      id: null,
      name: null,
      address: null,
      coordinates: {
        long: null,
        lat: null
      },
      catagories: []
    };
  }

  getCategories(): Observable<Category[]> {
    const categories: Category[] = [
      {
        name: 'home',
        id:1
      },
      {
        name: 'friends',
        id:2
      },
      {
        name: 'north',
        id:5
      },
      {
        name: 'south',
        id:5
      }
    ];
    return new Observable(subscriber => {
      subscriber.next(categories);
      subscriber.complete();
    });
  }
}
