import { useState } from "react";
import { Header } from "@/app/components/Header";
import { ShopView } from "@/app/components/ShopView";
import { CartView, CartItem } from "@/app/components/CartView";
import { ChatView } from "@/app/components/ChatView";
import { SellerDashboard } from "@/app/components/SellerDashboard";
import { OrdersView } from "@/app/components/OrdersView";
import { ProductDetailModal } from "@/app/components/ProductDetailModal";
import { LandingPage } from "@/app/components/LandingPage";
import { AuthScreen } from "@/app/components/AuthScreen";
import { WishlistView } from "@/app/components/WishlistView";
import { Product } from "@/app/components/ProductCard";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";

// Seller pages
import { SellerInventoryView } from "@/app/components/SellerInventoryView";
import { SellerOrdersView } from "@/app/components/SellerOrdersView";
import { SellerCustomersView } from "@/app/components/SellerCustomersView";
import { SellerAnalyticsView } from "@/app/components/SellerAnalyticsView";
import { SellerMessagesView } from "@/app/components/SellerMessagesView";
import { SellerPayoutsView } from "@/app/components/SellerPayoutsView";
import { SellerSettingsView } from "@/app/components/SellerSettingsView";

export default function App() {
  // ✅ SINGLE navigation state
  const [currentView, setCurrentView] = useState("shop");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"customer" | "seller">("customer");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [preSelectedRole, setPreSelectedRole] =
    useState<"customer" | "seller">("customer");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  // ---------------- PRODUCTS ----------------
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Luxury Gift Box Set",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1625552185153-7a8d8f3794a3",
      category: "Gift Baskets",
      seller: "GiftCraft Co.",
      description: "Premium luxury gift box.",
      rating: 4.8,
      reviews: 124,
    },
  ]);

  // ---------------- CART ----------------
  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success("Added to cart");
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully");
    setCartItems([]);
    setCurrentView("orders");
  };

  // ---------------- PRODUCT ----------------
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddProduct = (
    productData: Omit<Product, "id" | "rating" | "reviews">
  ) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 5,
      reviews: 0,
    };
    setUserProducts([...userProducts, newProduct]);
    setProducts([...products, newProduct]);
    toast.success("Product listed");
  };

  // ---------------- AUTH ----------------
  const handleAuthenticate = (role: "customer" | "seller") => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentView(role === "seller" ? "seller-dashboard" : "shop");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("customer");
    setCurrentView("shop");
    toast.success("Logged out");
  };

  // ---------------- LANDING ----------------
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          products={products}
          onLogin={(role) => {
            setPreSelectedRole(role);
            setShowAuthDialog(true);
          }}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />

        {showAuthDialog && (
          <AuthScreen
            onClose={() => setShowAuthDialog(false)}
            onAuthenticate={handleAuthenticate}
            preSelectedRole={preSelectedRole}
          />
        )}

        <ProductDetailModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onAddToCart={handleAddToCart}
        />

        <Toaster position="bottom-right" />
      </>
    );
  }

  // ---------------- SELLER VIEWS ----------------
  if (userRole === "seller") {
    return (
      <>
        {currentView === "seller-dashboard" && (
          <SellerDashboard
            userProducts={userProducts}
            onAddProduct={handleAddProduct}
            onLogout={handleLogout}
            onViewChange={setCurrentView}
          />
        )}

        {currentView === "seller-inventory" && (
          <SellerInventoryView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-orders" && (
          <SellerOrdersView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-customers" && (
          <SellerCustomersView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-analytics" && (
          <SellerAnalyticsView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-messages" && (
          <SellerMessagesView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-payouts" && (
          <SellerPayoutsView onViewChange={setCurrentView} />
        )}

        {currentView === "seller-settings" && (
          <SellerSettingsView onViewChange={setCurrentView} />
        )}

        <Toaster position="bottom-right" />
      </>
    );
  }

  // ---------------- CUSTOMER VIEWS ----------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        cartItemCount={cartItems.length}
        wishlistItemCount={wishlistItems.length}
        onSearch={setSearchQuery}
        onLogout={handleLogout}
        userRole={userRole}
      />

      <main>
        {currentView === "shop" && (
          <ShopView
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
            searchQuery={searchQuery}
            onToggleWishlist={() => {}}
            wishlistItems={wishlistItems}
          />
        )}

        {currentView === "cart" && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={() => {}}
            onRemoveItem={() => {}}
            onCheckout={handleCheckout}
          />
        )}

        {currentView === "orders" && <OrdersView />}
        {currentView === "chat" && <ChatView />}

        {currentView === "wishlist" && (
          <WishlistView
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={() => {}}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
