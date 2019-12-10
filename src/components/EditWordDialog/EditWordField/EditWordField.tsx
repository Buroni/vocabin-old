import React, { ChangeEvent, FormEvent } from "react";
import "./EditWordField.css";
import { InputGroup } from "@blueprintjs/core";

type Props = {
    name: string;
    value: string;
    onChange: ((event: FormEvent<HTMLElement>) => void) &
        ((event: ChangeEvent<HTMLInputElement>) => void);
};

export const EditWordField = (p: Props) => {
    return (
        <div className={"EditWordField"}>
            <div className={"EditWordField__name"}>{p.name}</div>
            <InputGroup defaultValue={p.value} onChange={p.onChange} fill />
        </div>
    );
};
