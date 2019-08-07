import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from '@angular/common/http'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AthletesAllComponent } from './athletes-all/athletes-all.component';
import { AthleteEditComponent } from './athlete-edit/athlete-edit.component';
import { SeasonsAllComponent } from './seasons-all/seasons-all.component';
import { SeasonsEditComponent } from './seasons-edit/seasons-edit.component';
import { ItemListComponent } from './item-list/item-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { registerLocaleData } from '@angular/common';
import {MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter'
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    YesNoDialogComponent,
    AthletesAllComponent,
    AthleteEditComponent,
    SeasonsAllComponent,
    SeasonsEditComponent,
    ItemListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  entryComponents: [
    YesNoDialogComponent
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
