# EN2H Assessment - Service & Booking Management API

## Project Overview
This project is a RESTful API built with **NestJS**, **TypeScript**, and **TypeORM**, backed by a **PostgreSQL** database. It provides a comprehensive solution for managing services, user authentication (via JWT), and a robust booking system. 

**Key Features:**
- **User Authentication**: Secure user registration and login utilizing JSON Web Tokens (JWT).
- **Service Management**: Full CRUD operations for managing business services (Protected routes).
- **Booking Management**: Customers can easily book services (Public API), while authenticated users can manage, update statuses, and cancel these bookings.
- **Validation & Business Logic**: Prevents past-date bookings, validates service existence, and enforces strict status transition rules (e.g., preventing a cancelled booking from being completed).

## Installation Steps
1. Clone the repository.
2. Ensure you have **Node.js** (v16 or higher) installed.
3. Install the project dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory of the project and include the following keys:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_DATABASE=booking_db

# JWT Configuration
JWT_SECRET=super_secret_key_for_en2h_project_2026
JWT_EXPIRES_IN=1d
```

## Database Setup
1. Ensure you have **PostgreSQL** installed and running on your machine.
2. Create a new database that matches the `DB_DATABASE` variable in your `.env` file (e.g., `booking_db`).
3. The application is currently configured to use TypeORM's `synchronize: true` (ideal for development). Upon starting the server, TypeORM will automatically create the required database tables (`users`, `services`, `bookings`) and establish their relationships.

## Running the Application
To start the application in development mode with hot-reloading:
```bash
npm run start:dev
```
The API will be available at `http://localhost:3000`.

## Running Migrations
Currently, the project uses `synchronize: true` in the TypeORM configuration for rapid development, which auto-syncs the schema. 
For a production environment, you should disable `synchronize` in `database.module.ts` and use TypeORM migrations. 
To generate and run migrations manually (once properly configured in `ormconfig`):
```bash
# Generate a new migration based on entity changes
npm run typeorm migration:generate -- -n MigrationName

# Run pending migrations
npm run typeorm migration:run
```

## API Documentation

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login and receive a JWT Bearer token.

### Users (`/users`) - *Requires JWT Bearer Token*
- `GET /users` - Retrieve all registered users.
- `GET /users/:id` - Retrieve a user by their ID.
- `PATCH /users/:id` - Update user details.
- `DELETE /users/:id` - Delete a user account.

### Services (`/services`) - *Requires JWT Bearer Token*
- `POST /services` - Create a new service.
- `GET /services` - Retrieve all available services.
- `GET /services/:id` - Retrieve a specific service by ID.
- `PATCH /services/:id` - Update service details.
- `DELETE /services/:id` - Remove a service.

### Bookings (`/bookings`)
- `POST /bookings` - Create a new booking. **(Public Endpoint)**
- `GET /bookings` - Retrieve all bookings. **(*Requires JWT*)**
- `GET /bookings/:id` - Retrieve a booking by ID. **(*Requires JWT*)**
- `PATCH /bookings/:id/status` - Update a booking's status (`PENDING`, `CONFIRMED`, `COMPLETED`). **(*Requires JWT*)**
- `PATCH /bookings/:id/cancel` - Cancel a booking (Sets status to `CANCELLED`). **(*Requires JWT*)**

## Assumptions Made
- **Authentication Rules**: It is assumed that creating a booking does not require an account to reduce friction for customers. However, managing those bookings (Viewing, Updating, Cancelling) requires administrative or authenticated access.
- **Database Choice**: PostgreSQL is the chosen relational database.
- **Date/Time Handling**: `bookingDate` is stored as a standard date string and `bookingTime` as a time string. Timezone conversions are assumed to be handled by the client or operate in the server's local time.
- **Environment**: The `synchronize` flag is left `true` assuming this project is in an assessment/development phase. 

## Future Improvements
- **Role-Based Access Control (RBAC)**: Implement strict roles (e.g., `ADMIN`, `CUSTOMER`) so standard users can only view/cancel their own bookings, while admins have global access.
- **Pagination and Filtering**: Add query parameters to `GET /services` and `GET /bookings` to handle large datasets efficiently.
- **Email Notifications**: Integrate a mailing service (e.g., Nodemailer or SendGrid) to automatically notify customers when their booking status changes or is confirmed.
- **Production Migrations**: Fully configure TypeORM CLI migrations for safer production deployments instead of relying on auto-synchronization.
- **API Swagger Documentation**: Integrate `@nestjs/swagger` to provide an interactive UI for testing APIs directly from the browser.
