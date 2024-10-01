import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ahorca2Component } from './ahorca2.component';

describe('Ahorca2Component', () => {
  let component: Ahorca2Component;
  let fixture: ComponentFixture<Ahorca2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ahorca2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ahorca2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
