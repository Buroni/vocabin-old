import React from "react";
import { Card, H4, Icon, Tooltip } from "@blueprintjs/core";
import { TranslationResponseItem } from "../VocabOutput/types";
import { VocabChip } from "../VocabChip/VocabChip";
import "./WordGroupCard.css";

type Props = {
    words: TranslationResponseItem[];
    title: string;
    selectAll: () => void;
    deselectAll: () => void;
    toggleItem: (word: string) => void;
    editWordItem: (word: TranslationResponseItem) => void;
};

export const WordGroupCard = (p: Props) => {
    return (
        <Card className={"WordGroupCard"}>
            <H4>
                <div className={"WordGroupCard__title"}>
                    <div className={"WordGroupCard__title-item"}>{p.title}</div>
                    <Tooltip
                        content={"Deselect all"}
                        className={"WordGroupCard__title-icon"}
                    >
                        <Icon icon={"remove"} onClick={p.deselectAll} />
                    </Tooltip>{" "}
                    <Tooltip
                        content={"Select all"}
                        className={"WordGroupCard__title-icon"}
                    >
                        <Icon icon={"selection"} onClick={p.selectAll} />
                    </Tooltip>
                </div>
            </H4>
            <div className={"WordGroupCard__words-container"}>
                {p.words.map((wordItem, idx) => (
                    <VocabChip
                        key={idx}
                        toggle={() => p.toggleItem(wordItem.word)}
                        edit={() => p.editWordItem(wordItem)}
                        {...wordItem}
                    />
                ))}
            </div>
        </Card>
    );
};
