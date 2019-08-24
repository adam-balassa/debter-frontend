import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { ButtonComponent } from './button/button.component';
import { ButtonOutlineComponent } from './button-outline/button-outline.component';
import { FormAlertComponent } from "./form-alert/form-alert.component";
import { PopupBoxComponent } from './popup-box/popup-box.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { AppearAnimation } from './animations/appear.animation';
import { DisappearAnimation } from './animations/disappear.animation';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table/table-row/table-row.component';
import { TableCellComponent } from './table/table-cell/table-cell.component';
import { PanelComponent } from './panel/panel.component';
import { ValuePipe } from './pipes/value.pipe';
import { MyDatePipe } from './pipes/my-date.pipe';
import { SelectComponent } from './select/select.component';
import { HeaderPhoneComponent } from './header-phone/header-phone.component';
import { LoadingComponent } from './loading/loading.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonOutlineComponent,
    FormAlertComponent,
    PopupBoxComponent,
    ClickOutsideDirective,
    AppearAnimation,
    DisappearAnimation,
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    PanelComponent,
    ValuePipe,
    MyDatePipe,
    SelectComponent,
    HeaderPhoneComponent,
    LoadingComponent,
    MessageBoxComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    ButtonOutlineComponent,
    FormAlertComponent,
    PopupBoxComponent,
    ClickOutsideDirective,
    AppearAnimation,
    DisappearAnimation,
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    PanelComponent,
    ValuePipe,
    MyDatePipe,
    SelectComponent,
    HeaderPhoneComponent,
    LoadingComponent,
    MessageBoxComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
