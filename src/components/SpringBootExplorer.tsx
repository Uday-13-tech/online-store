import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  FolderTree, 
  Layers, 
  Database, 
  ShieldCheck, 
  Server, 
  Play, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SPRING_BOOT_FILES } from '../data/springBootCode';
import { SpringBootFile } from '../types';

export const SpringBootExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SpringBootFile>(SPRING_BOOT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'api' | 'architecture' | 'setup'>('code');

  // API sandbox state
  const [apiEndpoint, setApiEndpoint] = useState('/api/products');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = Array.from(new Set(SPRING_BOOT_FILES.map((f) => f.category)));

  const handleRunApiTest = () => {
    setApiLoading(true);
    setTimeout(() => {
      setApiLoading(false);
      if (apiEndpoint === '/api/products') {
        setApiResponse(JSON.stringify([
          {
            id: 1,
            name: "Wireless Noise-Canceling Headphones",
            category: "Electronics",
            price: 29.99,
            originalPrice: 59.99,
            onSale: true,
            discountPercent: 50,
            stockQuantity: 24,
            rating: 4.8
          },
          {
            id: 2,
            name: "Organic Cotton Crewneck T-Shirt",
            category: "Clothing",
            price: 19.99,
            originalPrice: 29.99,
            onSale: true,
            discountPercent: 33,
            stockQuantity: 50,
            rating: 4.6
          }
        ], null, 2));
      } else if (apiEndpoint === '/api/products/1') {
        setApiResponse(JSON.stringify({
          id: 1,
          name: "Wireless Noise-Canceling Headphones",
          category: "Electronics",
          price: 29.99,
          originalPrice: 59.99,
          onSale: true,
          discountPercent: 50,
          shortDescription: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
          fullDescription: "Engineered with custom 40mm dynamic drivers and smart acoustic tuning...",
          stockQuantity: 24,
          rating: 4.8
        }, null, 2));
      } else if (apiEndpoint === '/api/products/sale') {
        setApiResponse(JSON.stringify([
          {
            id: 1,
            name: "Wireless Noise-Canceling Headphones",
            category: "Electronics",
            price: 29.99,
            discountPercent: 50
          },
          {
            id: 3,
            name: "Stainless Steel Pour-Over Coffee Maker",
            category: "Home & Kitchen",
            price: 49.99,
            discountPercent: 28
          }
        ], null, 2));
      } else if (apiEndpoint === '/api/auth/login') {
        setApiResponse(JSON.stringify({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGV4X3Nob3BwZXIiLCJpYXQiOjE3MTEyOTYwMDB9...",
          id: 1,
          username: "alex_shopper",
          email: "alex.shopper@example.com",
          fullName: "Alex Johnson",
          role: "ROLE_USER"
        }, null, 2));
      } else if (apiEndpoint === '/api/cart') {
        setApiResponse(JSON.stringify({
          activeItems: [
            {
              id: 1,
              productId: 1,
              quantity: 1,
              productName: "Wireless Noise-Canceling Headphones",
              price: 29.99,
              savedForLater: false
            }
          ],
          savedItems: []
        }, null, 2));
      } else if (apiEndpoint === '/api/orders') {
        setApiResponse(JSON.stringify([
          {
            id: 1,
            orderNumber: "ORD-2026-9841",
            orderDate: "2026-01-18T10:15:30",
            status: "Delivered",
            totalAmount: 59.98,
            itemsCount: 2
          },
          {
            id: 2,
            orderNumber: "ORD-2026-9902",
            orderDate: "2026-02-10T14:22:00",
            status: "Shipped",
            totalAmount: 49.99,
            itemsCount: 1
          }
        ], null, 2));
      }
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-20">
      {/* Top Header Card */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Java 17 &bull; Spring Boot 3.2 Backend
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Spring Boot Java Backend Architecture & Codebase
          </h1>
          <p className="text-stone-400 text-sm max-w-2xl">
            Complete, production-grade Spring Boot 3.x project implementing all user wireframes:
            User Authentication, Product Catalog & Sales, Shopping Cart with Save for Later, and Order History tracking.
          </p>
        </div>

        {/* Action button: Copy all code shortcut */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs font-mono text-stone-300 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>port: 8080 &bull; H2 DB</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Code Explorer, REST API Sandbox, Architecture, Setup Guide */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'code'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Java Source Code Explorer</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('api');
            if (!apiResponse) handleRunApiTest();
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'api'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Spring Boot REST API Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>System Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('setup')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'setup'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Run Locally (Maven)</span>
        </button>
      </div>

      {/* 1. Java Source Code Explorer */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* File Sidebar */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <FolderTree className="w-4 h-4 text-amber-600" />
                <span>Project Files ({SPRING_BOOT_FILES.length})</span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">Java 17</span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div key={cat} className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 flex items-center gap-1.5">
                    {cat === 'Entity' && <Database className="w-3 h-3 text-stone-500" />}
                    {cat === 'Controller' && <Server className="w-3 h-3 text-stone-500" />}
                    {cat === 'Service' && <Layers className="w-3 h-3 text-stone-500" />}
                    {cat === 'Security' && <ShieldCheck className="w-3 h-3 text-stone-500" />}
                    {cat === 'Build' && <Terminal className="w-3 h-3 text-stone-500" />}
                    <span>{cat}</span>
                  </div>

                  <div className="space-y-1">
                    {SPRING_BOOT_FILES.filter((f) => f.category === cat).map((file) => {
                      const isSelected = selectedFile.name === file.name;
                      return (
                        <button
                          key={file.name}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-stone-900 text-white font-semibold shadow-xs'
                              : 'text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <ChevronRight className={`w-3 h-3 shrink-0 ${isSelected ? 'text-white' : 'text-stone-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-8 bg-stone-950 text-stone-200 border border-stone-800 rounded-2xl overflow-hidden shadow-md flex flex-col">
            {/* File Info Bar */}
            <div className="bg-stone-900 px-5 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                  <span>{selectedFile.path}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 font-sans">
                    {selectedFile.category}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">{selectedFile.description}</p>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 overflow-x-auto max-h-[640px] font-mono text-xs leading-relaxed">
              <pre className="text-stone-300">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 2. Spring Boot REST API Sandbox */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Spring Boot REST API Testing Simulator
            </h3>
            <p className="text-xs text-stone-500">
              Simulate calls to your Spring Boot REST Controllers on port 8080 and inspect payload responses matching the wireframe schema.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg">
                {apiMethod}
              </span>

              <select
                value={apiEndpoint}
                onChange={(e) => {
                  setApiEndpoint(e.target.value);
                  setApiMethod(e.target.value.includes('login') ? 'POST' : 'GET');
                }}
                className="flex-1 min-w-[240px] px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="/api/products">GET /api/products (All catalog products)</option>
                <option value="/api/products/1">GET /api/products/1 (Item description & specs)</option>
                <option value="/api/products/sale">GET /api/products/sale (50% Off Sale items)</option>
                <option value="/api/auth/login">POST /api/auth/login (User authentication)</option>
                <option value="/api/cart">GET /api/cart (Active Cart & Saved for Later)</option>
                <option value="/api/orders">GET /api/orders (Previous bought items)</option>
              </select>

              <button
                onClick={handleRunApiTest}
                disabled={apiLoading}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{apiLoading ? 'Executing...' : 'Send Request'}</span>
              </button>
            </div>
          </div>

          {/* Response payload viewer */}
          {apiResponse && (
            <div className="bg-stone-950 text-stone-200 border border-stone-800 rounded-2xl overflow-hidden shadow-md">
              <div className="bg-stone-900 px-5 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400">HTTP/1.1 200 OK &bull; application/json</span>
                <span className="text-stone-400 font-mono">Response Time: 28ms</span>
              </div>
              <pre className="p-5 overflow-x-auto text-xs font-mono text-stone-300 max-h-[450px]">
                <code>{apiResponse}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* 3. System Architecture */}
      {activeTab === 'architecture' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900">
              Spring Boot 3 Enterprise Architecture Overview
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Designed according to Spring's recommended N-Tier Layered Architecture with loose coupling, dependency injection, and JPA repository abstractions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mx-auto">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">1. Controller Layer</h3>
              <p className="text-xs text-stone-600">
                REST API endpoints, request validation (@Valid), HTTP response codes, and CORS mapping.
              </p>
              <div className="text-[10px] font-mono text-amber-800">
                ProductController, AuthController, CartController, OrderController
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">2. Service Layer</h3>
              <p className="text-xs text-stone-600">
                Business rules, transactions (@Transactional), pricing calculation, and cart logic.
              </p>
              <div className="text-[10px] font-mono text-blue-800">
                ProductService, CartService, OrderService, AuthService
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mx-auto">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">3. Repository Layer</h3>
              <p className="text-xs text-stone-600">
                Spring Data JPA interfaces automatically generating high-performance SQL queries.
              </p>
              <div className="text-[10px] font-mono text-purple-800">
                ProductRepository, CartItemRepository, OrderRepository, UserRepository
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">4. Security & JWT</h3>
              <p className="text-xs text-stone-600">
                Stateless session filter chain, BCrypt password hashing, and token validation.
              </p>
              <div className="text-[10px] font-mono text-emerald-800">
                SecurityConfig, JwtUtils, BCryptPasswordEncoder
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Setup Guide */}
      {activeTab === 'setup' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900">
              How to Run the Spring Boot Backend in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Follow these standard Maven instructions on your computer or server to boot the application.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Verify Java 17 and Maven</span>
              </div>
              <div className="bg-stone-900 text-stone-200 p-3 rounded-lg font-mono text-xs">
                java -version<br />
                mvn -version
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Start the Spring Boot Application</span>
              </div>
              <div className="bg-stone-900 text-stone-200 p-3 rounded-lg font-mono text-xs">
                cd backend-springboot<br />
                mvn clean spring-boot:run
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Access Endpoints and H2 Database Console</span>
              </div>
              <p className="text-xs text-stone-600">
                Once booted, the application is listening at <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">http://localhost:8080</code>.
                You can access the embedded H2 console at <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">http://localhost:8080/h2-console</code> (JDBC URL: <code className="font-mono">jdbc:h2:mem:onlinestoredb</code>).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
