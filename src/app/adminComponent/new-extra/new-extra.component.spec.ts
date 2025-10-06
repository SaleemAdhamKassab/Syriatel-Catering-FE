import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExtraComponent } from './new-extra.component';

describe('NewExtraComponent', () => {
  let component: NewExtraComponent;
  let fixture: ComponentFixture<NewExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
