import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeBarComponent } from './promoCode-bar.component';

describe('SideBarComponent', () => {
  let component: PromoCodeBarComponent;
  let fixture: ComponentFixture<PromoCodeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCodeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
