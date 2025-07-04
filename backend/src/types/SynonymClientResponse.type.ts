type Synonym = {
	word: string;
	link: string;
}

export type SynonymClientResponse = {
	word: string;
    synonyms: Synonym[];
}