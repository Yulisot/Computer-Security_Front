import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemScreenComponent } from './system-screen.component';

describe('SystemScreenComponent', () => {
  let component: SystemScreenComponent;
  let fixture: ComponentFixture<SystemScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemScreenComponent]
    });
    fixture = TestBed.createComponent(SystemScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
