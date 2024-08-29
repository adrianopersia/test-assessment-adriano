import { redirect } from "next/dist/server/api-utils";
import FilterPage from "./HomePage/page";

export default function Home() {
  return <FilterPage />;
}
