import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChkboxGroupComponent } from './my-chkbox-group.component';

describe('MyChkboxGroupComponent', () => {
  let component: MyChkboxGroupComponent;
  let fixture: ComponentFixture<MyChkboxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChkboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChkboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
