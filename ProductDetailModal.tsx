import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Product } from "@/app/components/ProductCard";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Product Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600">by {product.seller}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-lg">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between border-t pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-purple-600">₹{product.price}</p>
              </div>
              <Button size="lg" onClick={() => onAddToCart(product)} className="px-8">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Seller</p>
                <p className="font-medium">{product.seller}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}