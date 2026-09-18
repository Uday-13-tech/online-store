export interface Product {
  id: number;
  name: string;
  category: 'Electronics' | 'Clothing' | 'Home & Kitchen' | 'Sports';
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
  discountPercent?: number;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  stock: number;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: number;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  savedForLater?: boolean;
}

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Out for Delivery';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  token?: string;
}

export interface SpringBootFile {
  name: string;
  path: string;
  category: 'Entity' | 'Controller' | 'Service' | 'Repository' | 'DTO' | 'Security' | 'Config' | 'Build';
  description: string;
  code: string;
}
