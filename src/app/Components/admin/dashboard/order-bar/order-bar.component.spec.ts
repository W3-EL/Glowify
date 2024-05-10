import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBarComponent } from './order-bar.component';

describe('BottomBarComponent', () => {
  let component: OrderBarComponent;
  let fixture: ComponentFixture<OrderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
