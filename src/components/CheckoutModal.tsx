import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { CartItem, Order, User } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  onOrderCompleted: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onOrderCompleted,
}) => {
  const [fullName, setFullName] = useState(currentUser ? currentUser.fullName : 'Alex Johnson');
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [state, setState] = useState('IL');
  const [zipCode, setZipCode] = useState('62704');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 35 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `ORD-2026-${randomId}`,
        orderDate: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        }),
        status: 'Processing',
        totalAmount: total,
        shippingAddress: {
          fullName,
          street,
          city,
          state,
          zipCode,
        },
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
          quantity: item.quantity,
        })),
      };

      setIsProcessing(false);
      onOrderCompleted(newOrder);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-stone-900">Checkout & Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Order Summary preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-stone-900 flex justify-between">
              <span>Ordering {cartItems.reduce((a, b) => a + b.quantity, 0)} items</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="text-stone-500 text-xs flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Shipping Address
            </h3>

            <div className="space-y-1">
              <label className="text-xs text-stone-600">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-600">Street Address</label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-xs text-stone-600">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-600">Zip Code</label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-xs font-bold text-stone-900">Card Payment</div>
                  <div className="text-[10px] text-stone-500">Demo Instant Auth</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Truck className="w-5 h-5 text-stone-700" />
                <div>
                  <div className="text-xs font-bold text-stone-900">Cash on Delivery</div>
                  <div className="text-[10px] text-stone-500">Pay on Arrival</div>
                </div>
              </button>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-100">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Encrypted endpoint: POST /api/orders/checkout</span>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-stone-900 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isProcessing ? 'Processing Order via Spring Boot...' : `Place Order • $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};
