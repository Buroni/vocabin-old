import { Injectable } from '@angular/core';
import saveAs from 'file-saver';
import {VocabGroup, VocabItem} from './vocab.service';
import * as json2csv from 'json2csv';

@Injectable()
export class CsvService {

  parser = new json2csv.Parser({header: false});

  constructor() {
  }

  downloadCsv(vocab: VocabGroup, cardType: string): void {
    const csv = this.parseCsv(vocab, cardType);
    const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'vocab.csv');
  }

  private parseCsv(vocab: VocabGroup, cardType: string) {
    const items = this.vocabGroupToArray(vocab, cardType);
    console.log(items);
    const csv = this.parser.parse(items);
    return csv;
  }

  private vocabGroupToArray(vocab: VocabGroup, cardType: string) {
    return [
      ...vocab.veryCommon,
      ...vocab.common,
      ...vocab.uncommon,
      ...vocab.veryUncommon
    ].filter(item => item.checked)
      .map(item => {
        if (cardType === 'basic') {
          return {word: item.word, translation: item.translation, sentence: item.sentence};
        } else {
          return {sentence: item.sentence};
        }
    });
  }
}
