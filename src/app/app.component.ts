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
  text  = '';
  language: string;
  disabledPeriod = false;
  len = 0;
  demoRunning = false;
  cardType = 'basic';

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
      const sentences = this.text.split('.');
      this.vocabService.updateVocabSentences(this.language, sentences, this.cardType);
    });
  }

  getVocab() {
    this.disabledPeriod = true;
    setTimeout(() => { this.disabledPeriod = false; }, 10000);
    this.getVocabDebounce$.next(true);
  }

  runDemo() {
    if (this.demoRunning) {
      return;
    }

    this.demoRunning = true;
    this.text = '';

    this.runDemoText().then(() => {
      this.language = 'german';
      this.getVocab();
      this.demoRunning = false;
    });
  }

  runDemoText(): Promise<any> {
    const txt = 'Ursprünglich waren Pangramme lediglich eine mathematische Spielerei. Mit dem Aufkommen kodierter Textübertragung im zwanzigsten Jahrhundert wurden sie zu einem gebräuchlichen Instrument zum Testen der benutzten Geräte.';
    const speed = 20;

    return new Promise((resolve, reject) => {

      const typeEffect = (i = 0) => {
        this.text += txt.charAt(i);
        this.type();

        setTimeout(() => {
          if (i < txt.length) {
            typeEffect(i + 1);
          } else {
            return resolve(true);
          }
        }, speed);

      };

      typeEffect();
    });
  }

  /**
   * Toggle a selected vocabulary chip and reflect the change in the vocabService object.
   */
  toggleSelect(occurrence: string, checked: boolean) {
    this.vocabService.vocabGroup[occurrence] = this.vocabService.vocabGroup[occurrence]
      .map(item => ({...item, checked}));
  }

  downloadCsv() {
    this.csvService.downloadCsv(this.vocabService.vocabGroup, this.cardType);
  }

  type() {
    this.len = this.text.length;
  }
}
