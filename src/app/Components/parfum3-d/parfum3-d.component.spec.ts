import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parfum3DComponent } from './parfum3-d.component';

describe('Parfum3DComponent', () => {
  let component: Parfum3DComponent;
  let fixture: ComponentFixture<Parfum3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Parfum3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parfum3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
