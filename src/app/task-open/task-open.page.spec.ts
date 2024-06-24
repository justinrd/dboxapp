import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskOpenPage } from './task-open.page';

describe('TaskOpenPage', () => {
  let component: TaskOpenPage;
  let fixture: ComponentFixture<TaskOpenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
