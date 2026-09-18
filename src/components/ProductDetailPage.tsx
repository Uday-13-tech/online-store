import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Zap, Star, CheckCircle2, Shield, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Back button breadcrumb */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to products</span>
      </button>

      {/* Main Product Card (Item description and buy option wireframe) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.isOnSale && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                Sale: {product.discountPercent}% Off
              </span>
            )}
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">{product.rating} / 5.0</span>
                <span className="text-xs text-stone-400">&bull; In Stock ({product.stock} units)</span>
              </div>
            </div>

            {/* Short Description (wireframe highlight) */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price section */}
            <div className="pt-2 border-t border-stone-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-stone-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-stone-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-stone-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500">
                  Subtotal: <strong className="text-stone-900">${(product.price * quantity).toFixed(2)}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons: [Add to Cart] & [Buy Now] as in wireframe */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{addedAnimation ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => onBuyNow(product, quantity)}
                className="flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Free delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year Official Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section (wireframe: Product Description) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight pb-3 border-b border-stone-200">
          Product Description
        </h2>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
          {product.fullDescription}
        </p>

        {/* Feature bullets */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Key Features & Benefits
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Specifications */}
        {product.specifications && (
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Technical Specifications
            </h3>
            <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 text-xs sm:text-sm">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="grid grid-cols-3 p-3 hover:bg-stone-50 transition-colors">
                  <span className="font-semibold text-stone-500">{key}</span>
                  <span className="col-span-2 text-stone-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
