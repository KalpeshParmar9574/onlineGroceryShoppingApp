import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagaddressComponent } from './managaddress.component';

describe('ManagaddressComponent', () => {
  let component: ManagaddressComponent;
  let fixture: ComponentFixture<ManagaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagaddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
