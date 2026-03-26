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
import { FaqComponent } from './components/faq/faq.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { LegalComponent } from './components/legal/legal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';

// New Features (Teacher, Lesson, Payment, Profile)
import { CreateCourseComponent } from './features/teacher/create-course/create-course.component';
import { CreateLiveSessionComponent } from './features/teacher/create-live-session/create-live-session.component';
import { CreateExamComponent } from './features/teacher/create-exam/create-exam.component';
import { ExamCorrectionComponent } from './features/teacher/exam-correction/exam-correction.component';
import { LessonPlayerComponent } from './features/courses/lesson-player/lesson-player.component';
import { CheckoutComponent } from './features/payment/checkout/checkout.component';
import { CheckoutSuccessComponent } from './features/payment/checkout-success/checkout-success.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';

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
  { path: 'faq', component: FaqComponent, title: 'FAQ - EduPlatform' },
  { path: 'privacy', component: PrivacyComponent, title: 'Politique de confidentialité - EduPlatform' },
  { path: 'terms', component: TermsComponent, title: 'Conditions d\'utilisation - EduPlatform' },
  { path: 'legal', component: LegalComponent, title: 'Mentions légales - EduPlatform' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Mot de passe oublié - EduPlatform' },
  { path: 'dashboard', component: DashboardComponent, title: 'Mon tableau de bord - EduPlatform', canActivate: [authGuard], data: { roles: ['student'] } },
  { path: 'teacher', component: TeacherDashboardComponent, title: 'Espace professeur - EduPlatform', canActivate: [authGuard], data: { roles: ['teacher'] } },
  { path: 'parent', component: ParentDashboardComponent, title: 'Espace parent - EduPlatform', canActivate: [authGuard], data: { roles: ['parent'] } },
  { path: 'admin', component: AdminDashboardComponent, title: 'Administration - EduPlatform', canActivate: [authGuard], data: { roles: ['admin'] } },
  { path: 'login', component: LoginComponent, title: 'Connexion - EduPlatform' },
  { path: 'register', component: RegisterComponent, title: 'Inscription - EduPlatform' },

  // New Features Routes
  { path: 'teacher/courses/create', component: CreateCourseComponent, title: 'Nouveau cours - EduPlatform', canActivate: [authGuard], data: { roles: ['teacher'] } },
  { path: 'teacher/sessions/create', component: CreateLiveSessionComponent, title: 'Nouvelle session - EduPlatform', canActivate: [authGuard], data: { roles: ['teacher'] } },
  { path: 'teacher/exams/create', component: CreateExamComponent, title: 'Nouvel examen - EduPlatform', canActivate: [authGuard], data: { roles: ['teacher'] } },
  { path: 'teacher/exams/:id/correct', component: ExamCorrectionComponent, title: 'Correction - EduPlatform', canActivate: [authGuard], data: { roles: ['teacher'] } },
  { path: 'courses/:courseId/lessons/:lessonId', component: LessonPlayerComponent, title: 'Lecteur de cours - EduPlatform' },
  { path: 'checkout/:id', component: CheckoutComponent, title: 'Paiement - EduPlatform', canActivate: [authGuard], data: { roles: ['student', 'parent'] } },
  { path: 'checkout/:id/success', component: CheckoutSuccessComponent, title: 'Paiement réussi - EduPlatform', canActivate: [authGuard], data: { roles: ['student', 'parent'] } },
  { path: 'profile/edit', component: EditProfileComponent, title: 'Modifier profil - EduPlatform', canActivate: [authGuard], data: { roles: ['student', 'teacher', 'parent', 'admin'] } },

  { path: '**', redirectTo: '' }
];
