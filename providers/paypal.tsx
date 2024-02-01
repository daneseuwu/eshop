"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalProvider = () => {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
};

export default PaypalProvider;
