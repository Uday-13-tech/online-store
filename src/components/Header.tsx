import React from 'react';
import { ShoppingBag, ShoppingCart, User as UserIcon, Code2, Search, ArrowLeft, LogOut, PackageCheck } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentView: 'home' | 'product-detail' | 'account-cart' | 'springboot-code';
  setCurrentView: (view: 'home' | 'product-detail' | 'account-cart' | 'springboot-code') => void;
  cartCount: number;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  currentUser,
  onOpenAuth,
  onLogout,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Spring Boot 3.2 Backend Ready &bull; Port 8080 &bull; Java 17</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('springboot-code')}
              className="hover:text-white flex items-center gap-1.5 transition-colors font-medium text-amber-300 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Java Spring Boot Code</span>
            </button>
            <span className="text-stone-600">|</span>
            <span>Free Shipping Over $35</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          {currentView !== 'home' && currentView !== 'springboot-code' && (
            <button
              onClick={() => setCurrentView('home')}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-amber-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-lg leading-tight tracking-tight">Online Store</div>
              <div className="text-[11px] text-stone-500 font-medium">Spring Boot &bull; E-Commerce</div>
            </div>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md min-w-[240px] order-3 sm:order-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'home') setCurrentView('home');
              }}
              placeholder="Search for products, electronics, clothing..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all placeholder:text-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 order-2 sm:order-3">
          {/* Spring Boot Code Toggle Pill */}
          <button
            onClick={() => setCurrentView(currentView === 'springboot-code' ? 'home' : 'springboot-code')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'springboot-code'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden md:inline">Java Spring Boot Code</span>
            <span className="md:hidden">Java Code</span>
          </button>

          {/* User Account / Orders */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentView('account-cart')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  currentView === 'account-cart'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-semibold">{currentUser.username}</span>
                <span className="text-stone-400 hidden lg:inline">&bull; Orders</span>
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Register
              </button>
            </div>
          )}

          {/* Cart Icon & Badge */}
          <button
            onClick={() => setCurrentView('account-cart')}
            className={`relative p-2 rounded-xl transition-all cursor-pointer ${
              currentView === 'account-cart'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
            }`}
            title="View Cart & Orders"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
