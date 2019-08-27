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

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: HomeComponent, children: [
    { path: '', pathMatch: 'full', component: IndexComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateComponent },
  ]},
  { path: 'room/:roomId', pathMatch: 'prefix', component: CoreComponent, children: [
    { path: '', pathMatch: 'full', component: MainComponent },
    { path: 'history', pathMatch: 'prefix', component: HistoryComponent, children: [
      { path: '', pathMatch: 'full', component: PanelsComponent },
      { path: 'all', component: HistoryAllComponent },
      { path: 'undo', component: HistoryUndoComponent }
    ]},
    { path: 'upload', component: UploadComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
