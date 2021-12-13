import Source from './sourceInterface';

enum Status {
    ok,
    error,
}

export default interface ResponseObjectSources {
    status: Status;
    sources: Array<Source>;
}
