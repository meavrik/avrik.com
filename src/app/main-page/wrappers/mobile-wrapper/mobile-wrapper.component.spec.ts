import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileWrapperComponent } from './mobile-wrapper.component';

describe('MobileWrapperComponent', () => {
  let component: MobileWrapperComponent;
  let fixture: ComponentFixture<MobileWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
