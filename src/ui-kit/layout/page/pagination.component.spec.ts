import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { } from '../../';
import { SamPageComponent } from './page.component';
import { SamTitleModule } from '../../../ui-kit/experimental/title/title.module';

fdescribe('SamPageComponent', () => {
  let component: SamPageComponent;
  let fixture: ComponentFixture<SamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SamPageComponent],
      imports: [FormsModule,SamTitleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });


  it('intro', () => {


    component.intro ="test into";
  

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.intro'));
    expect(el.nativeElement.innerHTML).toContain('test into');


  });


  // it('title', () => {
     

  //   fixture.detectChanges();
  //   component.title ="test title";  
  //   fixture.detectChanges();
  //   const el = fixture.debugElement.query(By.css('sam-title'));
  //   console.log(el.nativeElement);
  //   console.log(el);
  //   expect(el.nativeElement.innerHTML).toContain('test title');
  // });

});
