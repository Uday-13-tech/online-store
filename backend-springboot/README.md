# Online Store - Spring Boot 3 & Java 17 Backend

This backend implements the RESTful API for the Online Store (E-Commerce) system, adhering to the wireframes and architectural specifications:
- **Authentication**: User Login (`/api/auth/login`) & Registration (`/api/auth/register`) with BCrypt and JWT.
- **Product Catalog**: Browsing, Categories (Electronics, Clothing, Home & Kitchen, Sports), Sales discounts, and keyword search (`/api/products`).
- **Shopping Cart**: Add to Cart, Remove, and Save for Later (`/api/cart`).
- **Orders & History**: Checkout and Previous Orders tracking (`/api/orders`) with status (Delivered, Shipped, Processing).

---

## Quick Start Guide

### Prerequisites
- **Java 17** or higher (`java -version`)
- **Apache Maven 3.8+** (`mvn -v`)

### 1. Build and Run the Backend
```bash
cd backend-springboot
mvn clean spring-boot:run
```

The server will start on port `8080`:
```
http://localhost:8080
```

### 2. Access Embedded Database Console (H2)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:onlinestoredb`
- User Name: `sa`
- Password: *(leave blank)*

### 3. Key REST API Endpoints

#### Authentication
- `POST /api/auth/register` - Create user account (username, email, password)
- `POST /api/auth/login` - Authenticate and receive JWT token

#### Products & Catalog
- `GET /api/products` - List all products
- `GET /api/products?category=Electronics` - Filter by category
- `GET /api/products?search=wireless` - Search by keyword
- `GET /api/products/sale` - List all on-sale items
- `GET /api/products/{id}` - Get item description & specifications

#### Shopping Cart
- `GET /api/cart` - Get active cart and saved for later items
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/{id}` - Remove item from cart
- `POST /api/cart/{id}/save-for-later` - Toggle item between Cart and Saved for Later

#### Orders
- `GET /api/orders` - Get previous orders for the logged-in user with status
- `POST /api/orders/checkout` - Place an order from active cart items
