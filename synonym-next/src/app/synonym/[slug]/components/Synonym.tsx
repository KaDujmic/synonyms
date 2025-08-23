import { Popover } from "@/features/Popover/Popover";
import { Synonym as SynonymType } from "@/types/Synonym.type";

export const Synonym = ({ synonym }: { synonym: SynonymType }) => {

  return (
      <Popover 
        popoverTarget={`synonym-${synonym.slug}`}
        popoverContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        className="relative gap-4 inline-block px-3 py-1 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:border-gray-300 hover:cursor-pointer transition-colors"
      >
        {synonym.word}
      </Popover>
  );
};