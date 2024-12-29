# School Management System

## Our Repository
https://github.com/mariusokoto/Node-project

## Our Team
- Marius Léorat : mariusokoto
- Eve Pineau : evepineau
- Arthur Puissilieux : Arturo1s

**We chose to create a web application for managing school operations efficiently. It's the continuation of our Software Engineering.**


## Project Structure
- **frontend/** : Contains the Angular code for the user interface.
- **backend/** : Contains the NodeJS code for the server-side logic.

## Postgres SQL
We have created the tables on pgadmin4:
<img width="268" alt="Capture d’écran 2024-12-29 à 19 39 58" src="https://github.com/user-attachments/assets/83dd6591-472c-4617-87a6-dfedd9a00645" />

### Swagger OpenAPI html page
We have generated a Swagger OpenAPI html page in the backend in order to have all the rest apis for our project. Unfortunately we did not have time to finish our school management software therefore some apis from some tables are missing. 

![Capture d’écran 2024-12-29 à 19 39 00](https://github.com/user-attachments/assets/138d667e-1d51-4fe1-a814-6caaa48d7911)


![Capture d’écran 2024-12-29 à 19 44 02](https://github.com/user-attachments/assets/3587ff34-f14c-48ac-bd2b-8f33662bdfe5)


### Backend
Based on the visible structure of the backend in your project:

#### Backend Directory Structure
1. src/:  
   - config : Contains configuration files ( database connection, creation of tables).  
   - controllers/: Contains the logic for handling API requests and responses.  
   - routes: Holds API route definitions, mapping URLs to specific controller methods.  

2. Key Files in src/:  
   - app.ts: Initializes and configures the Express application.  
   - server.ts: Starts the server and listens on a defined port.  
   - swagger.ts: Contains the setup for generating and serving API documentation using Swagger UI and OpenAPI specifications.


### Frontend
1. src/:  
   - app/:  
     - auth/: Manages authentication-related components (login).  
     - student/: Handles student-specific features and UI.  
     - app.component.ts: Root component logic for the application.  
     - app.routes.ts: Defines navigation and routing for the app.  

2. Key Files in src/:  
   - index.html: Entry point HTML file for the Angular application.  
   - main.ts: Bootstraps and initializes the Angular app.  
   - styles.css: Contains global styles for the application.  


### Frontend Application 

We wished to develop an admin, student and teacher dashboard but only had time to implement the admin dashboard. 
The user has to connect with email and password. If the user is an admin he gets to go to the admin dashbord where he can visualize the students displayed with ag-grid and the distribution of students per major in a pie chart with HighCharts. 

![Capture d’écran 2024-12-29 à 22 29 08](https://github.com/user-attachments/assets/1a2c7550-23a5-458d-8b70-b87f3dc819bc)



![Capture d’écran 2024-12-29 à 20 11 31](https://github.com/user-attachments/assets/0eeab751-638a-4cd1-b671-bbfbed8eadeb)



![Capture d’écran 2024-12-29 à 20 11 39](https://github.com/user-attachments/assets/e3de6282-83b1-4e8a-8e20-e938b1695536)



### Endpoints


![Capture d’écran 2024-12-29 à 21 57 50](https://github.com/user-attachments/assets/493beb0c-4ee1-4fae-98c8-fec944ce0a3d)


<img width="582" alt="Capture d’écran 2024-12-29 à 23 29 03" src="https://github.com/user-attachments/assets/85eba3f3-6165-474d-a31f-e1d5d7ca68df" />



