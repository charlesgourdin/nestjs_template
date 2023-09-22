# NestJS Application Template

This NestJS application serves as a template for creating Nest applications. It comes pre-configured with Typescript and a PostgreSQL database using TypeORM. The template includes a USER entity and an associated service for user creation and authentication using JWT (JSON Web Tokens).

## Getting Started

To run this application, make sure you have Docker installed on your machine.
Then copy paste the `.env.sample` file as `.env` and enter the values specific to your project.

#### 1 - Build the Docker image:

```bash
  docker-compose build
```

#### 2 - Start the project:

```bash
  docker-compose up
```

#### 3 - To stop the Docker container, use:

```bash
  docker-compose down
```

## Features

- PostgreSQL Database
- TypeORM for Object-Relational Mapping
- User Entity with Authentication Service
- JWT (JSON Web Tokens) for Authentication
- Nodemail for account validation
