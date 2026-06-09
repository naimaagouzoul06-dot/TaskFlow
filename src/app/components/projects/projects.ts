import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit {
  userName = '';

  projects: Project[] = [
    {
      id: 1,
      name: 'TaskFlow — Application Kanban',
      description: 'Application Angular de gestion de projets avec tableau Kanban, RxJS et formulaires réactifs.',
      status: 'active',
      owner: 'Alice',
      membersCount: 3,
      tasksCount: 6,
      completedTasks: 2,
      color: '#DD2D4A',
      createdAt: '2025-06-01'
    },
    {
      id: 2,
      name: 'Dashboard Analytics',
      description: 'Tableau de bord de statistiques en temps réel pour le suivi des KPI métier.',
      status: 'active',
      owner: 'Bob',
      membersCount: 2,
      tasksCount: 8,
      completedTasks: 5,
      color: '#880D1E',
      createdAt: '2025-05-15'
    },
    {
      id: 3,
      name: 'API REST Backend',
      description: 'Développement de l\'API REST avec authentification JWT et documentation Swagger.',
      status: 'active',
      owner: 'Charlie',
      membersCount: 4,
      tasksCount: 12,
      completedTasks: 7,
      color: '#F26A8D',
      createdAt: '2025-04-20'
    },
    {
      id: 4,
      name: 'Refonte UI Mobile',
      description: 'Redesign complet de l\'interface mobile avec nouvelle charte graphique.',
      status: 'archived',
      owner: 'Alice',
      membersCount: 2,
      tasksCount: 10,
      completedTasks: 10,
      color: '#CBEEF3',
      createdAt: '2025-03-01'
    }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    this.userName = user?.name || '';
  }

  openKanban(project: Project) {
    this.router.navigate(['/projects', project.id, 'kanban']);
  }

  getCompletionRate(project: Project): number {
    if (project.tasksCount === 0) return 0;
    return Math.round((project.completedTasks / project.tasksCount) * 100);
  }

  get activeProjects(): Project[] {
    return this.projects.filter(p => p.status === 'active');
  }

  get archivedProjects(): Project[] {
    return this.projects.filter(p => p.status === 'archived');
  }
}