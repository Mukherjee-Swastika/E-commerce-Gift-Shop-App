import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Activity,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  Search,
  Bell,
  Sparkles,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "sonner";
import { Product } from "@/app/components/ProductCard";

interface SellerDashboardProps {
  userProducts: Product[];
  onAddProduct: (product: Omit<Product, "id" | "rating" | "reviews">) => void;
  onLogout: () => void;
  onViewChange: (view: string) => void;
}

const performanceData = [
  { name: "1 June", sales: 4500 },
  { name: "2 June", sales: 3800 },
  { name: "3 June", sales: 4200 },
  { name: "4 June", sales: 5100 },
  { name: "5 June", sales: 7500 },
];

const statusData = [
  { name: "Completed", value: 80, color: "#8b5cf6" },
  { name: "Processing", value: 10, color: "#eab308" },
  { name: "Cancelled", value: 10, color: "#ec4899" },
];

export function SellerDashboard({
  userProducts,
  onAddProduct,
  onLogout,
  onViewChange,
}: SellerDashboardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Handmade",
    description: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    onAddProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1625552185153-7a8d8f3794a3",
      seller: "Artisan Studio",
    });

    setFormData({
      name: "",
      price: "",
      category: "Handmade",
      description: "",
      image: "",
    });

    setIsAddModalOpen(false);
    toast.success("Product added");
  };

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 p-6 space-y-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onViewChange("seller-dashboard")}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">GiftHub</span>
        </div>

        <nav className="space-y-2">
          <SidebarBtn
            icon={LayoutDashboard}
            label="Dashboard"
            onClick={() => onViewChange("seller-dashboard")}
          />
          <SidebarBtn
            icon={FileText}
            label="Inventory"
            onClick={() => onViewChange("seller-inventory")}
          />
          <SidebarBtn
            icon={Calendar}
            label="Orders"
            onClick={() => onViewChange("seller-orders")}
          />
          <SidebarBtn
            icon={Users}
            label="Customers"
            onClick={() => onViewChange("seller-customers")}
          />
          <SidebarBtn
            icon={Activity}
            label="Analytics"
            onClick={() => onViewChange("seller-analytics")}
          />
          <SidebarBtn
            icon={MessageSquare}
            label="Messages"
            onClick={() => onViewChange("seller-messages")}
          />
          <SidebarBtn
            icon={CreditCard}
            label="Payouts"
            onClick={() => onViewChange("seller-payouts")}
          />
          <SidebarBtn
            icon={Settings}
            label="Settings"
            onClick={() => onViewChange("seller-settings")}
          />
          <SidebarBtn
            icon={Search}
            label="Switch to Shop"
            onClick={() => onViewChange("shop")}
          />
        </nav>

        <button
          onClick={onLogout}
          className="w-full mt-6 text-red-400 hover:text-red-300"
        >
          Log out
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 space-y-8 bg-zinc-950 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-zinc-900 border-zinc-800"
            />
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 gap-2">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white border-zinc-800">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Button type="submit" className="w-full bg-purple-600">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* DASHBOARD CONTENT */}
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" innerRadius={60}>
                  {statusData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Your Products</h2>
          {userProducts.length === 0 ? (
            <p className="text-zinc-500">No products listed</p>
          ) : (
            userProducts.map((p) => (
              <div key={p.id} className="flex justify-between py-2 border-b border-zinc-800">
                <span>{p.name}</span>
                <span className="text-purple-400">₹{p.price}</span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({
  icon: Icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
