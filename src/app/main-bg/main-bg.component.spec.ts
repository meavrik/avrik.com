import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBgComponent } from './main-bg.component';

describe('MainBgComponent', () => {
  let component: MainBgComponent;
  let fixture: ComponentFixture<MainBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
