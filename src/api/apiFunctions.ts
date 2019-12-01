import {TranslationRequest} from "../appTypes";
import environment from "../environment";
import {Paths} from "./paths";
import {TranslationResponseItem} from "../components/VocabOutput/types";

type PostText = (body: TranslationRequest) => Promise<TranslationResponseItem[]>;

const post = <T>(path: Paths, options: RequestInit | undefined) => {
    return fetch(`${environment.serverUrl}${path}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<T>;
        })
};

export const postText: PostText = async (body) => {
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({"content-type": "application/json"})
    };
    return await post<TranslationResponseItem[]>(Paths.POS, options);
};
