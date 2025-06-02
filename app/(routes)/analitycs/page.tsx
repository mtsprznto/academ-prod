import { Payments, SubcriptorsChart, TotalRevenue } from "./components";

export default function AnalitycsPage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SubcriptorsChart></SubcriptorsChart>
        <TotalRevenue></TotalRevenue>
      </div>
      <Payments></Payments>
    </div>
  );
}
