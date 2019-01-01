import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcWrapperComponent } from './pc-wrapper.component';

describe('PcWrapperComponent', () => {
  let component: PcWrapperComponent;
  let fixture: ComponentFixture<PcWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
