import { ShoppingCart, Store, MessageSquare, User, Search, Menu, LogOut, Heart, LayoutDashboard } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  cartItemCount: number;
  wishlistItemCount: number;
  onSearch: (query: string) => void;
  onLogout?: () => void;
  userRole: "customer" | "seller";
}

export function Header({ currentView, onViewChange, cartItemCount, wishlistItemCount, onSearch, onLogout, userRole }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">GiftHub</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for gifts..."
                className="pl-10 w-full"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === "shop" ? "default" : "ghost"}
              onClick={() => onViewChange("shop")}
            >
              <Store className="w-4 h-4 mr-2" />
              Shop
            </Button>
            {userRole === "seller" && (
              <Button
                variant={currentView === "sell" ? "default" : "ghost"}
                onClick={() => onViewChange("sell")}
                className={currentView !== "sell" ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50" : ""}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
            <Button
              variant={currentView === "chat" ? "default" : "ghost"}
              onClick={() => onViewChange("chat")}
              className="relative"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Customize
            </Button>
            {userRole === "customer" && (
              <Button
                variant={currentView === "wishlist" ? "default" : "ghost"}
                onClick={() => onViewChange("wishlist")}
                className="relative"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>
            )}
            <Button
              variant={currentView === "cart" ? "default" : "ghost"}
              onClick={() => onViewChange("cart")}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewChange("orders")}>
                  My Orders
                </DropdownMenuItem>
                {userRole === "seller" && (
                  <DropdownMenuItem onClick={() => onViewChange("sell")}>
                    Seller Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Button
                  variant={currentView === "shop" ? "default" : "ghost"}
                  onClick={() => onViewChange("shop")}
                  className="justify-start"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Shop
                </Button>
                {userRole === "seller" && (
                  <Button
                    variant={currentView === "sell" ? "default" : "ghost"}
                    onClick={() => onViewChange("sell")}
                    className="justify-start text-purple-600"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                <Button
                  variant={currentView === "chat" ? "default" : "ghost"}
                  onClick={() => onViewChange("chat")}
                  className="justify-start"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Customize
                </Button>
                <Button
                  variant={currentView === "cart" ? "default" : "ghost"}
                  onClick={() => onViewChange("cart")}
                  className="justify-start relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartItemCount > 0 && (
                    <Badge className="ml-auto">{cartItemCount}</Badge>
                  )}
                </Button>
                <Button
                  variant={currentView === "orders" ? "default" : "ghost"}
                  onClick={() => onViewChange("orders")}
                  className="justify-start"
                >
                  My Orders
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for gifts..."
              className="pl-10 w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}