import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, Status } from '../../models/task';
import { KanbanService } from '../../services/kanban';
import { TaskCardComponent } from '../task-card/task-card';
import { TaskFormComponent } from '../task-form/task-form';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent],
  templateUrl: './kanban.html',
  styleUrls: ['./kanban.css']
})
export class KanbanComponent implements OnInit {
  showForm = false;
  taskToEdit: Task | null = null;
  filterPriority = '';
  filterAssignee = '';
  assignees: string[] = ['Alice', 'Bob', 'Charlie'];

  todoTasks$!: Observable<Task[]>;
  inprogressTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;

  columns = [
    { id: 'todo' as Status, label: '📌 À faire', color: '#880D1E' },
    { id: 'inprogress' as Status, label: '🔄 En cours', color: '#DD2D4A' },
    { id: 'done' as Status, label: '✅ Terminé', color: '#2e7d32' }
  ];

  constructor(private kanbanService: KanbanService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() { this.refreshStreams(); }

  refreshStreams() {
    const filtered$ = this.kanbanService.tasks$.pipe(
      map(tasks => tasks.filter(t => {
        const matchPriority = this.filterPriority ? t.priority === this.filterPriority : true;
        const matchAssignee = this.filterAssignee ? t.assignee === this.filterAssignee : true;
        return matchPriority && matchAssignee;
      }))
    );
    this.todoTasks$ = filtered$.pipe(map(tasks => tasks.filter(t => t.status === 'todo')));
    this.inprogressTasks$ = filtered$.pipe(map(tasks => tasks.filter(t => t.status === 'inprogress')));
    this.doneTasks$ = filtered$.pipe(map(tasks => tasks.filter(t => t.status === 'done')));
  }

  getTasksForColumn(status: Status): Observable<Task[]> {
    if (status === 'todo') return this.todoTasks$;
    if (status === 'inprogress') return this.inprogressTasks$;
    return this.doneTasks$;
  }

  openForm() { this.taskToEdit = null; this.showForm = true; }

  onEditTask(task: Task) { this.taskToEdit = task; this.showForm = true; }

  onSubmitTask(formValue: any) {
    if (this.taskToEdit) {
      this.kanbanService.updateTask({ ...this.taskToEdit, ...formValue });
    } else {
      this.kanbanService.addTask(formValue);
    }
    this.showForm = false;
    this.taskToEdit = null;
  }

  onDeleteTask(id: number) {
    if (confirm('Supprimer cette tâche ?')) this.kanbanService.deleteTask(id);
  }

  onMoveTask(event: { id: number, status: Status }) {
    this.kanbanService.moveTask(event.id, event.status);
  }

  onFilterChange() { this.refreshStreams(); }

  resetFilters() {
    this.filterPriority = '';
    this.filterAssignee = '';
    this.refreshStreams();
  }

<<<<<<< HEAD
=======
  goBack() {
  this.router.navigate(['/projects']);
}
>>>>>>> cfebc1011e99246acf22873bc35762c0af26476f
}