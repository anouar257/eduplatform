import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ExamDetailComponent } from './components/exam-detail/exam-detail.component';
import { LiveSessionsComponent } from './components/live-sessions/live-sessions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContactComponent } from './components/contact/contact.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { LibraryComponent } from './components/library/library.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'EduPlatform - Apprenez n\'importe quoi' },
  { path: 'courses', component: CoursesComponent, title: 'Catalogue des cours - EduPlatform' },
  { path: 'courses/:id', component: CourseDetailComponent, title: 'Détails du cours - EduPlatform' },
  { path: 'exams', component: ExamsComponent, title: 'Examens - EduPlatform' },
  { path: 'exams/:id', component: ExamDetailComponent, title: 'Examen - EduPlatform' },
  { path: 'live-sessions', component: LiveSessionsComponent, title: 'Sessions en direct - EduPlatform' },
  { path: 'teachers', component: TeachersComponent, title: 'Nos Professeurs - EduPlatform' },
  { path: 'blog', component: BlogComponent, title: 'Blog - EduPlatform' },
  { path: 'about', component: AboutComponent, title: 'À propos - EduPlatform' },
  { path: 'calendar', component: CalendarComponent, title: 'Calendrier - EduPlatform' },
  { path: 'contact', component: ContactComponent, title: 'Contact - EduPlatform' },
  { path: 'glossary', component: GlossaryComponent, title: 'Glossaire - EduPlatform' },
  { path: 'library', component: LibraryComponent, title: 'Bibliothèque - EduPlatform' },
  { path: 'dashboard', component: DashboardComponent, title: 'Mon tableau de bord - EduPlatform' },
  { path: 'teacher', component: TeacherDashboardComponent, title: 'Espace professeur - EduPlatform' },
  { path: 'parent', component: ParentDashboardComponent, title: 'Espace parent - EduPlatform' },
  { path: 'admin', component: AdminDashboardComponent, title: 'Administration - EduPlatform' },
  { path: 'login', component: LoginComponent, title: 'Connexion - EduPlatform' },
  { path: 'register', component: RegisterComponent, title: 'Inscription - EduPlatform' },
  { path: '**', redirectTo: '' }
];
