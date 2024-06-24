import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskSignaturePage } from './task-signature.page';

describe('TaskSignaturePage', () => {
  let component: TaskSignaturePage;
  let fixture: ComponentFixture<TaskSignaturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
