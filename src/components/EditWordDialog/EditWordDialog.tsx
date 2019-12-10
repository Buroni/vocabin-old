import React, { useEffect, useState } from "react";
import { Button, Dialog, H4, Icon } from "@blueprintjs/core";
import { TranslationResponseItem } from "../VocabOutput/types";
import "./EditWordDialog.css";
import { EditWordField } from "./EditWordField/EditWordField";

type Props = {
    wordItem: TranslationResponseItem | null;
    close: () => void;
    save: (wordItem: TranslationResponseItem) => void;
};

export const EditWordDialog = (p: Props) => {
    const [
        editingWordItem,
        setEditingWordItem
    ] = useState<TranslationResponseItem | null>(p.wordItem);
    const isOpen = p.wordItem !== null;

    useEffect(() => {
        setEditingWordItem(p.wordItem);
    }, [p.wordItem]);

    const patchWordItem = (patch: Partial<TranslationResponseItem>) => {
        if (!editingWordItem) return;
        setEditingWordItem({ ...editingWordItem, ...patch });
    };

    return (
        <Dialog isOpen={isOpen} onClose={p.close} canOutsideClickClose>
            <div className="bp3-dialog-header">
                <Icon icon={"edit"} />
                <H4 className="bp3-heading">Edit Vocab Item</H4>
                <Button
                    aria-label="Close"
                    className="bp3-dialog-close-button"
                    icon={"cross"}
                    onClick={p.close}
                />
            </div>
            {p.wordItem && (
                <div className="bp3-dialog-body">
                    <EditWordField
                        name={"Word"}
                        value={p.wordItem.word}
                        onChange={(e: any) =>
                            patchWordItem({ word: e.target.value })
                        }
                    />
                    <EditWordField
                        name={"Translation"}
                        value={p.wordItem.translation}
                        onChange={(e: any) =>
                            patchWordItem({ translation: e.target.value })
                        }
                    />
                    <EditWordField
                        name={"Sentence"}
                        value={p.wordItem.sentence}
                        onChange={(e: any) =>
                            patchWordItem({ sentence: e.target.value })
                        }
                    />
                </div>
            )}
            {editingWordItem && (
                <div className="bp3-dialog-footer">
                    <div className="bp3-dialog-footer-actions">
                        <Button
                            icon={"floppy-disk"}
                            onClick={() => p.save(editingWordItem)}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
        </Dialog>
    );
};
