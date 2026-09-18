import React from 'react';
import { ShoppingCart, Tag, Star, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  searchQuery: string;
}

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Sports'] as const;

export const HomePage: React.FC<HomePageProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  searchQuery,
}) => {
  // Filter products by category and search
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Welcome to Our Online Store Banner */}
      <section className="bg-stone-100 border-b border-stone-200 py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Welcome to Our Online Store
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Browse our hand-picked collection of premium items, exclusive sale discounts, and high-performance products.
          </p>
        </div>
      </section>

      {/* 2. Big Sale! Up to 50% off on selected items! Promo Banner (from wireframe) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-amber-600 text-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Tag className="w-3.5 h-3.5" />
              Limited Time Deals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Big Sale! Up to 50% off on selected items!
            </h2>
            <p className="text-amber-100 text-sm max-w-md">
              Save big on trending noise-canceling headphones, pour-over coffee gear, organic essentials, and athletic equipment.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 shrink-0">
            <button
              onClick={() => {
                setSelectedCategory('Electronics');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white text-stone-900 hover:bg-stone-100 text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              Shop Deals Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Decorative subtle background circle */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl"></div>
        </div>
      </div>

      {/* 3. Category Filter Tabs (from wireframe: Electronics, Clothing, Home & Kitchen, Sports) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6 gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-stone-500 font-medium whitespace-nowrap">
            Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> products
          </div>
        </div>

        {/* 4. Product Grid (Image, Title, Short Description, Price, Add to Cart) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500 text-base font-medium">No products found matching your search or filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.isOnSale && (
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                      {product.discountPercent}% Off
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-2xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Product Information Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-lg font-extrabold text-stone-900">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-stone-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => onAddToCart(product, e)}
                      className="px-3.5 py-2 bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust & Guarantee Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-stone-200 pt-8">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">Express Delivery</div>
              <div className="text-xs text-stone-500">Fast shipping with real-time tracking</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">Secure Checkout</div>
              <div className="text-xs text-stone-500">Encrypted payments & Spring Security API</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">30-Day Easy Returns</div>
              <div className="text-xs text-stone-500">Hassle-free money back guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Wireframe Footer: "© 2026 Online Store. All rights reserved." */}
      <footer className="text-center text-xs text-stone-500 border-t border-stone-200 pt-8 mt-12">
        <p>&copy; 2026 Online Store. All rights reserved.</p>
        <p className="text-[11px] text-stone-400 mt-1">
          Powered by Java 17 &bull; Spring Boot 3.2 REST Backend &bull; React & Tailwind
        </p>
      </footer>
    </div>
  );
};
