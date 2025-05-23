import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProfilePictureComponent } from './input-profile-picture.component';

describe('InputProfilePictureComponent', () => {
  let component: InputProfilePictureComponent;
  let fixture: ComponentFixture<InputProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputProfilePictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
