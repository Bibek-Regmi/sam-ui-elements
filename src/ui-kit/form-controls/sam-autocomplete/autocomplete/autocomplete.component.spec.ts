/* tslint:disable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SDSAutocompleteComponent } from './autocomplete.component';
import { AutoCompleteSampleDataService } from '../autocomplete-search/autocomplete-seach-test-service.spec';
import { SDSAutocompletelConfiguration } from './models/SDSAutocompletelConfiguration.model';
import { SDSSelectedItemModel } from '../selected-result/models/sds-selectedItem.model';
import { FormsModule } from '@angular/forms';
import { SelectionMode } from '../selected-result/models/sds-selected-item-model-helper';
import { SdsSelectedResultsModule } from '../selected-result/selected-result.module';
import { SdsAutocompleteSearchModule } from '../autocomplete-search/autocomplete-search.module';


describe('SDSAutocompleteComponent', () => {
  let component: SDSAutocompleteComponent;
  let fixture: ComponentFixture<SDSAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SDSAutocompleteComponent],
      imports: [FormsModule, SdsSelectedResultsModule, SdsAutocompleteSearchModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDSAutocompleteComponent);
    component = fixture.componentInstance;
    component.service = new AutoCompleteSampleDataService();
    component.model = new SDSSelectedItemModel();
    component.configuration = new SDSAutocompletelConfiguration();
    component.configuration.id = 'autoId';
    component.configuration.primaryKeyField = 'id';
    component.configuration.selectionMode = SelectionMode.SINGLE;
    component.configuration.primaryTextField = 'name';
    component.configuration.secondaryTextField = 'subtext';
    component.configuration.debounceTime = 0;
    component.configuration.autocompletePlaceHolderText = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle modes', () => {
    expect(component.isSingleMode()).toBeTruthy();
    component.configuration.selectionMode = SelectionMode.MULTIPLE;
    expect(component.isSingleMode()).toBeFalsy();
    component.configuration = null;
    expect(component.isSingleMode()).toBeFalsy();
  });

  it('should handle writeValue', () => {
    component.model = null;
    component.writeValue({});
    expect(component.model).toBe(null);
    let model = new SDSSelectedItemModel();
    component.writeValue(model);
    expect(component.model).toBe(model);
  });

  it('should handle disable', () => {
    expect(component.disabled).toBeFalsy();
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalsy();
  });



  it('should handle registerOnChange', () => {
    let item = {};
    component.registerOnChange(item);
    expect(component.propogateChange).toBe(item);
  });

  it('should handle registerOnTouched', () => {
    let item = {};
    component.registerOnTouched(item);
    expect(component.onTouchedCallback).toBe(item);
  });

});

