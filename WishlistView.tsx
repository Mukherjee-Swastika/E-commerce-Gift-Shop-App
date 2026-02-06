import { Product } from "@/app/components/ProductCard";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

interface WishlistViewProps {
  wishlistItems: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function WishlistView({
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
  onViewDetails,
}: WishlistViewProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Start adding products you love to your wishlist!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className="relative aspect-square overflow-hidden group cursor-pointer"
                onClick={() => onViewDetails(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-purple-600">
                    ₹{product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    onAddToCart(product);
                    onRemoveFromWishlist(product.id);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Items</h3>
              <p className="text-2xl font-bold text-purple-600">
                {wishlistItems.length}
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => {
                wishlistItems.forEach((product) => onAddToCart(product));
                wishlistItems.forEach((product) => onRemoveFromWishlist(product.id));
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
