import React from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  User as UserIcon, 
  CreditCard,
  Plus,
  Minus
} from 'lucide-react';
import { CartItem, Order, User } from '../types';

interface AccountAndCartPageProps {
  currentUser: User | null;
  cartItems: CartItem[];
  savedItems: CartItem[];
  orders: Order[];
  onRemoveFromCart: (cartItemId: string) => void;
  onToggleSaveForLater: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onProceedToCheckout: () => void;
  onBrowseProducts: () => void;
  onOpenAuth: () => void;
}

export const AccountAndCartPage: React.FC<AccountAndCartPageProps> = ({
  currentUser,
  cartItems,
  savedItems,
  orders,
  onRemoveFromCart,
  onToggleSaveForLater,
  onUpdateQuantity,
  onProceedToCheckout,
  onBrowseProducts,
  onOpenAuth,
}) => {
  // Calculate cart total
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cartSubtotal > 35 || cartSubtotal === 0 ? 0 : 4.99;
  const total = cartSubtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12 pb-24">
      {/* 1. My Account Header (Wireframe: My Account) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {currentUser ? currentUser.username.charAt(0).toUpperCase() : <UserIcon className="w-7 h-7" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">My Account</h1>
            {currentUser ? (
              <p className="text-xs sm:text-sm text-stone-500">
                Logged in as <span className="font-semibold text-stone-800">{currentUser.fullName}</span> ({currentUser.email})
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-stone-500">
                Viewing as Guest. <button onClick={onOpenAuth} className="text-amber-600 font-bold hover:underline">Log in or Register</button> to sync your cloud orders.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Verified Customer
          </span>
        </div>
      </div>

      {/* 2. My Orders Section (Wireframe: My Orders) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-stone-700" />
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">My Orders</h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center space-y-3">
            <Clock className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-stone-600 text-sm font-medium">You have not placed any orders yet.</p>
            <button
              onClick={onBrowseProducts}
              className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden shadow-xs">
            {orders.map((order) => (
              <div key={order.id} className="p-5 sm:p-6 space-y-4 hover:bg-stone-50/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <span className="font-bold text-stone-900">{order.orderNumber}</span>
                    <span>&bull;</span>
                    <span>Ordered on <strong className="text-stone-900">{order.orderDate}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status === 'Delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                      {order.status === 'Shipped' && <Truck className="w-3.5 h-3.5" />}
                      {order.status === 'Processing' && <Clock className="w-3.5 h-3.5" />}
                      Status: {order.status}
                    </span>
                    <span className="font-bold text-stone-900 text-sm sm:text-base">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-xl bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                            {item.productName}
                          </h4>
                          <p className="text-xs text-stone-500">
                            Qty: {item.quantity} &bull; ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-xs font-semibold text-stone-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. My Cart Section (Wireframe: My Cart) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">My Cart</h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900">Your cart is empty</h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                Explore our catalog to find items, electronics, clothing, and kitchenware on sale.
              </p>
            </div>
            <button
              onClick={onBrowseProducts}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden shadow-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Thumbnail & Product info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-stone-100 border border-stone-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {item.product.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-sm font-extrabold text-stone-900">
                        ${item.product.price.toFixed(2)}
                      </div>

                      {/* Quantity adjuster */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 font-bold text-stone-900 min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-stone-400">
                          Total: <strong className="text-stone-800">${(item.product.price * item.quantity).toFixed(2)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Remove & Save for Later (Matches wireframe buttons) */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={() => onToggleSaveForLater(item.id)}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save for Later</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Card with Total & Proceed to Checkout (from wireframe) */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5 sticky top-24">
              <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-stone-900">$0.00</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-stone-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Wireframe Button: Proceed to Checkout */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-amber-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-stone-500 text-center space-y-1">
                <p>Guaranteed Safe & Secure Checkout</p>
                <div className="flex items-center justify-center gap-2 text-stone-400">
                  <CreditCard className="w-4 h-4" />
                  <span>Powered by Spring Boot Security</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Saved for Later Section */}
      {savedItems.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">Saved for Later</h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden shadow-xs">
            {savedItems.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-stone-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{item.product.name}</h4>
                    <p className="text-xs font-extrabold text-stone-800">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSaveForLater(item.id)}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
