import prisma from "@/lib/prisma";
import { Payments, SubcriptorsChart, TotalRevenue } from "./components";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AnalitycsPage() {
  const user = await currentUser();
  if (!user) {
    return <p className="px-7">Not signed in</p>;
  }
  const userData = await prisma.user.findUnique({
    where: { userId: user.id },
    select: { role_id: true },
  });

  if (userData?.role_id === 2) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SubcriptorsChart></SubcriptorsChart>
        <TotalRevenue></TotalRevenue>
      </div>
      {/* Error con este componente revizar despues */}
      {/* <Payments></Payments> */}
    </div>
  );
}
