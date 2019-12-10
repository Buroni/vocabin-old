import React from "react";
import { Icon } from "@blueprintjs/core";
import "./AdvancedSettingsText.css";

type Props = {
    onClick: () => void;
};

export const AdvancedSettingsText = (p: Props) => {
    return (
        <div className={"AdvancedSettingsText"} onClick={p.onClick}>
            <Icon
                icon={"settings"}
                iconSize={14}
                className={"AdvancedSettingsText__icon"}
            />{" "}
            Advanced Settings
        </div>
    );
};
