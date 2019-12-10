import React from "react";
import { Button, Card, Dialog, H4, Icon, Switch } from "@blueprintjs/core";
import "./AdvancedSettings.css";
import { Options } from "../../types";

type Props = {
    isOpen: boolean;
    close: () => void;
    options: Options;
    patchOptions: (patch: Partial<Options>) => void;
};

export const AdvancedSettings = (p: Props) => {
    return (
        <Dialog isOpen={p.isOpen} onClose={p.close} canOutsideClickClose>
            <div className="bp3-dialog-header">
                <Icon icon={"settings"} />
                <H4 className="bp3-heading">Advanced Settings</H4>
                <Button
                    aria-label="Close"
                    className="bp3-dialog-close-button"
                    icon={"cross"}
                    onClick={p.close}
                />
            </div>
            <div className="bp3-dialog-body">
                <Card className={"AdvancedSettings__card"}>
                    <div className={"AdvancedSettings__field"}>
                        <div className={"AdvancedSettings__name"}>
                            Convert word to root where possible
                        </div>
                        <Switch
                            checked={p.options.convertToRoot}
                            onClick={() =>
                                p.patchOptions({
                                    convertToRoot: !p.options.convertToRoot
                                })
                            }
                            disabled={p.options.contextual}
                        />
                    </div>
                    <p className={"AdvancedSettings__description"}>
                        Convert each word to its root form where available. In
                        the case of verbs, they will be converted to their
                        infinitive forms. With nouns, for example plurals will
                        be converted to their singular forms.
                        <br />
                        <br />
                        This setting only applies to basic cards when enabled.
                    </p>
                </Card>
                <Card className={"AdvancedSettings__card"}>
                    <div className={"AdvancedSettings__field"}>
                        <div className={"AdvancedSettings__name"}>
                            Use contextual translation (experimental)
                        </div>
                        <Switch
                            checked={p.options.contextual}
                            onClick={() =>
                                p.patchOptions({
                                    contextual: !p.options.contextual
                                })
                            }
                            disabled={p.options.convertToRoot}
                        />
                    </div>
                    <p className={"AdvancedSettings__description"}>
                        Attempt to use the context surrounding each word to
                        provide a more accurate translation. Note that this is a
                        non-trivial problem, and the current solution is
                        unfinished. This setting works best with simple
                        sentences.
                    </p>
                </Card>
            </div>
        </Dialog>
    );
};
