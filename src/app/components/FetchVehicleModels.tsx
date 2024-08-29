'use client';

import Link from 'next/link';

const FetchVehicleModels = ({
  models,
}: {
  models: { Model_Name: string }[];
}) => {
  if (!models || !models.length) {
    return (
      <p className="text-red-500 text-center">
        No models found for the selected type and year.
        <Link href={'/HomePage'}>
          <button className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md">
            Go Back
          </button>
        </Link>
      </p>
    );
  }

  return (
    <ul className="list-disc pl-5 space-y-2">
      {models.map((model) => (
        <li key={model.Model_Name} className="text-lg">
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
};

export default FetchVehicleModels;
