import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HQComponent } from './hq.component';

describe('HQComponent', () => {
  let component: HQComponent;
  let fixture: ComponentFixture<HQComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HQComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
