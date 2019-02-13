import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {environment} from '../../environments/environment';
import {map} from "rxjs/internal/operators";

export interface VocabItem {
  word?: string;
  translation?: string;
  sentence?: string;
  occurrence: string;
  checked: boolean;
}

export interface VocabGroup {
  veryCommon: VocabItem[];
  common: VocabItem[];
  uncommon: VocabItem[];
  veryUncommon: VocabItem[];
}

@Injectable()
export class VocabService {

  vocabGroup: VocabGroup;
  loading = false;
  loadStream$: Subject<boolean> = new Subject();

  constructor(private readonly http: HttpClient) {
  }

  updateVocab(language: string, text: string): void {
    this.loading = true;
    this.getVocab(language, text).then(vocab => {
      this.vocabGroup = this.vocabItemsToGroup(vocab);
      this.loading = false;
      this.loadStream$.next(true);
    });
  }

  updateVocabSentences(language: string, sentences: string[], cardType: string): void {
    this.loading = true;
    let vocab;
    const promises = sentences.map(sentence => this.getVocab(language, sentence, cardType));

    Promise.all(promises).then((vocabArr: any[]) => {
      vocab = vocabArr.flat();
      this.vocabGroup = this.vocabItemsToGroup(vocab);
      this.loading = false;
      this.loadStream$.next(true);
    });
  }

  private getVocab(language: string, text: string, cardType: string): Promise<any> {
    const body = {language, text, cardType};
    return this.http.post<VocabItem[]>(`${environment.serverUrl}/api/pos`, body)
      .pipe(
        map(vocab => {
          if (!Array.isArray(vocab)) {
            return [];
          }
          if (cardType === 'basic') {
            return vocab.map(item => ({...item, sentence: text}));
          } else if (cardType === 'cloze-hint') {
            return vocab.map(item => ({
                ...item,
                sentence: text.replace(item.word, `{{c1::${item.word}::${item.translation}}}`)})
            );
          } else if (cardType === 'cloze-nohint') {
            return vocab.map(item => ({
              ...item,
              sentence: text.replace(item.word, `{{c1::${item.word}}}`)})
            );
          }
        })
      ).toPromise();
  }

  private vocabItemsToGroup(vocab: VocabItem[]): VocabGroup {
    const vocabGroup = {veryCommon: [], common: [], uncommon: [], veryUncommon: []};

    vocab.forEach(item => {
      switch (item.occurrence) {
        case 'Very common':
          vocabGroup.veryCommon.push(item);
          break;
        case 'Common':
          vocabGroup.common.push(item);
          break;
        case 'Uncommon':
          vocabGroup.uncommon.push(item);
          break;
        case 'Very uncommon':
          vocabGroup.veryUncommon.push(item);
          break;
      }
    });

    return vocabGroup;
  }
}
