'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
      );
      const data = await response.json();
      setVehicleTypes(data.Results.map((type: any) => type.MakeName));
    };

    fetchVehicleTypes();
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Car Dealer Filter</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <label
          htmlFor="vehicleType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={selectedType}
          onChange={handleTypeChange}
          className="block w-full p-2 border text-black border-gray-300 rounded-md mb-4"
        >
          <option value="">Select a type</option>
          {vehicleTypes.map((type) => (
            <option className="text-black" key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label
          htmlFor="modelYear"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Model Year
        </label>
        <select
          id="modelYear"
          value={selectedYear}
          onChange={handleYearChange}
          className="block w-full p-2 border text-black border-gray-300 rounded-md mb-4"
        >
          <option className="text-black" value="">
            Select a year
          </option>
          {Array.from(
            { length: new Date().getFullYear() - 2014 },
            (_, index) => 2015 + index,
          ).map((year) => (
            <option className="text-black" key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Link href={`/ResultsPage/${selectedType}/${selectedYear}`}>
          <button
            className={`w-full p-2 mt-4 bg-blue-500 text-white rounded-md ${
              !selectedType || !selectedYear
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={!selectedType || !selectedYear}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
