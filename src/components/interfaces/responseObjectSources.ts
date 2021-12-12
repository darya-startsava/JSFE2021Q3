import Source from "./sourceInterface";

export default interface ResponseObjectSources {
    status: string;
    sources: Array<Source>;
}
