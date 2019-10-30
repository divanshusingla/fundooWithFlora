import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuardGuard} from './authGuard/auth-guard.guard'
import { NoteMainComponent } from './components/note-main/note-main.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LabelComponent } from './components/label/label.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Route[] = [
  {path : '', redirectTo : '/login' , pathMatch : 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'registration', component : RegisterComponent },
  {path : 'resetpassword/:token', component : ResetPasswordComponent},
  {path : 'forgot', component : ForgotPasswordComponent },
  {path : '', component : DashboardComponent, canActivate: [AuthGuardGuard],
children : [
  {path : 'note', component : NoteMainComponent},
  {path : 'label/:label', component : LabelComponent},
  {path : 'archive', component : ArchiveComponent},
  {path : 'reminder', component : ReminderComponent},
  {path : 'trash', component : TrashComponent},
  {path : 'search', component : SearchbarComponent},
  {path : 'reminder', component : ReminderComponent},
  {path : 'question/:id', component : QuestionsComponent}

] },
  {path : '**', component : PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
