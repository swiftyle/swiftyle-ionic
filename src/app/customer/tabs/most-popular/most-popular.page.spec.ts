import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostPopularPage } from './most-popular.page';

describe('MostPopularPage', () => {
  let component: MostPopularPage;
  let fixture: ComponentFixture<MostPopularPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
