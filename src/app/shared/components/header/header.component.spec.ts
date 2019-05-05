import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct title', () => {
    component.title = 'My Title';
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('My Title');
  });

  describe('Action buttons', () => {
    let buttons: NodeList;
    let buttonsArray: HTMLElement[];
    let editButton: HTMLElement;
    let removeButton: HTMLElement;
    let addButton: HTMLElement;

    beforeEach(() => {
      buttons = fixture.nativeElement.querySelectorAll('button');
      buttonsArray = Array.prototype.slice.call(buttons);
      editButton = buttonsArray.find(el => el.textContent.indexOf('Edit') > -1);
      removeButton = buttonsArray.find(el => el.textContent.indexOf('Remove') > -1);
      addButton = buttonsArray.find(el => el.textContent.indexOf('Add') > -1);
    });

    it('should display 3 buttons which contain the text (Add, Remove, Edit)', () => {
      expect(buttons.length).toEqual(3);
    });

    it('should contain a button with "Edit" text', () => {
      expect(editButton).toBeTruthy();
    });

    it('should contain a button with "Remove" text', () => {
      expect(removeButton).toBeTruthy();
    });

    it('should contain a button with "Add" text', () => {
      expect(addButton).toBeTruthy();
    });

    it('should emit \'edit\' event on click on edit button', async() => {
      component.edit.subscribe(click => {
        expect(click).toBeTruthy();
      });
      editButton.click();
    });

    it('should emit \'remove\' event on click on remove button', async() => {
      component.remove.subscribe(click => {
        expect(click).toBeTruthy();
      });
      removeButton.click();
    });

    it('should emit \'addNew\' event on click on add button', async() => {
      component.addNew.subscribe(click => {
        expect(click).toBeTruthy();
      });
      addButton.click();
    });

    it('should set edit button to disabled on setting disableEdit to true', () => {
      component.disableEdit = true;
      fixture.detectChanges();
      const disabled = editButton.getAttribute('disabled');
      expect(disabled !== null).toBeTruthy();
    });

    it('should set remove button to disabled on setting disableRemove to true', () => {
      component.disableRemove = true;
      fixture.detectChanges();
      const disabled = removeButton.getAttribute('disabled');
      expect(disabled !== null).toBeTruthy();
    });

    it('should set add button to disabled on setting disableAddNew to true', () => {
      component.disableAddNew = true;
      fixture.detectChanges();
      const disabled = addButton.getAttribute('disabled');
      expect(disabled !== null).toBeTruthy();
    });
  });
});


