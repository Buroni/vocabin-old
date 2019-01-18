import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {environment} from '../../environments/environment';

export interface VocabItem {
  word: string;
  occurrence: string;
  translation: string;
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

  updateVocab(language: string, text: string) {
    this.loading = true;
    this.getVocab(language, text).then(vocab => {
      this.vocabGroup = this.vocabItemsToGroup(vocab);
      this.loading = false;
      this.loadStream$.next(true);
    });
  }

  private getVocab(language: string, text: string): Promise<any> {
    const body = {language, text};
    return this.http.post<VocabItem[]>(`${environment.serverUrl}/api/pos`, body).toPromise();
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
