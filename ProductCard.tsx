import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/app/components/ui/hover-card";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  description: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ product, onAddToCart, onViewDetails, onToggleWishlist, isInWishlist = false }: ProductCardProps) {
  const { id, name, price, image, category, seller, description, rating, reviews } = product;
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="relative aspect-square overflow-hidden" onClick={() => onViewDetails(product)}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="secondary"
              size="icon"
              className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                isInWishlist ? "bg-red-500 hover:bg-red-600 opacity-100" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleWishlist) {
                  onToggleWishlist(product);
                }
              }}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-white text-white" : ""}`} />
            </Button>
            <Badge className="absolute top-2 left-2">{category}</Badge>
          </div>
          <CardContent className="p-4" onClick={() => onViewDetails(product)}>
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">by {seller}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{rating}</span>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <span className="text-xl font-bold text-purple-600">₹{price}</span>
            <Button size="sm" onClick={onAddToCart}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{reviews} reviews</span>
            <Button size="sm" variant="outline" onClick={onViewDetails}>
              View Details
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}