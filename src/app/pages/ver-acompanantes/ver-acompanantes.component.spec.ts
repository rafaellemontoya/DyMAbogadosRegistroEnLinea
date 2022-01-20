import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAcompanantesComponent } from './ver-acompanantes.component';

describe('VerAcompanantesComponent', () => {
  let component: VerAcompanantesComponent;
  let fixture: ComponentFixture<VerAcompanantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAcompanantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAcompanantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
