import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskClosedPage } from './task-closed.page';

describe('TaskClosedPage', () => {
  let component: TaskClosedPage;
  let fixture: ComponentFixture<TaskClosedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskClosedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
