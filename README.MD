# Docker Project

## Author Patryk Zawadzki

This project is based on Docker Compose and runs a complete environment consisting of several services:

- **Frontend**: The frontend of the application runs by default on port 80 using nginx.
- **Backend**: An application built with ASP.NET that supports a chat feature and CRUD API. It runs by default on port 5076.
- **BackendGo**: An application written in Go that displays information about containers and provides control. It runs by default on port 8080.
- **Redis**: A service used to store chat messages, running by default on port 6379.
- **SQL Server**: A SQL Server database that stores data for the CRUD application, running by default on port 1433.

The main goal of the project is to provide a way to manage Docker containers through a web interface, support real-time chat using Redis, and create a simple CRUD application.

## Technologies Used

The project uses the following technologies and tools:

- **Docker**: A tool for containerizing applications and services.
- **Docker Compose**: A tool for managing multiple Docker containers with a single configuration file.
- **ASP.NET**: A framework for building web applications using C#.
- **Go**: A programming language used in the `backendgo` service.
- **Redis**: An in-memory database used as a cache.
- **SQL Server**: A relational database management system.

## Running the Project

### 1. Prerequisites

Before running the project, make sure you have installed the following:

- Docker
- Docker Compose

### 2. Configuration

1. Copy the `.env.example` file to `.env`.
2. Update the variables in the `.env` file if necessary.

### 3. Running the Project

Navigate to the project's root directory and run the following command to start the environment:

```bash
sudo docker-compose up --build
```

### 4. Stopping the Project

To stop all running services, use the following command:

```bash
sudo docker-compose down
```
