import React, {ChangeEvent} from 'react';
import {Button, HTMLSelect} from "@blueprintjs/core";
import {CardType, Language} from "../../appTypes";
import {CHAR_LIMIT} from "../../constants";
import "./ButtonTray.css";

type Props = {
    changeLanguage: (language: Language) => void;
    changeCardType: (cardType: CardType) => void;
    submit: () => Promise<any>;
    textLength: number;
};

export const ButtonTray = (p: Props) => {

    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as Language;
        p.changeLanguage(val);
    };

    const changeCardType = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as CardType;
        p.changeCardType(val);
    };

    const submitDisabled = p.textLength >= CHAR_LIMIT || p.textLength === 0;

    return (
        <div className={"ButtonTray"}>
            <div className={"ButtonTray__char-count"}>{p.textLength} / {CHAR_LIMIT}</div>
            <HTMLSelect onChange={changeLanguage}>
                <option value={Language.FRENCH}>French</option>
                <option value={Language.GERMAN}>German</option>
                <option value={Language.ITALIAN}>Italian</option>
                <option value={Language.RUSSIAN}>Russian</option>
                <option value={Language.SPANISH}>Spanish</option>
            </HTMLSelect>
            <div style={{paddingRight: "0.5em"}}/>
            <HTMLSelect onChange={changeCardType}>
                <option value={CardType.BASIC}>Basic Cards</option>
                <option value={CardType.CLOZE_NO_HINT}>Cloze cards - no hint</option>
                <option value={CardType.CLOZE_HINT}>Cloze cards - hint</option>
            </HTMLSelect>
            <div style={{paddingRight: "0.5em"}}/>
            <Button disabled={submitDisabled} onClick={p.submit}>Get Vocab</Button>
        </div>
    );
};
