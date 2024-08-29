// app/ResultsPage/[makeId]/[year]/page.tsx
import FetchVehicleModels from "../../../components/FetchVehicleModels";

export async function generateStaticParams() {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await response.json();

  const paths = data.Results.flatMap((make: any) => {
    const makeId = make.MakeId.toString();
    return ["2015", "2016", "2017"].map((year) => ({
      makeId,
      year,
    }));
  });

  return paths;
}

const ResultsPage = async ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  // Fetch data on the server side
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${params.makeId}/modelyear/${params.year}?format=json`
  );
  const data = await response.json();

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">
        Results for Vehicle {params.makeId}, year {params.year}
      </h1>
      <FetchVehicleModels models={data.Results} />
    </div>
  );
};

export default ResultsPage;
