import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() submitTask = new EventEmitter<any>();
  @Output() cancelForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() { this.buildForm(); }
  ngOnChanges() { if (this.form) this.buildForm(); }

  buildForm() {
    this.form = this.fb.group({
      title: [this.taskToEdit?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.taskToEdit?.description || '', Validators.required],
      priority: [this.taskToEdit?.priority || 'medium', Validators.required],
      assignee: [this.taskToEdit?.assignee || '', Validators.required],
      dueDate: [this.taskToEdit?.dueDate || '', Validators.required],
      status: [this.taskToEdit?.status || 'todo', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitTask.emit(this.form.value);
      this.form.reset({ priority: 'medium', status: 'todo' });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() { this.cancelForm.emit(); }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}