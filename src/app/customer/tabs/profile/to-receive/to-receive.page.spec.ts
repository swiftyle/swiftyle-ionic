import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToReceivePage } from './to-receive.page';

describe('ToReceivePage', () => {
  let component: ToReceivePage;
  let fixture: ComponentFixture<ToReceivePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
