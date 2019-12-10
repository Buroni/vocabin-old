import React from "react";
import { Button, Callout } from "@blueprintjs/core";
import "./SaveVocabCallout.css";
import { CSVLink } from "react-csv";
import { TranslationResponseItem } from "../../VocabOutput/types";

type Props = {
    wordItems: TranslationResponseItem[];
};

export const SaveVocabCallout = (p: Props) => {
    const wordItemsArr = p.wordItems
        .filter(w => w.checked)
        .map(w => [w.word, w.translation, w.sentence]);

    const randomId = () => Math.floor(1000 + Math.random() * 9000);

    return (
        <Callout className={"SaveVocabCallout"}>
            <CSVLink data={wordItemsArr} filename={`vocabin-${randomId()}.csv`}>
                <Button minimal intent={"primary"} icon={"download"}>
                    Download as CSV
                </Button>
            </CSVLink>
        </Callout>
    );
};
