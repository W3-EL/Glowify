import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBarComponent } from './product-bar.component';

describe('ProductBarComponent', () => {
  let component: ProductBarComponent;
  let fixture: ComponentFixture<ProductBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
