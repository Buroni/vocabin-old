import { Component } from '@angular/core';
import {VocabService, VocabItem, VocabGroup} from './services/vocab.service';
import {CsvService} from "./services/csv.service";
import {Subject} from "rxjs/index";
import {auditTime, debounceTime} from "rxjs/internal/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: string;
  language: string;
  disabledPeriod = false;
  len = 0;

  private getVocabDebounce$: Subject<boolean> = new Subject();

  constructor(public readonly vocabService: VocabService,
              private readonly csvService: CsvService) {
    this.vocabService.loadStream$.subscribe(() => {
      setTimeout(() => {
        document.getElementById('cards').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 300);
    });

    // Debounce the "get vocab" button click by 300ms.
    this.getVocabDebounce$.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.vocabService.updateVocab(this.language, this.text);
    });
  }

  getVocab() {
    this.disabledPeriod = true;
    setTimeout(() => { this.disabledPeriod = false; }, 10000);
    this.getVocabDebounce$.next(true);
  }

  /**
   * Toggle a selected vocabulary chip and reflect the change in the vocabService object.
   */
  toggleSelect(occurrence: string, checked: boolean) {
    this.vocabService.vocabGroup[occurrence] = this.vocabService.vocabGroup[occurrence]
      .map(item => ({...item, checked}));
  }

  downloadCsv() {
    this.csvService.downloadCsv(this.vocabService.vocabGroup);
  }

  type() {
    this.len = this.text.length;
  }
}
