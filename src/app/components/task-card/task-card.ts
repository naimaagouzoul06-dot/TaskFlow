import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, Status } from '../../models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() moveTask = new EventEmitter<{ id: number, status: Status }>();

  getPriorityLabel(priority: string): string {
    const labels: any = { low: 'Basse', medium: 'Moyenne', high: 'Haute' };
    return labels[priority];
  }

  onDelete() { this.deleteTask.emit(this.task.id); }
  onEdit() { this.editTask.emit(this.task); }

  moveForward() {
    if (this.task.status === 'todo') this.moveTask.emit({ id: this.task.id, status: 'inprogress' });
    else if (this.task.status === 'inprogress') this.moveTask.emit({ id: this.task.id, status: 'done' });
  }

  moveBackward() {
    if (this.task.status === 'done') this.moveTask.emit({ id: this.task.id, status: 'inprogress' });
    else if (this.task.status === 'inprogress') this.moveTask.emit({ id: this.task.id, status: 'todo' });
  }
}