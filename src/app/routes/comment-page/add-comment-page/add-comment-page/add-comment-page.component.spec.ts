import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentPageComponent } from './add-comment-page.component';

describe('AddCommentPageComponent', () => {
  let component: AddCommentPageComponent;
  let fixture: ComponentFixture<AddCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
