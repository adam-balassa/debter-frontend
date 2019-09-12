import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './home/index/index.component';
import { ContactComponent } from './home/contact/contact.component';
import { AboutComponent } from './home/about/about.component';
import { LoginComponent } from './home/login/login.component';
import { CreateComponent } from './home/create/create.component';
import { CoreComponent } from './core/core.component';
import { MainComponent } from './core/main/main.component';
import { HistoryComponent } from './core/history/history.component';
import { PanelsComponent } from './core/history/panels/panels.component';
import { HistoryAllComponent } from './core/history/all/history-all.component';
import { HistoryUndoComponent } from './core/history/history-undo/history-undo.component';
import { UploadComponent } from './core/upload/upload.component';
import { DebtsComponent } from './core/debts/debts.component';
import { SettingsComponent } from './core/settings/settings.component';
import { NewRoomComponent } from './core/new-room/new-room.component';
import { CoreGuardService } from './core-guard.service';
import { NewRoomGuardService } from './new-room-guard.service';
import { AddNewUserComponent } from './core/settings/add-new-user/add-new-user.component';
import { DeleteMemberComponent } from './core/settings/delete-member/delete-member.component';
import { QuizletComponent } from './quizlet/quizlet.component';
import { CreateSetComponent } from './quizlet/create/create-set.component';
import { EditComponent } from './quizlet/edit/edit.component';
import { QuizletMainComponent } from './quizlet/quizlet-main/quizlet-main.component';
import { QuizletLoginComponent } from './quizlet/quizlet-login/quizlet-login.component';
import { QuizletSetsComponent } from './quizlet/quizlet-sets/quizlet-sets.component';
import { QuizletGuardService } from './quizlet/quizlet.guard.service';

const routes: Routes = [
  { path: 'quizlet', component: QuizletMainComponent, pathMatch: 'prefix', children: [
    { path: '', pathMatch: 'full', component: QuizletLoginComponent },
    { path: 'sets', component: QuizletSetsComponent, canActivate: [QuizletGuardService] },
    { path: 'create', component: CreateSetComponent, canActivate: [QuizletGuardService] },
    { path: ':setId', component: QuizletComponent, canActivate: [QuizletGuardService] },
    { path: ':setId/edit', component: EditComponent, canActivate: [QuizletGuardService] },
  ]},
  { path: '', pathMatch: 'prefix', component: HomeComponent, children: [
    { path: '', pathMatch: 'full', component: IndexComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateComponent },
  ]},
  { path: 'room/:roomKey/members', component: NewRoomComponent, canActivate: [NewRoomGuardService] },
  { path: 'room/:roomKey', pathMatch: 'prefix', component: CoreComponent, canActivate: [CoreGuardService], children: [
    { path: '', pathMatch: 'full', component: MainComponent},
    { path: 'history', pathMatch: 'prefix', component: HistoryComponent, children: [
      { path: '', pathMatch: 'full', component: PanelsComponent },
      { path: 'all', component: HistoryAllComponent },
      { path: 'undo', component: HistoryUndoComponent }
    ]},
    { path: 'upload', component: UploadComponent },
    { path: 'debts', component: DebtsComponent },
    { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    { path: 'settings/new-member', component: AddNewUserComponent },
    { path: 'settings/delete-member', component: DeleteMemberComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
