# Employee Management System

## Introduction

The Employee Management System is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows you to manage employees, supervisors, and their hierarchical relationships.

### Prerequisites

- Node.js: Make sure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
- MongoDB: Provide a connection string to a MongoDB instance.

### Installing Dependencies

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/KeenanFernandes2000/employee-supervisor
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
DB_URL=ENTERYOUR_MONGODB_URL
```

Adjust the values according to your preferences and MongoDB setup.

## Usage

Start the server:

```bash
cd backend
npm run dev
```

Start the client (in a separate terminal window):

```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to access the Employee Management System.
