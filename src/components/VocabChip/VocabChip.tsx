import React from "react";
import { Checkbox, Icon, Tag } from "@blueprintjs/core";
import { TranslationResponseItem } from "../VocabOutput/types";
import "./VocabChip.css";

type Props = TranslationResponseItem & { toggle: () => void; edit: () => void };

export const VocabChip = (p: Props) => {
    return (
        <Tag className={"VocabChip"}>
            <div className={"VocabChip__content"}>
                <div style={{ marginRight: "0.6em" }}>
                    <b>{p.word}</b>: {p.translation}
                </div>
                <Icon
                    icon={"edit"}
                    iconSize={12}
                    style={{ marginRight: "0.5em", cursor: "pointer" }}
                    onClick={p.edit}
                />
                <Checkbox
                    checked={p.checked}
                    style={{ marginTop: "1em" }}
                    onClick={p.toggle}
                />
            </div>
        </Tag>
    );
};
