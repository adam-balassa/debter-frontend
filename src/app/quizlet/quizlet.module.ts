import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizletHeaderComponent } from './quizlet-header/quizlet-header.component';
import { QuizletMainComponent } from './quizlet-main/quizlet-main.component';
import { QuizletLoginComponent } from './quizlet-login/quizlet-login.component';
import { QuizletSetsComponent } from './quizlet-sets/quizlet-sets.component';
import { QuizletComponent } from './quizlet.component';
import { CreateSetComponent } from './create/create-set.component';
import { EditComponent } from './edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    QuizletHeaderComponent,
    QuizletMainComponent,
    QuizletLoginComponent,
    QuizletSetsComponent,
    QuizletComponent,
    CreateSetComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [
    QuizletHeaderComponent,
    QuizletMainComponent,
    QuizletLoginComponent,
    QuizletSetsComponent,
    QuizletComponent,
    CreateSetComponent,
    EditComponent
  ]
})
export class QuizletModule { }
