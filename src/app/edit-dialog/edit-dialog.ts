/**
 * Browse public maps dialog
 */

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {VocabService} from "../services/vocab.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.scss']
})

export class EditDialogComponent {

  word: string;
  originalWord: string;
  translation: string;
  occurrence: string;
  sentence: string;

  constructor(private vocabService: VocabService,
              public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.word = data.word;
    this.originalWord = data.word;
    this.translation = data.translation;
    this.sentence = data.sentence;
    this.occurrence = data.occurrence;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.vocabService.vocabGroup[this.occurrence] = this.vocabService.vocabGroup[this.occurrence]
      .map(vocabItem => {
        if (vocabItem.word === this.originalWord) {
          return {...vocabItem, word: this.word, translation: this.translation, sentence: this.sentence};
        } else {
          return vocabItem;
        }
      });
    this.close();
  }
}
