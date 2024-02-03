"use client";
import { CardContent } from "@/components/ui/card";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { settransactionId } from "@/app/(eshop)/payment/transactionid";
import { paypalCheckPayment } from "@/app/(eshop)/payment/paypalCheckPayment";

interface Props {
  orderId: string;
  amount: number;
}

const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  //   const rountedAmount = amount.toFixed(2);
  const rountedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <CardContent className="animate-pulse ">
        <div className="h-[30px] bg-gray-200 rounded-2xl" />
        <div className="h-[30px] bg-gray-200 rounded-2xl mt-2" />
      </CardContent>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: rountedAmount.toString(),
          },
        },
      ],
    });

    const { ok } = await settransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("Something went wrong");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) {
      return;
    }

    await paypalCheckPayment(details.id);
  };

  return (
    <CardContent>
      <PayPalButtons
        style={{ layout: "vertical", height: 30 }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </CardContent>
  );
};

export default PaypalButton;
