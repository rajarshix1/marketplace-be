# Ecommerce API

## ERD
User <---- Cart 1-1
User <---- Order 1-N
Category <---- Product 1-N
Product <---- Order 1-N
Cart <---- Product 1-N

## Setup

1. npm install
2. create .env with MONGO_URI and password
3. npm run seed - creates admin, users, categories, products
4. npm start

admin email: admin@example.com
password: from .env


## Scope of improvement

Stricter input validation
Duplicate order prevention
Refresh token mechanism
Multiple items in single order
Search functionality in orders/products
Unit tests
API documentation
Logging system

## Note
Attaching postman collection instead of example request/response. please add base_url, and accessToken as variable. 
Please use mongodb atlas for running. Local mongodb doesn't support session(used in place order)