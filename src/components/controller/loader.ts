import ResponseObjectArticles from '../interfaces/responseObjectArticles';
import ResponseObjectSources from '../interfaces/responseObjectSources';
import { CallbackType } from '../types/CallbackType';
import { Status } from '../enums/status';

class Loader {
    public baseLink: string;
    public options?: { [apiKey: string]: string };

    constructor(baseLink: string, options?: { [apiKey: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint = '', options = {} },
        callback: CallbackType<ResponseObjectSources | ResponseObjectArticles> = () => {
            // eslint-disable-next-line no-console
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Status.unauthorized || res.status === Status.fileNotFound) {
                // eslint-disable-next-line no-console
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string) {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Function, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            // eslint-disable-next-line no-console
            .catch((err) => console.error(err));
    }
}

export default Loader;
