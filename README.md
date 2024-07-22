# Rent-A-Car Frontend

## Description

This is the frontend application for the Rent-A-Car project, developed with React, TypeScript, and Vite. This application allows users to interact with the backend API to manage car reservations, view reservation details, and perform other related operations.

## Technologies Used

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Vite](https://vitejs.dev/) - A fast build tool that provides a development environment and build optimizations.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nicolascarrica/rent-a-car-front.git
    ```

2. Navigate to the project directory:
    ```bash
    cd rent-a-car-front
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Configure environment variables. Create a `.env` file in the root of the project and add the following variables:
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api/v1
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

### Available Features

- **View Reservations:** List all reservations with details.
- **View Reservation Details:** See details of a specific reservation.
- **Create a New Reservation:** Form to create a new reservation.
- **Edit a Reservation:** Form to update reservation details.
- **Delete a Reservation:** Option to delete a reservation.

### Screenshots

#### Home Page

![Home Page](./images/home-page.png)

#### Reservation Details

![Reservation Details](./images/reservation-details.png)

#### Create Reservation Form

![Create Reservation Form](./images/create-reservation-form.png)

#### Edit Reservation Form

![Edit Reservation Form](./images/edit-reservation-form.png)

## Project Structure

The project follows a standard React structure with functional components and TypeScript types. Here’s an overview of the project structure:


