export default interface Source {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}
