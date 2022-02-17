import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPayComponent } from './delivery-pay.component';

describe('DeliveryPayComponent', () => {
  let component: DeliveryPayComponent;
  let fixture: ComponentFixture<DeliveryPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
