import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from './../../../shared/services/data.service';
import { MockDataService } from './../../tests/mock-data-service';
import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [LocationsComponent],
      providers: [{ provide: DataService, useClass: MockDataService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the correct location id on clicking on a row', () => {
    spyOn(component, 'onLocationClick');
    fixture.nativeElement.querySelector('tbody tr').click();
    expect(component.onLocationClick).toHaveBeenCalledWith(1);
  });

  it('should sort locations by name', () => {
    component.onClickSort('name');
    expect(component.locations[0].name).toEqual('Dani');
    expect(component.locations[1].name).toEqual('Moshe');
    expect(component.locations[2].name).toEqual('My home');
    expect(component.locations[3].name).toEqual('Parents home');
  });

  describe('location details', () => {
    let tableBodyArr: HTMLElement[];
    let location;
    beforeEach(() => {
      const tableBody = fixture.nativeElement.querySelectorAll('tbody td');
      tableBodyArr = Array.prototype.slice.call(tableBody);
      location = component.locations[0];
    });

    it('should display location name', () => {
      const name = tableBodyArr.find(element => element.textContent.indexOf(location.name) > -1);
      expect(name).toBeTruthy();
    });

    it('should display location address', () => {
      const address = tableBodyArr.find(element => element.textContent.indexOf(location.address) > -1);
      expect(address).toBeTruthy();
    });

    it('should display location longitude', () => {
      const long = tableBodyArr.find(element => element.textContent.indexOf(location.coordinates.long) > -1);
      expect(long).toBeTruthy();
    });

    it('should display location latitude', () => {
      const lat = tableBodyArr.find(element => element.textContent.indexOf(location.coordinates.lat) > -1);
      expect(lat).toBeTruthy();
    });

    it('should display location first category', () => {
      const cat = tableBodyArr.find(element => element.textContent.indexOf(location.catagories[0].name) > -1);
      expect(cat).toBeTruthy();
    });
  });

});
