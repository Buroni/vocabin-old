import React, {ChangeEvent, useRef, useState} from 'react';
import './App.css';
import {Callout, TextArea} from "@blueprintjs/core";
import {ButtonTray} from "./components/ButtonTray/ButtonTray";
import {ToggleGroup, ToggleItem, TranslationRequest} from "./appTypes";
import {INITIAL_TRANSLATION_REQUEST} from "./constants";
import {postText} from "./api/apiFunctions";
import {VocabOutput} from "./components/VocabOutput/VocabOutput";
import {TranslationResponseItem, WordGroups} from "./components/VocabOutput/types";
import {EditWordDialog} from "./components/EditWordDialog/EditWordDialog";
import {InfoCallout} from "./components/InfoCallout/InfoCallout";

const App: React.FC = () => {
    const [translationRequest, setTranslationRequest] = useState<TranslationRequest>(INITIAL_TRANSLATION_REQUEST);
    const [translationResponse, setTranslationResponse] = useState<TranslationResponseItem[] | null>(null);
    const [editWordDialog, setEditWordDialog] = useState<TranslationResponseItem | null>(null);
    const pageEnd = useRef<HTMLDivElement>(null);

    const patchTranslationRequest = (partialRequest: Partial<TranslationRequest>) => {
        setTranslationRequest({...translationRequest, ...partialRequest});
    };

    const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        patchTranslationRequest({text})
    };

    const submit = async () => {
        const res = await postText(translationRequest);
        setTranslationResponse(res);
        const current = pageEnd.current;
        current && window.scrollTo(0, current.offsetTop);
    };

    const toggleGroup: ToggleGroup = (occurrence, checked) => {
        if (!translationResponse) return;
        const newTranslationResponse = [...translationResponse];
        newTranslationResponse.forEach(word => {
            if (word.occurrence === occurrence) {
                word.checked = checked;
            }
        });
        setTranslationResponse(newTranslationResponse);
    };

    const toggleItem: ToggleItem = (word, group) => {
        if (!translationResponse) return;
        const newTranslationResponse = [...translationResponse];
        const wordItem = newTranslationResponse.find(item => item.word === word);
        if (wordItem) {
            wordItem.checked = !wordItem.checked;
            setTranslationResponse(newTranslationResponse);
        }
    };

    const saveWord = (newWordItem: TranslationResponseItem) => {
        if (!translationResponse) return;
        const newTranslationResponse = translationResponse.map(wordItem => {
           return wordItem.id === newWordItem.id ? newWordItem : wordItem;
        });
        setTranslationResponse(newTranslationResponse);
        setEditWordDialog(null);
    };

    const textLength = translationRequest.text ? translationRequest.text.length : 0;

    return (
        <div className="App">
            <EditWordDialog
                wordItem={editWordDialog}
                close={() => setEditWordDialog(null)}
                save={saveWord}
            />
            <div className={"App__input-container"}>
                <img src="/vocabin_logo.png" width="228" height="101"/>
                <TextArea
                    onChange={changeText}
                    growVertically={false}
                    large
                    className={"App__input-text"}
                />
                <ButtonTray
                    changeLanguage={language => patchTranslationRequest({language})}
                    changeCardType={cardType => patchTranslationRequest({cardType})}
                    submit={submit}
                    textLength={textLength}
                />
                {!translationResponse &&
                    <InfoCallout/>
                }
            </div>
            <div className={"App__vocab-output-container"}>
                {translationResponse &&
                    <VocabOutput
                        wordItems={translationResponse}
                        toggleGroup={toggleGroup}
                        toggleItem={toggleItem}
                        editWordItem={wordItem => setEditWordDialog(wordItem)}
                    />
                }
            </div>
            <div className={"App__page-end"} ref={pageEnd}/>
        </div>
  );
};

export default App;