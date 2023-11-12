# Employee Management System

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Employee Management System is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows you to manage employees, supervisors, and their hierarchical relationships.

## Installation

### Prerequisites

- Node.js: Make sure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
- MongoDB: Install MongoDB and ensure it is running on your local machine or provide a connection string to a MongoDB instance.

### Installing Dependencies

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

Install server-side dependencies:

```bash
cd backend
npm install
```

Install client-side dependencies:

```bash
cd frontend
npm install
```

### Setting Up Environment Variables

Create a `.env` file in the `backend` directory and set the following environment variables:

```plaintext
PORT=3001
=ENTERYOUR_MONGODB_URL
```

Adjust the values according to your preferences and MongoDB setup.

## Usage

Start the server:

```bash
cd backend
npm start
```

Start the client (in a separate terminal window):

```bash
cd frontend
npm start
```

Open your browser and navigate to `http://localhost:3000` to access the Employee Management System.

## API Endpoints

- **GET /api/employees**: Get a list of all employees.
- **POST /api/employees**: Create a new employee.
- **PUT /api/employees/:id**: Update an employee.
- **DELETE /api/employees/:id**: Delete an employee.
- **GET /api/viewHierarchy/:employeeName**: View the hierarchical structure for a specific employee.

