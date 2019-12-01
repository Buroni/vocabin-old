import React from 'react';
import {Occurrence, TranslationResponseItem} from "./types";
import {WordGroupCard} from "../WordGroupCard/WordGroupCard";
import {ToggleGroup, ToggleItem} from "../../appTypes";
import "./VocabOutput.css";
import {organiseVocab} from "../../utils";

type Props = {
    wordItems: TranslationResponseItem[];
    toggleGroup: ToggleGroup;
    toggleItem: ToggleItem;
    editWordItem: (word: TranslationResponseItem) => void;
};

export const VocabOutput = (p: Props) => {
    const wordGroups = organiseVocab(p.wordItems);

    return (
        <div className={"vocab-output"}>
            <WordGroupCard
                words={wordGroups.veryCommon}
                title={"Very Common"}
                selectAll={() => p.toggleGroup(Occurrence.VERY_COMMON, true)}
                deselectAll={() => p.toggleGroup(Occurrence.VERY_COMMON, false)}
                toggleItem={word => p.toggleItem(word, Occurrence.VERY_COMMON)}
                editWordItem={p.editWordItem}
            />
            <WordGroupCard
                words={wordGroups.common}
                title={"Common"}
                selectAll={() => p.toggleGroup(Occurrence.COMMON, true)}
                deselectAll={() => p.toggleGroup(Occurrence.COMMON, false)}
                toggleItem={word => p.toggleItem(word, Occurrence.COMMON)}
                editWordItem={p.editWordItem}
            />
            <WordGroupCard
                words={wordGroups.uncommon}
                title={"Uncommon"}
                selectAll={() => p.toggleGroup(Occurrence.UNCOMMON, true)}
                deselectAll={() => p.toggleGroup(Occurrence.UNCOMMON, false)}
                toggleItem={word => p.toggleItem(word, Occurrence.UNCOMMON)}
                editWordItem={p.editWordItem}
            />
            <WordGroupCard
                words={wordGroups.veryUncommon}
                title={"Very Uncommon"}
                selectAll={() => p.toggleGroup(Occurrence.VERY_UNCOMMON, true)}
                deselectAll={() => p.toggleGroup(Occurrence.VERY_UNCOMMON, false)}
                toggleItem={word => p.toggleItem(word, Occurrence.VERY_UNCOMMON)}
                editWordItem={p.editWordItem}
            />
        </div>
    );
};
