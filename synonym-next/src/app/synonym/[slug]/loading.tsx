import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="col-span-1 md:col-span-3 gap-4 shadow-lg rounded-lg p-8 bg-white">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <LoadingComponent className="rounded w-2/5 h-6" />
          </h2>
          <p className="text-gray-600">
            <LoadingComponent className="rounded w-1/1 h-6" />
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <LoadingComponent className="rounded w-14 h-6" />
            <LoadingComponent className="rounded w-14 h-6" />
            <LoadingComponent className="rounded w-14 h-6" />
            <LoadingComponent className="rounded w-14 h-6" />
            <LoadingComponent className="rounded w-14 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
