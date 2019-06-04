import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFightComponent } from './random-fight.component';

describe('RandomFightComponent', () => {
  let component: RandomFightComponent;
  let fixture: ComponentFixture<RandomFightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomFightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
