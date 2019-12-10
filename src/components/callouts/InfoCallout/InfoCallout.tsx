import React from "react";
import { Callout } from "@blueprintjs/core";
import "./InfoCallout.css";

export const InfoCallout = () => {
    return (
        <Callout className={"InfoCallout"} icon={"info-sign"}>
            <p>
                Vocabin converts raw text to flashcards with English
                translations, organised by difficulty and ready to import into
                flashcard applications like Anki.
            </p>
            <p>
                To get started, simply paste some text into the box above,
                select the language of the text and hit "Get Vocab"!
            </p>
        </Callout>
    );
};
