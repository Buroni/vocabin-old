import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VocabService} from './services/vocab.service';
import { VocabChipComponent } from './vocab-chip/vocab-chip.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog';
import {CsvService} from './services/csv.service';

@NgModule({
  declarations: [
    AppComponent,
    VocabChipComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [VocabService, CsvService],
  bootstrap: [AppComponent],
  entryComponents: [EditDialogComponent]
})
export class AppModule { }
