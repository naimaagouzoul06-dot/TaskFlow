import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KanbanService } from '../../services/kanban';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<any>;

  constructor(private kanbanService: KanbanService) {}

  ngOnInit() {
    this.stats$ = this.kanbanService.tasks$.pipe(
      map(tasks => ({
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        inprogress: tasks.filter(t => t.status === 'inprogress').length,
        done: tasks.filter(t => t.status === 'done').length,
        highPriority: tasks.filter(t => t.priority === 'high').length,
        completionRate: tasks.length > 0
          ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)
          : 0
      }))
    );
  }
}