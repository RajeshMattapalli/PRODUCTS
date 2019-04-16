import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsIdComponent } from './product-details-id.component';

describe('ProductDetailsIdComponent', () => {
  let component: ProductDetailsIdComponent;
  let fixture: ComponentFixture<ProductDetailsIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
