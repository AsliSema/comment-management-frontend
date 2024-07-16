import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCommentsBelongUserComponent } from './get-comments-belong-user.component';

describe('GetCommentsBelongUserComponent', () => {
  let component: GetCommentsBelongUserComponent;
  let fixture: ComponentFixture<GetCommentsBelongUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCommentsBelongUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCommentsBelongUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
