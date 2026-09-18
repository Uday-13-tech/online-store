-- Pre-populated Products
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

-- Sample User (alex_shopper / password123)
INSERT INTO users (username, email, password, full_name, role, created_at)
VALUES 
('alex_shopper', 'alex.shopper@example.com', '$2a$10$7R3O5rC8U/qYgOa0m8kLqumR0e9fK7Hn1Kq4Z9Z9uB0K6f3v0t2rK', 'Alex Johnson', 'ROLE_USER', CURRENT_TIMESTAMP);
