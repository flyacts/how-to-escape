import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskQsComponent } from './desk-qs.component';

describe('DeskQsComponent', () => {
  let component: DeskQsComponent;
  let fixture: ComponentFixture<DeskQsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskQsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
