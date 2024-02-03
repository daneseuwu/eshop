import React from "react";
import { CardHeader } from "../ui/card";
import { Label } from "../ui/label";

const SummaryOrders = async () => {
  const address = order!.OrderAddress;
  return (
    <main>
      <div className="border rounded-2xl h-[550px]">
        <CardHeader className="text-xl font-medium">
          <Label>Delivery address</Label>
        </CardHeader>
      </div>
    </main>
  );
};

export default SummaryOrders;
