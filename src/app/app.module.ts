import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeUS from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CommonModule, registerLocaleData} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeHeaderItemComponent } from './home/home-header/home-header-item/home-header-item.component';
import { HeaderComponent } from './core/header/header.component';
import { HeaderItemComponent } from './core/header/header-item/header-item.component';
import { IndexComponent } from './home/index/index.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { LoginComponent } from './home/login/login.component';
import { CreateComponent } from './home/create/create.component';
import { CoreComponent } from './core/core.component';
import { MainComponent } from './core/main/main.component';
import { PaginateComponent } from './core/main/paginate/paginate.component';
import { PanelsComponent } from './core/history/panels/panels.component';
import { DetailsComponent } from './core/history/details/details.component';
import { HistoryAllComponent } from './core/history/all/history-all.component';
import { HistoryUndoComponent } from './core/history/history-undo/history-undo.component';
import { HistoryComponent } from './core/history/history.component';
import { UploadComponent } from './core/upload/upload.component';
import { SlideComponent } from './core/upload/slide/slide.component';
import { UploadItemComponent } from './core/upload/upload-item/upload-item.component';
import { IncludedComponent } from './core/upload/steps/included/included.component';
import { NoteComponent } from './core/upload/steps/note/note.component';
import { ValueComponent } from './core/upload/steps/value/value.component';
import { SelectMembersComponent } from './core/upload/steps/select-members/select-members.component';
import { DebtsComponent } from './core/debts/debts.component';
import { DebtComponent } from './core/debts/debt/debt.component';
import { SettingsComponent } from './core/settings/settings.component';
import { NewRoomComponent } from './core/new-room/new-room.component';
import { AddNewUserComponent } from './core/settings/add-new-user/add-new-user.component';
import { DeleteMemberComponent } from './core/settings/delete-member/delete-member.component';
import { QuizletModule } from './quizlet/quizlet.module';
import { EquallyComponent } from './core/upload/steps/included/equally/equally.component';
import { UnequallyComponent } from './core/upload/steps/included/unequally/unequally.component';
registerLocaleData (localeUS, 'en');

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        HomeHeaderComponent,
        HomeHeaderItemComponent,
        IndexComponent,
        AboutComponent,
        ContactComponent,
        LoginComponent,
        CreateComponent,
        CoreComponent,
        HeaderComponent,
        HeaderItemComponent,
        MainComponent,
        PaginateComponent,
        PanelsComponent,
        HistoryAllComponent,
        HistoryUndoComponent,
        HistoryComponent,
        DetailsComponent,
        UploadComponent,
        SlideComponent,
        IncludedComponent,
        SelectMembersComponent,
        NoteComponent,
        ValueComponent,
        UploadItemComponent,
        DebtComponent,
        DebtsComponent,
        SettingsComponent,
        NewRoomComponent,
        AddNewUserComponent,
        DeleteMemberComponent,
        EquallyComponent,
        UnequallyComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        QuizletModule], providers: [{ provide: LOCALE_ID, useValue: 'en' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
