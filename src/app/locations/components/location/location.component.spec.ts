import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TagsControlComponent } from 'src/app/shared/components/tags-control/tags-control.component';
import { LocationComponent } from './location.component';
import { mockCategories } from './tests/mock.categories';
import { mockLocation } from './tests/mock.location';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent, TagsControlComponent],
      imports: [ReactiveFormsModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    component.location = mockLocation;
    component.categories = mockCategories;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Display on screen', () => {
    let name: HTMLFormElement;
    let address: HTMLFormElement;
    let long: HTMLFormElement;
    let lat: HTMLFormElement;
    let categories: HTMLElement[];

    beforeEach(() => {
      name = element.querySelector('#name');
      address = element.querySelector('#address');
      long = element.querySelector('#long');
      lat = element.querySelector('#lat');
      categories = Array.prototype.slice.call(element.querySelectorAll('.catagories'));
    });

    it('shoult display location details', () => {
      expect(name.value).toEqual(component.location.name);
      expect(address.value).toEqual(component.location.address);
      expect(long.value).toEqual(component.location.coordinates.long);
      expect(lat.value).toEqual(component.location.coordinates.lat);

      const locationCategoryNames = component.location.catagories.map(c => c.name);
      expect(categories.map(e => e.textContent.trim())).toEqual(locationCategoryNames);
    });

    it('should disable all fields when not on edit mode', () => {
      component.editMode = false;
      fixture.detectChanges();

      expect(name.getAttribute('disabled') !== null).toBeTruthy();
      expect(address.getAttribute('disabled') !== null).toBeTruthy();
      expect(long.getAttribute('disabled') !== null).toBeTruthy();
      expect(lat.getAttribute('disabled') !== null).toBeTruthy();

      const categoryRemoveButton = categories[0].querySelector('.remove-category');
      expect(categoryRemoveButton === null).toBeTruthy();

      const categorySelection = element.querySelector('.category-selection');
      expect(categorySelection === null).toBeTruthy();
    });

    it('should enable all fields when on edit mode', () => {
      component.editMode = true;
      fixture.detectChanges();

      expect(name.getAttribute('disabled') === null).toBeTruthy();
      expect(address.getAttribute('disabled') === null).toBeTruthy();
      expect(long.getAttribute('disabled') === null).toBeTruthy();
      expect(lat.getAttribute('disabled') === null).toBeTruthy();

      const categoryRemoveButton = categories[0].querySelector('.remove-category');
      expect(categoryRemoveButton !== null).toBeTruthy();

      const categorySelection = element.querySelector('.category-selection');
      expect(categorySelection !== null).toBeTruthy();
    });
  });

  describe('location editing', () => {
    beforeEach(() => {
      component.editMode = true;
      fixture.detectChanges();
    });

    it('should save changes to location when clicking save', () => {
      component.formGroup.get('name').setValue('New Value');
      component.formGroup.get('address').setValue('New Address');
      component.formGroup.get('long').setValue('New Long');
      component.formGroup.get('lat').setValue('New Lat');
      component.formGroup.get('catagories').setValue(['north']);
      const saveBtn: HTMLElement = element.querySelector('.save-location');
      saveBtn.click();
      fixture.detectChanges();
      expect(component.location.name).toEqual('New Value');
      expect(component.location.address).toEqual('New Address');
      expect(component.location.coordinates.long).toEqual('New Long');
      expect(component.location.coordinates.lat).toEqual('New Lat');
      expect(component.location.catagories[0].name).toEqual('north');
    });
  });

  describe('Restrictions', () => {
    beforeEach(() => {
      component.editMode = true;
    });

    it('saving should be disabled if not all fields are filled', () => {
      component.formGroup.get('long').setValue(null);
      fixture.detectChanges();
      const saveBtn: HTMLElement = element.querySelector('.save-location');
      expect(saveBtn.getAttribute('disabled') !== null).toBeTruthy();

      component.formGroup.get('long').setValue('123123');
      fixture.detectChanges();
      expect(saveBtn.getAttribute('disabled') === null).toBeTruthy();
    });

    it('should\'t display the form without location', () => {
      component.location = undefined;
      fixture.detectChanges();
      expect(element.querySelector('#name')).toEqual(null);
    });

    it('should\'t display the form without catagories', () => {
      component.categories = undefined;
      fixture.detectChanges();
      expect(element.querySelector('#name')).toEqual(null);
    });
  });

});
