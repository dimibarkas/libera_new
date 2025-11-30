import { OrderForm } from "../components/order-form";

export default function NewOrderPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <OrderForm mode="create" />
    </div>
  );
}
