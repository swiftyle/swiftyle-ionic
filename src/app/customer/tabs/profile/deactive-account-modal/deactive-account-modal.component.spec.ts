import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeactiveAccountModalComponent } from './deactive-account-modal.component';

describe('DeactiveAccountModalComponent', () => {
  let component: DeactiveAccountModalComponent;
  let fixture: ComponentFixture<DeactiveAccountModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactiveAccountModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeactiveAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
