import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tags-control',
  templateUrl: './tags-control.component.html',
  styleUrls: ['./tags-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsControlComponent,
      multi: true
    }
  ]
})
export class TagsControlComponent implements OnInit, ControlValueAccessor {

  @Input() mapArray: any;
  @Input() mapkey: any;
  @Input() tags: string[];
  disabled: boolean;
  displayTags: string[];
  onChange: (value: any) => void;
  constructor() { }

  ngOnInit() {
  }

  private updateDisplayTags(){
    if(this.mapArray && this.mapkey){
      this.displayTags = this.tags.map(tag => {
        const item = this.mapArray.find((key: any) => +key[this.mapkey] === +tag);
        return item && item.name || tag;
      });
      return;
    }
    this.displayTags = this.tags;
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(_tag => _tag !== tag);
    if(this.onChange){
      this.onChange(this.tags);
    }
    this.updateDisplayTags();
  }

  writeValue(tags: any): void {
    this.tags = tags;
    this.updateDisplayTags();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // Not implemented
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
