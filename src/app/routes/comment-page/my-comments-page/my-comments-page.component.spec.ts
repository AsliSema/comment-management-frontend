import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommentsPageComponent } from './my-comments-page.component';

describe('MyCommentsPageComponent', () => {
  let component: MyCommentsPageComponent;
  let fixture: ComponentFixture<MyCommentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCommentsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCommentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
