import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Status } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Créer le module d\'authentification',
      description: 'Implémenter le login et la gestion des tokens JWT.',
      priority: 'high',
      assignee: 'DOHA',
      dueDate: '2025-07-10',
      status: 'todo'
    },
    {
      id: 2,
      title: 'Concevoir la base de données',
      description: 'Modéliser les entités Task, User et Project.',
      priority: 'high',
      assignee: 'NAIMA',
      dueDate: '2025-07-05',
      status: 'todo'
    },
    {
      id: 3,
      title: 'Développer l\'API REST',
      description: 'Créer les endpoints CRUD pour les tâches.',
      priority: 'medium',
      assignee: 'SALMA',
      dueDate: '2025-07-15',
      status: 'inprogress'
    },
    {
      id: 4,
      title: 'Intégration RxJS pour les KPI',
      description: 'Utiliser des observables pour les statistiques temps réel.',
      priority: 'medium',
      assignee: 'IKRAM',
      dueDate: '2025-07-20',
      status: 'inprogress'
    },
    {
      id: 5,
      title: 'Setup du projet Angular',
      description: 'Initialiser le projet avec la structure de dossiers.',
      priority: 'low',
      assignee: 'DOHA',
      dueDate: '2025-06-28',
      status: 'done'
    },
    {
      id: 6,
      title: 'Rédaction des spécifications',
      description: 'Écrire les specs fonctionnelles (Section 5).',
      priority: 'low',
      assignee: 'NAIMA',
      dueDate: '2025-06-25',
      status: 'done'
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  private nextId = 7;

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = { ...task, id: this.nextId++ };
    const updated = [...this.tasksSubject.getValue(), newTask];
    this.tasksSubject.next(updated);
  }

  updateTask(updated: Task): void {
    const tasks = this.tasksSubject.getValue().map(t =>
      t.id === updated.id ? updated : t
    );
    this.tasksSubject.next(tasks);
  }

  deleteTask(id: number): void {
    const tasks = this.tasksSubject.getValue().filter(t => t.id !== id);
    this.tasksSubject.next(tasks);
  }

  moveTask(id: number, newStatus: Status): void {
    const tasks = this.tasksSubject.getValue().map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    this.tasksSubject.next(tasks);
  }

  getStats() {
    const all = this.tasksSubject.getValue();
    return {
      total: all.length,
      todo: all.filter(t => t.status === 'todo').length,
      inprogress: all.filter(t => t.status === 'inprogress').length,
      done: all.filter(t => t.status === 'done').length,
      highPriority: all.filter(t => t.priority === 'high').length
    };
  }
}