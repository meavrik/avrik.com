import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChipsComponent } from './my-chips.component';

describe('MyChipsComponent', () => {
  let component: MyChipsComponent;
  let fixture: ComponentFixture<MyChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
