import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPlatform1Component } from './games-platform1.component';

describe('GamesPlatform1Component', () => {
  let component: GamesPlatform1Component;
  let fixture: ComponentFixture<GamesPlatform1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesPlatform1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPlatform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
