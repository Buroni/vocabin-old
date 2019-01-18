import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabChipComponent } from './vocab-chip.component';

describe('VocabChipComponent', () => {
  let component: VocabChipComponent;
  let fixture: ComponentFixture<VocabChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
