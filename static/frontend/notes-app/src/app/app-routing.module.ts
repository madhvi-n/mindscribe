import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LabelComponent } from './label/label.component';
import { ArchivedNotesComponent } from './archived-notes/archived-notes.component';
import { SearchComponent } from './search/search.component';
import { ReminderComponent } from './reminder/reminder.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'logout',
    component: SignOutComponent
  },
  {
    path: 'reminders',
    component: ReminderComponent,
  },
  {
    path: 'archive',
    component: ArchivedNotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'labels/:label',
    component: LabelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
