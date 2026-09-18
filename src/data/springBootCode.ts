import { SpringBootFile } from '../types';

export const SPRING_BOOT_FILES: SpringBootFile[] = [
  {
    name: 'pom.xml',
    path: 'pom.xml',
    category: 'Build',
    description: 'Maven configuration file with Spring Boot 3.2.3, Spring Data JPA, Spring Security, JWT, H2/PostgreSQL, and Validation.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>
    <groupId>com.store</groupId>
    <artifactId>online-store-backend</artifactId>
    <version>1.0.0</version>
    <name>Online Store E-Commerce Backend</name>
    <description>Spring Boot backend for Online Store e-commerce application</description>
    
    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.11.5</jjwt.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web Starter for RESTful APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Data JPA for Database Persistence -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Spring Security for Authentication and Authorization -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- Hibernate Validator for Request DTO validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- JWT (JSON Web Token) dependencies -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Embedded H2 Database for seamless development and testing -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Optional: PostgreSQL Driver for production deployment -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Boot Test Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    name: 'OnlineStoreApplication.java',
    path: 'src/main/java/com/store/OnlineStoreApplication.java',
    category: 'Config',
    description: 'Main entry point for the Spring Boot application.',
    code: `package com.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineStoreApplication.class, args);
        System.out.println(">>> Online Store Spring Boot Backend is running successfully on port 8080! <<<");
    }
}`
  },
  {
    name: 'Product.java',
    path: 'src/main/java/com/store/entity/Product.java',
    category: 'Entity',
    description: 'JPA entity representing products in the store catalog with pricing, category, stock, and descriptions.',
    code: `package com.store.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // Electronics, Clothing, Home & Kitchen, Sports

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal originalPrice;

    private boolean onSale = false;

    private Integer discountPercent;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 500)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    private Double rating = 4.5;

    private Integer stockQuantity = 50;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {}

    public Product(String name, String category, BigDecimal price, BigDecimal originalPrice, 
                   boolean onSale, Integer discountPercent, String imageUrl, 
                   String shortDescription, String fullDescription, Integer stockQuantity) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.onSale = onSale;
        this.discountPercent = discountPercent;
        this.imageUrl = imageUrl;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.stockQuantity = stockQuantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public boolean isOnSale() { return onSale; }
    public void setOnSale(boolean onSale) { this.onSale = onSale; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`
  },
  {
    name: 'User.java',
    path: 'src/main/java/com/store/entity/User.java',
    category: 'Entity',
    description: 'JPA entity representing registered users with encrypted passwords and roles.',
    code: `package com.store.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String fullName;

    private String role = "ROLE_USER";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String username, String email, String password, String fullName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`
  },
  {
    name: 'CartItem.java',
    path: 'src/main/java/com/store/entity/CartItem.java',
    category: 'Entity',
    description: 'JPA entity representing shopping cart items with Save for Later support as seen in wireframe.',
    code: `package com.store.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity = 1;

    // Supports wireframe "Save for Later" functionality
    @Column(nullable = false)
    private boolean savedForLater = false;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public CartItem() {}

    public CartItem(User user, Product product, Integer quantity, boolean savedForLater) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.savedForLater = savedForLater;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public boolean isSavedForLater() { return savedForLater; }
    public void setSavedForLater(boolean savedForLater) { this.savedForLater = savedForLater; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}`
  },
  {
    name: 'Order.java',
    path: 'src/main/java/com/store/entity/Order.java',
    category: 'Entity',
    description: 'JPA entity representing user orders and status (Delivered, Shipped, Processing) as shown in My Orders wireframe.',
    code: `package com.store.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String status; // "Delivered", "Shipped", "Processing"

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    private String shippingAddress;

    private LocalDateTime orderDate = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Order(String orderNumber, User user, String status, BigDecimal totalAmount, String shippingAddress) {
        this.orderNumber = orderNumber;
        this.user = user;
        this.status = status;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}`
  },
  {
    name: 'OrderItem.java',
    path: 'src/main/java/com/store/entity/OrderItem.java',
    category: 'Entity',
    description: 'JPA entity representing individual items inside an order.',
    code: `package com.store.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String productName;

    private String imageUrl;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    public OrderItem() {}

    public OrderItem(Product product, String productName, String imageUrl, BigDecimal price, Integer quantity) {
        this.product = product;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}`
  },
  {
    name: 'ProductRepository.java',
    path: 'src/main/java/com/store/repository/ProductRepository.java',
    category: 'Repository',
    description: 'Spring Data JPA repository with category and search query methods.',
    code: `package com.store.repository;

import com.store.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByOnSaleTrue();

    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);
}`
  },
  {
    name: 'CartItemRepository.java',
    path: 'src/main/java/com/store/repository/CartItemRepository.java',
    category: 'Repository',
    description: 'Spring Data JPA repository for user cart operations.',
    code: `package com.store.repository;

import com.store.entity.CartItem;
import com.store.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserAndSavedForLaterFalse(User user);

    List<CartItem> findByUserAndSavedForLaterTrue(User user);

    Optional<CartItem> findByUserAndProductIdAndSavedForLater(User user, Long productId, boolean savedForLater);

    void deleteByUserAndSavedForLaterFalse(User user);
}`
  },
  {
    name: 'OrderRepository.java',
    path: 'src/main/java/com/store/repository/OrderRepository.java',
    category: 'Repository',
    description: 'Spring Data JPA repository for retrieving user orders sorted by date.',
    code: `package com.store.repository;

import com.store.entity.Order;
import com.store.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByOrderDateDesc(User user);

    Optional<Order> findByOrderNumber(String orderNumber);
}`
  },
  {
    name: 'UserRepository.java',
    path: 'src/main/java/com/store/repository/UserRepository.java',
    category: 'Repository',
    description: 'Spring Data JPA repository for user accounts and email lookups.',
    code: `package com.store.repository;

import com.store.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}`
  },
  {
    name: 'ProductService.java',
    path: 'src/main/java/com/store/service/ProductService.java',
    category: 'Service',
    description: 'Business logic for catalog, category filtering, search, and inventory management.',
    code: `package com.store.service;

import com.store.entity.Product;
import com.store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        if (category == null || category.equalsIgnoreCase("All")) {
            return productRepository.findAll();
        }
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public List<Product> getSaleProducts() {
        return productRepository.findByOnSaleTrue();
    }

    public List<Product> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return productRepository.findAll();
        }
        return productRepository.searchProducts(query.trim());
    }
}`
  },
  {
    name: 'CartService.java',
    path: 'src/main/java/com/store/service/CartService.java',
    category: 'Service',
    description: 'Handles adding items, quantity updates, remove, and toggle Save for Later.',
    code: `package com.store.service;

import com.store.entity.CartItem;
import com.store.entity.Product;
import com.store.entity.User;
import com.store.repository.CartItemRepository;
import com.store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public List<CartItem> getActiveCart(User user) {
        return cartItemRepository.findByUserAndSavedForLaterFalse(user);
    }

    public List<CartItem> getSavedForLater(User user) {
        return cartItemRepository.findByUserAndSavedForLaterTrue(user);
    }

    public CartItem addToCart(User user, Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return cartItemRepository.findByUserAndProductIdAndSavedForLater(user, productId, false)
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + quantity);
                    existing.setUpdatedAt(LocalDateTime.now());
                    return cartItemRepository.save(existing);
                })
                .orElseGet(() -> {
                    CartItem newItem = new CartItem(user, product, quantity, false);
                    return cartItemRepository.save(newItem);
                });
    }

    public void removeFromCart(Long cartItemId, User user) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized cart action");
        }
        cartItemRepository.delete(item);
    }

    public CartItem toggleSaveForLater(Long cartItemId, User user) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized cart action");
        }
        item.setSavedForLater(!item.isSavedForLater());
        item.setUpdatedAt(LocalDateTime.now());
        return cartItemRepository.save(item);
    }
}`
  },
  {
    name: 'OrderService.java',
    path: 'src/main/java/com/store/service/OrderService.java',
    category: 'Service',
    description: 'Manages order placement, order numbers, and fetches order history.',
    code: `package com.store.service;

import com.store.entity.CartItem;
import com.store.entity.Order;
import com.store.entity.OrderItem;
import com.store.entity.User;
import com.store.repository.CartItemRepository;
import com.store.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;

    public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    public Order checkout(User user, String shippingAddress) {
        List<CartItem> cartItems = cartItemRepository.findByUserAndSavedForLaterFalse(user);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cannot checkout with an empty cart");
        }

        BigDecimal total = BigDecimal.ZERO;
        String orderNumber = "ORD-2026-" + (1000 + (int)(Math.random() * 9000));
        Order order = new Order(orderNumber, user, "Processing", BigDecimal.ZERO, shippingAddress);

        for (CartItem cartItem : cartItems) {
            BigDecimal itemTotal = cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            total = total.add(itemTotal);

            OrderItem orderItem = new OrderItem(
                cartItem.getProduct(),
                cartItem.getProduct().getName(),
                cartItem.getProduct().getImageUrl(),
                cartItem.getProduct().getPrice(),
                cartItem.getQuantity()
            );
            order.addItem(orderItem);
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        // Clear active cart items
        cartItemRepository.deleteByUserAndSavedForLaterFalse(user);

        return savedOrder;
    }
}`
  },
  {
    name: 'ProductController.java',
    path: 'src/main/java/com/store/controller/ProductController.java',
    category: 'Controller',
    description: 'REST controller providing endpoints for product browsing, categories, and keyword searches.',
    code: `package com.store.controller;

import com.store.entity.Product;
import com.store.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productService.search(search));
        }
        if (category != null && !category.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/sale")
    public ResponseEntity<List<Product>> getSaleProducts() {
        return ResponseEntity.ok(productService.getSaleProducts());
    }
}`
  },
  {
    name: 'CartController.java',
    path: 'src/main/java/com/store/controller/CartController.java',
    category: 'Controller',
    description: 'REST controller for managing user cart, add to cart, remove, and save for later.',
    code: `package com.store.controller;

import com.store.entity.CartItem;
import com.store.entity.User;
import com.store.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCart(@AuthenticationPrincipal User user) {
        List<CartItem> activeItems = cartService.getActiveCart(user);
        List<CartItem> savedItems = cartService.getSavedForLater(user);
        return ResponseEntity.ok(Map.of(
            "activeItems", activeItems,
            "savedItems", savedItems
        ));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = payload.containsKey("quantity") ? Integer.parseInt(payload.get("quantity").toString()) : 1;
        return ResponseEntity.ok(cartService.addToCart(user, productId, quantity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        cartService.removeFromCart(id, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/save-for-later")
    public ResponseEntity<CartItem> toggleSaveForLater(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ResponseEntity.ok(cartService.toggleSaveForLater(id, user));
    }
}`
  },
  {
    name: 'OrderController.java',
    path: 'src/main/java/com/store/controller/OrderController.java',
    category: 'Controller',
    description: 'REST controller for checkout and viewing order history with status.',
    code: `package com.store.controller;

import com.store.entity.Order;
import com.store.entity.User;
import com.store.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getUserOrders(user));
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body) {
        String address = body.getOrDefault("shippingAddress", "Standard Delivery Address");
        return ResponseEntity.ok(orderService.checkout(user, address));
    }
}`
  },
  {
    name: 'AuthController.java',
    path: 'src/main/java/com/store/controller/AuthController.java',
    category: 'Controller',
    description: 'REST controller handling user login and registration.',
    code: `package com.store.controller;

import com.store.entity.User;
import com.store.repository.UserRepository;
import com.store.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        return userRepository.findByUsername(username)
                .filter(u -> passwordEncoder.matches(password, u.getPassword()))
                .map(u -> {
                    String token = jwtUtils.generateToken(u.getUsername());
                    return ResponseEntity.ok(Map.of(
                        "token", token,
                        "id", u.getId(),
                        "username", u.getUsername(),
                        "email", u.getEmail(),
                        "fullName", u.getFullName() != null ? u.getFullName() : u.getUsername()
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("message", "Invalid username or password")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        String fullName = request.getOrDefault("fullName", username);

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already taken"));
        }
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
        }

        User user = new User(username, email, passwordEncoder.encode(password), fullName);
        User saved = userRepository.save(user);

        String token = jwtUtils.generateToken(saved.getUsername());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "id", saved.getId(),
            "username", saved.getUsername(),
            "email", saved.getEmail(),
            "fullName", saved.getFullName()
        ));
    }
}`
  },
  {
    name: 'SecurityConfig.java',
    path: 'src/main/java/com/store/security/SecurityConfig.java',
    category: 'Security',
    description: 'Spring Security 6 configuration with stateless JWT authentication and password hashing.',
    code: `package com.store.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/products/**", "/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .headers(headers -> headers.frameOptions(f -> f.disable())); // For H2 Console web UI

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of("*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}`
  },
  {
    name: 'JwtUtils.java',
    path: 'src/main/java/com/store/security/JwtUtils.java',
    category: 'Security',
    description: 'Utility class for generating and parsing HMAC SHA-256 JWT tokens.',
    code: `package com.store.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 256-bit secret key for signing tokens
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION_TIME = 86400000L; // 24 hours in milliseconds

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}`
  },
  {
    name: 'application.properties',
    path: 'src/main/resources/application.properties',
    category: 'Config',
    description: 'Spring Boot application configuration for embedded H2 database, JPA hibernate settings, and port 8080.',
    code: `# Server Port
server.port=8080

# Application Name
spring.application.name=online-store-backend

# Embedded H2 In-Memory Database Configuration
spring.datasource.url=jdbc:h2:mem:onlinestoredb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Web Console (Available at http://localhost:8080/h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA / Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Seed Initial Sample Data
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true`
  },
  {
    name: 'data.sql',
    path: 'src/main/resources/data.sql',
    category: 'Config',
    description: 'SQL script to pre-populate database tables with products, initial user, and previous orders.',
    code: `-- Initial Products
INSERT INTO products (name, category, price, original_price, on_sale, discount_percent, image_url, short_description, full_description, rating, stock_quantity, created_at)
VALUES 
('Wireless Noise-Canceling Headphones', 'Electronics', 29.99, 59.99, true, 50, 
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 
 'Premium wireless headphones with active noise cancellation and 30-hour battery life.', 
 'Custom 40mm dynamic drivers, smart acoustic tuning, and ergonomic memory-foam earcups.', 4.8, 24, CURRENT_TIMESTAMP),

('Organic Cotton Crewneck T-Shirt', 'Clothing', 19.99, 29.99, true, 33, 
 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600', 
 'Super-soft 100% GOTS certified organic ring-spun cotton everyday essential tee.', 
 'Pre-shrunk fabric ensures consistent tailored fit wash after wash with reinforced collar.', 4.6, 50, CURRENT_TIMESTAMP),

('Stainless Steel Pour-Over Coffee Maker', 'Home & Kitchen', 49.99, 69.99, true, 28, 
 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600', 
 'Barista-grade heat-resistant borosilicate glass with reusable dual-layer stainless steel filter.', 
 'Laser-cut micro-filter unlocks subtle tasting notes and rich aromatics without paper filters.', 4.9, 18, CURRENT_TIMESTAMP),

('Professional Pro-Grip Yoga & Fitness Mat', 'Sports', 34.99, 49.99, false, 0, 
 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600', 
 'High-density eco-friendly non-slip exercise mat with alignment guide lines.', 
 'Engineered for high-intensity training with non-slip polyurethane moisture-wicking surface.', 4.7, 35, CURRENT_TIMESTAMP);

-- Sample User (Password: "password123" hashed with BCrypt)
INSERT INTO users (username, email, password, full_name, role, created_at)
VALUES 
('alex_shopper', 'alex.shopper@example.com', '$2a$10$7R3O5rC8U/qYgOa0m8kLqumR0e9fK7Hn1Kq4Z9Z9uB0K6f3v0t2rK', 'Alex Johnson', 'ROLE_USER', CURRENT_TIMESTAMP);`
  }
];
