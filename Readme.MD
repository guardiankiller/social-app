# Social App

## Definition
The Social App is an application to create, comment and like posts of your friends and family:
 - Login & Register a user
 - Edit user information
 - Profile page
 
## Preview images

<img src="https://github.com/guardiankiller/social-app/blob/maiu/preview/viber_image_2025-01-26_22-51-39-662.png?raw=true" width="800"/>
<img src="https://github.com/guardiankiller/social-app/blob/main/preview/viber_image_2025-01-26_22-51-48-958.png?raw=true" width="800"/>
<img src="https://github.com/guardiankiller/social-app/blob/main/preview/viber_image_2025-01-26_22-52-37-172.png?raw=true" width="800"/>
<img src="https://github.com/guardiankiller/social-app/blob/main/preview/viber_image_2025-01-26_22-52-51-344.png?raw=true" width="800"/>

## App Details
- This app is written in `Spring Boot`. It uses `Spring Security` for authentication. Authentication is with JWT 
  tokens.
- The backend uses `Spring Data JPA` with `Liquibase` and it uses a `MySQL` database.
- Input data is automatically validated with `Hibernate validator` and custom validations are included.
- Exports metrics using `Spring Actuator`.
- The `frontend` is built with `Angular`.
- `Gradle` manages the `Node.js` environment for the `frontend` part.
- The final `jar` file is a `fat jar` and `Gradle` embeds the generated `html`, `css` and `js` files from the `vite 
build`.
- The `fat jar` is bundled in a `docker image` and the image is published to `Github` packages with `Github Actions`.
- Included `CI/CD` using `Github Actions`.

## RESTful API
The following endpoints are supported:

`Users` endpoints:
  - `POST /api/users?dryRun=true|false` - Adds additional roles to the user
  - `GET /api/users` - lists users
  - `GET /api/users/:useername` - Retrieves a single user given their username
  - `PUT /api/users/:useername` - Updates the user information based on the provided information
  - `DELETE /api/users/:useername` - Deletes the user given their username
  - `POST /api/users/:useername/roles` - Adds additional roles to the user
  - `DELETE /api/users/:useername/roles` - Removes roles from the user

`Authetication` endpoints:
 - `POST /api/auth` - generates an access token

## Requirements
- IntelliJ IDEA (optional)
- Java 17
- MySQL database server with movies-social-app empty database

## Setup
```dtd
set db_password=softuni
set db_username=root
set db_url=jdbc:mysql://localhost:3306/movies-social-app (if the database server is on localhost:3306 and has movies-social-app skip this env)
gradlew bootRun
```

- Start the frontend dev server (gradle way)
```dtd
gradlew :frontend:ngServe
```

- Start the frontend dev server (npm way)
```dtd
cd frontend
env.bat
npx ng serve
```