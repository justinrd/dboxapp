import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCancelPage } from './task-cancel.page';

describe('TaskCancelPage', () => {
  let component: TaskCancelPage;
  let fixture: ComponentFixture<TaskCancelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
