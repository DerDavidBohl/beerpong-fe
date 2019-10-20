import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TeamsAllComponent } from './teams-all/teams-all.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { SettingsHttpService } from './settings-http.service';
import { GamesEditComponent } from './games-edit/games-edit.component';
import { GamesAllComponent } from './games-all/games-all.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { GamesTeamEditComponent } from './games-team-edit/games-team-edit.component';
import { KommaSeperatedPipe } from './komma-seperated.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ItemListPipe } from './item-list.pipe';
import { AutoCompletionInputComponent } from './auto-completion-input/auto-completion-input.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatChipsModule} from '@angular/material/chips';
import { ResultsAllComponent } from './results-all/results-all.component';
import {MatTableModule} from '@angular/material/table';

registerLocaleData(localeDe, 'de');

export function app_Init(settingsHttpService: SettingsHttpService) {
  return () => settingsHttpService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    YesNoDialogComponent,
    AthletesAllComponent,
    AthleteEditComponent,
    SeasonsAllComponent,
    SeasonsEditComponent,
    ItemListComponent,
    TeamsAllComponent,
    TeamsEditComponent,
    GamesEditComponent,
    GamesAllComponent,
    GamesTeamEditComponent,
    KommaSeperatedPipe,
    ItemListPipe,
    AutoCompletionInputComponent,
    ResultsAllComponent
  ],
  imports: [
    MatTableModule,
    MatChipsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
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
    MatMomentDateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    YesNoDialogComponent
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  {provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingsHttpService], multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
