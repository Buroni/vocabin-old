import { Injectable } from '@angular/core';
import saveAs from 'file-saver';
import {VocabGroup, VocabItem} from './vocab.service';
import * as json2csv from 'json2csv';

@Injectable()
export class CsvService {

  parser = new json2csv.Parser({header: false});

  constructor() {
  }

  downloadCsv(vocab: VocabGroup) {
    const csv = this.parseCsv(vocab);
    const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'vocab.csv');
  }

  private parseCsv(vocab: VocabGroup) {
    const items = this.vocabGroupToArray(vocab);
    const csv = this.parser.parse(items);
    return csv;
  }

  private vocabGroupToArray(vocab: VocabGroup) {
    return [
      ...vocab.veryCommon,
      ...vocab.common,
      ...vocab.uncommon,
      ...vocab.veryUncommon
    ].filter(item => item.checked)
      .map(item => ({word: item.word, translation: item.translation}));
  }
}
