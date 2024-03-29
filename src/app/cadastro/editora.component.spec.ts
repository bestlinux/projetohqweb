import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoraComponent } from './editora.component';

describe('EditoraComponent', () => {
  let component: EditoraComponent;
  let fixture: ComponentFixture<EditoraComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditoraComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
