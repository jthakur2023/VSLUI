import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListingsDetailsComponent } from './all-listings-details.component';

describe('AllListingsDetailsComponent', () => {
  let component: AllListingsDetailsComponent;
  let fixture: ComponentFixture<AllListingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllListingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllListingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
