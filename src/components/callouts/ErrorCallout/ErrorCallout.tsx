import React from "react";
import { Callout, H5 } from "@blueprintjs/core";
import "./ErrorCallout.css";

type Props = { err: string };

export const ErrorCallout = (p: Props) => {
    return (
        <Callout
            className={"ErrorCallout"}
            icon={"info-sign"}
            intent={"danger"}
        >
            <H5>An error occurred</H5>
            <p>{p.err}</p>
        </Callout>
    );
};
