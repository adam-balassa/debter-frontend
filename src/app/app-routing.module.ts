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

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: HomeComponent, children: [
    { path: '', pathMatch: 'full', component: IndexComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateComponent },
  ]},
  { path: ':projectId', pathMatch: 'prefix', component: CoreComponent, children: [
    { path: '', pathMatch: 'full', component: MainComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
