import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AccountAndCartPage } from './components/AccountAndCartPage';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SpringBootExplorer } from './components/SpringBootExplorer';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, DEFAULT_USER } from './data/mockData';
import { Product, CartItem, Order, User } from './types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'product-detail' | 'account-cart' | 'springboot-code'
  const [currentView, setCurrentView] = useState<'home' | 'product-detail' | 'account-cart' | 'springboot-code'>('home');

  // Product Catalog
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Shopping Cart & Saved for Later (Initial setup reflects the wireframe Total: $70.50 with items)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 6, // Weather-Proof Commuter Backpack ($45.00)
      product: INITIAL_PRODUCTS[5],
      quantity: 1,
      savedForLater: false,
    },
    {
      id: 'cart-2',
      productId: 2, // Organic Cotton Crewneck T-Shirt ($19.99)
      product: INITIAL_PRODUCTS[1],
      quantity: 1,
      savedForLater: false,
    },
  ]);

  const [savedItems, setSavedItems] = useState<CartItem[]>([
    {
      id: 'saved-1',
      productId: 4, // Pro Yoga Mat ($34.99)
      product: INITIAL_PRODUCTS[3],
      quantity: 1,
      savedForLater: true,
    },
  ]);

  // Order History (Matches wireframe: "Product Name 1 - Ordered on 01/18/2026 Status: Delivered")
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // User Authentication
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_USER);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Checkout Modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3000);
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${product.id}`,
          productId: product.id,
          product,
          quantity,
          savedForLater: false,
        },
      ];
    });

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`);
  };

  const handleHomeAddToCart = (product: Product, e: React.MouseEvent) => {
    handleAddToCart(product, 1, e);
  };

  // Instant Buy Now handler (jumps directly to checkout)
  const handleBuyNow = (product: Product, quantity: number) => {
    // Add to cart if not present
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.max(item.quantity, quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${product.id}`,
          productId: product.id,
          product,
          quantity,
          savedForLater: false,
        },
      ];
    });

    setCheckoutModalOpen(true);
  };

  // Remove item from cart
  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    setSavedItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  // Toggle Save for Later (from wireframe "Save for Later" action)
  const handleToggleSaveForLater = (cartItemId: string) => {
    const inActive = cartItems.find((i) => i.id === cartItemId);
    if (inActive) {
      setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
      setSavedItems((prev) => [...prev, { ...inActive, savedForLater: true }]);
      showToast(`Saved "${inActive.product.name}" for later`);
      return;
    }

    const inSaved = savedItems.find((i) => i.id === cartItemId);
    if (inSaved) {
      setSavedItems((prev) => prev.filter((i) => i.id !== cartItemId));
      setCartItems((prev) => [...prev, { ...inSaved, savedForLater: false }]);
      showToast(`Moved "${inSaved.product.name}" back to cart`);
    }
  };

  // Quantity adjuster
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Order Placement callback
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clears active cart as shown in wireframe checkout
    setCurrentView('account-cart');
    showToast(`Order placed successfully! Order #${newOrder.orderNumber}`);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-3 text-xs font-medium">
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-stone-400 hover:text-white ml-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged out successfully', 'info');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setCurrentView('product-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleHomeAddToCart}
            searchQuery={searchQuery}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentView === 'account-cart' && (
          <AccountAndCartPage
            currentUser={currentUser}
            cartItems={cartItems}
            savedItems={savedItems}
            orders={orders}
            onRemoveFromCart={handleRemoveFromCart}
            onToggleSaveForLater={handleToggleSaveForLater}
            onUpdateQuantity={handleUpdateQuantity}
            onProceedToCheckout={() => setCheckoutModalOpen(true)}
            onBrowseProducts={() => setCurrentView('home')}
            onOpenAuth={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
          />
        )}

        {currentView === 'springboot-code' && <SpringBootExplorer />}
      </main>

      {/* Auth Modal (Login / Register wireframe) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome, ${user.fullName}!`);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}
