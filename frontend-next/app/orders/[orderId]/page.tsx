import { notFound } from "next/navigation";

import { OrderForm } from "../components/order-form";

interface OrderPageProps {
  params: {
    orderId?: string;
  };
}

export default function OrderDetailPage({ params }: OrderPageProps) {
  const { orderId } = params;
  if (!orderId) {
    notFound();
  }
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <OrderForm mode="edit" orderId={orderId} />
    </div>
  );
}
