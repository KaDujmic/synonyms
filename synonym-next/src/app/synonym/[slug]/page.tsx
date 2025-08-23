import { notFound } from "next/navigation";
import { SynonymList } from "./components/SynonymList";
import Loading from "./loading";

export default async function SynonymPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const synonym = await fetch(`http://localhost:3001/synonym/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = await synonym.json();

  if (!data) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="col-span-1 md:col-span-3 gap-4 shadow-lg rounded-lg p-8 bg-white">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {data?.word}
          </h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <SynonymList synonyms={data?.synonyms} />
          </div>
        </div>
      </div>
    </div>
  );
}