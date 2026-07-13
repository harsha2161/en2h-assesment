# API Documentation

All endpoints (unless marked as Public) require a valid JWT Bearer token in the `Authorization` header.
Format: `Authorization: Bearer <your_token>`

---

## 1. Authentication

### Register a User
- **URL**: `POST /auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "strongpassword123"
  }
  ```

### Login
- **URL**: `POST /auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "strongpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

## 2. Services Management

### Create a Service
- **URL**: `POST /services`
- **Access**: Protected (JWT required)
- **Request Body**:
  ```json
  {
    "title": "Full Car Wash",
    "description": "Exterior and interior cleaning",
    "duration": 60,
    "price": 2500.00
  }
  ```

### Get All Services
- **URL**: `GET /services`
- **Access**: Protected (JWT required)

### Get Service by ID
- **URL**: `GET /services/:id`
- **Access**: Protected (JWT required)

### Update a Service
- **URL**: `PATCH /services/:id`
- **Access**: Protected (JWT required)
- **Request Body** (All fields optional):
  ```json
  {
    "price": 3000.00,
    "isActive": false
  }
  ```

### Delete a Service
- **URL**: `DELETE /services/:id`
- **Access**: Protected (JWT required)

---

## 3. Booking Management

### Create a Booking
- **URL**: `POST /bookings`
- **Access**: Public (Customers don't need to login)
- **Request Body**:
  ```json
  {
    "customerName": "Kamal Perera",
    "customerEmail": "kamal@example.com",
    "customerPhone": "0771234567",
    "serviceId": "uuid-of-an-existing-service",
    "bookingDate": "2026-10-15",
    "bookingTime": "14:30",
    "notes": "Please hurry up"
  }
  ```

### Get All Bookings
- **URL**: `GET /bookings`
- **Access**: Protected (JWT required)
- **Note**: Returns all bookings along with their associated service details.

### Get Booking by ID
- **URL**: `GET /bookings/:id`
- **Access**: Protected (JWT required)

### Update Booking Status
- **URL**: `PATCH /bookings/:id/status`
- **Access**: Protected (JWT required)
- **Request Body**:
  ```json
  {
    "status": "CONFIRMED" 
  }
  ```
- **Valid Statuses**: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`
- **Note**: A `CANCELLED` booking cannot be changed to `COMPLETED`.

### Cancel a Booking
- **URL**: `PATCH /bookings/:id/cancel`
- **Access**: Protected (JWT required)
- **Note**: Instantly sets the booking status to `CANCELLED`.
