import {Component, Input, OnInit} from '@angular/core';
import {VocabService} from '../services/vocab.service';
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog';

@Component({
  selector: 'app-vocab-chip',
  templateUrl: './vocab-chip.component.html',
  styleUrls: ['./vocab-chip.component.css']
})
export class VocabChipComponent implements OnInit {

  @Input() word: string;
  @Input() translation: string;
  @Input() checked = true;
  @Input() occurrence;
  @Input() sentence;
  @Input() cardType;

  constructor(private readonly vocabService: VocabService,
              public readonly matDialog: MatDialog) { }

  ngOnInit() {
  }

  showEditDialog(): void {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      data: {
        word: this.word,
        translation: this.translation,
        occurrence: this.occurrence,
        sentence: this.sentence,
        cardType: this.cardType
      },
      width: '400px',
      height: (this.cardType === 'basic') ? '280px' : '150px'
    });
  }

  toggleChecked(ev) {
    const checked = ev.checked;
    this.vocabService.vocabGroup[this.occurrence] = this.vocabService.vocabGroup[this.occurrence].map(vocabItem => {
      if (vocabItem.word === this.word) {
        return {...vocabItem, checked};
      } else {
        return vocabItem;
      }
    });
  }
}
