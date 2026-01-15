# Employee Management System

A full-stack web application for managing employee records, built with Node.js, Express, React, and PostgreSQL.

## Features

- **Dashboard**: View all active employees in a clean, responsive interface.
- **Search**: Search employees by Name, Email, Department, or unique ID.
- **CRUD Operations**: Create, Read, and Update employee details.
- **Soft Delete**: Mark employees as "INACTIVE" instead of permanent deletion.
- **Form Validation**: Type-safe forms with real-time validation and unique email checks.
- **Polished UI**: Built with Tailwind CSS and Framer Motion for smooth animations.

## Tech Stack

- **Frontend**: React, Wouter (Routing), TanStack Query (Data Fetching), Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL with Drizzle ORM.
- **Validation**: Zod (Shared schemas).

## Setup & Local Development

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd employee-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file or set the following in your environment:
   ```env
   DATABASE_URL=postgres://user:password@host:port/database
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/employees` - List all active employees
- `GET /api/employees/:id` - Get specific employee details
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Soft delete an employee

## License

MIT
