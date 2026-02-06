import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/components/ProductCard";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";

interface LandingPageProps {
  products: Product[];
  onLogin: (role: "customer" | "seller") => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function LandingPage({ products, onLogin, onAddToCart, onViewDetails }: LandingPageProps) {
  const [autoplay, setAutoplay] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Auto-sliding Background */}
      <div className="relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/85 to-pink-800/90" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 text-white text-center">
          <h1 className="text-5xl md:text-6xl mb-6">
            Welcome to GiftHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your one-stop marketplace for unique gifts. Buy from amazing sellers or start selling your own creations!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-6 text-lg min-w-[200px]"
              onClick={() => onLogin("customer")}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Buying
            </Button>
            <Button
              size="lg"
              className="bg-pink-600 text-white hover:bg-pink-700 px-10 py-6 text-lg min-w-[200px]"
              onClick={() => onLogin("seller")}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Start Selling
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600">
            Discover amazing gifts from talented sellers worldwide
          </p>
        </div>

        <div
          className="slider-container"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onViewDetails(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{product.category}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                Browse thousands of unique gifts and find the perfect present
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Sell Your Crafts</h3>
              <p className="text-gray-600">
                Start your own shop and reach customers worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Custom Orders</h3>
              <p className="text-gray-600">
                Chat with sellers to personalize your perfect gift
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of buyers and sellers on GiftHub
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={() => onLogin("customer")}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
}