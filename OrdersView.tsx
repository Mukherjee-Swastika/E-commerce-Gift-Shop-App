import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2026-01-15",
    status: "delivered",
    items: [
      {
        name: "Personalized Gift Box",
        quantity: 1,
        price: 45.99,
        image: "https://images.unsplash.com/photo-1625552185153-7a8d8f3794a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwcHJlc2VudHxlbnwxfHx8fDE3Njg0NzIwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
    total: 45.99,
  },
  {
    id: "ORD-002",
    date: "2026-01-14",
    status: "shipped",
    items: [
      {
        name: "Handmade Jewelry Set",
        quantity: 1,
        price: 89.99,
        image: "https://images.unsplash.com/photo-1729751291840-3da5d4b56e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwZ2lmdHxlbnwxfHx8fDE3Njg1NTQwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
    total: 89.99,
  },
  {
    id: "ORD-003",
    date: "2026-01-12",
    status: "processing",
    items: [
      {
        name: "Custom Gift Basket",
        quantity: 2,
        price: 65.0,
        image: "https://images.unsplash.com/photo-1508899203029-1c9eb493c9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYmFza2V0fGVufDF8fHx8MTc2ODU1NDAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
    total: 130.0,
  },
];

export function OrdersView() {
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Package className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8">My Orders</h1>

      <div className="space-y-6">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-purple-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl text-gray-600 mb-2">No orders yet</h2>
          <p className="text-gray-500">Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
}
