'use client';

import { Synonym as SynonymType } from "@/types/Synonym.type";
import { Synonym } from "./Synonym";

export const SynonymList = ({ synonyms }: { synonyms: SynonymType[] }) => {

  return (
    <>
      {synonyms.map((synonym: SynonymType) => (
        <Synonym key={synonym.slug} synonym={synonym} />
      ))}
    </>
  );
};