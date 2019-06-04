import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCategoryComponent } from './check-category.component';

describe('CheckCategoryComponent', () => {
  let component: CheckCategoryComponent;
  let fixture: ComponentFixture<CheckCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
