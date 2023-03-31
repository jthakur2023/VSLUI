import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingItemCreateComponent } from './listing-item-create.component';

describe('ListingItemCreateComponent', () => {
  let component: ListingItemCreateComponent;
  let fixture: ComponentFixture<ListingItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingItemCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
