import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAcompananteComponent } from './nuevo-acompanante.component';

describe('NuevoAcompananteComponent', () => {
  let component: NuevoAcompananteComponent;
  let fixture: ComponentFixture<NuevoAcompananteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAcompananteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAcompananteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
