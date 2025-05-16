## Project Overview

VividHands is a curated e-commerce marketplace designed to connect skilled artisans with buyers who appreciate unique, handcrafted products. The platform is built with a **React.js** frontend, offering a dynamic and responsive user interface styled with **Bootstrap** for seamless user experience. The backend is developed using **Spring Boot**, providing RESTful APIs, secure authentication with JWT, and robust business logic. Data is stored in a **MySQL** database, which manages products, users, and orders efficiently. Together, these technologies create a secure, scalable, and user-friendly environment that celebrates authentic craftsmanship and ethical shopping.

---

## How to Run the Project

### Prerequisites
- Java JDK 11 or above
- Maven (if not using the bundled wrapper)
- Node.js and npm
- MySQL server installed and running
- MySQL database created for the project

### Backend Setup (Spring Boot + MySQL)

1. **Configure Database:**  
   Update the MySQL connection settings in `backend/src/main/resources/application.properties` or `application.yml`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/vividhands_db
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update

2.Run the Backend Server:
Open a terminal, navigate to the backend folder, and execute:

./mvnw spring-boot:run
This will start the backend API server on http://localhost:8080.

3.Frontend Setup (React.js + Bootstrap)
Install Dependencies:
Open a new terminal, navigate to the frontend folder, and run:

npm install
Start the Frontend Server:
After dependencies install, start the React development server:

npm start
The frontend will launch in your default browser at http://localhost:3000.
