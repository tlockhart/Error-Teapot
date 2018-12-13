<h1 align="center">Avant</h1>
<p align="center"><kbd><img src ="./images/avant.png" /></kbd></p><br/>

Team Members: `Isaac Motley`, `Tony Lockhart`, `Nadine Hernandez`, and `Daniel Valverde`

Group Responsibilities:  All members will contribute to the JavaScript/JQuery code.  Additionally, the team will also jump in to help each other as needed.

    * Isaac: Responsible for project management and github setup. 
    * Tony: Responsible for sequelize integration of routes, db, views, authentication, and error handling.
    * Nadine: Responsible for UI and frontend design and implementation, via handlebars.
    * Daniel: Responsible for user login and authentication.

Concept: Create a virtual storefront for artists to display their gallery.  We envision this application to be an easy way for artists to manage, advertise, and sell content from their online portfolio.

- - -
1. Target audience:
    - Artists.
2. Problem the product addresses:
    - Online media sharing websites have made content sharing quick and easy.  However, many sites do not ensure that artists get compensated for their work.  This app will seek to empower artists to post and charge a fee for the use of their work. 
3. Primary goal of the product:
    - Create a platform for artists to advertise and get paid for their work.
4. The essential features of the application:
    - As an artist, I want to login to my portfolio.
    - As an artist, I want to enter a brief bio.
    - As an artist, I want to manage the content in my porfolio.
    - As an artist, I want to set the asking price of my work.
    - As an artist, I want a buyer to be able to contact me.
    - As a viewer, I want to be able to view an artist's gallery.
    - As a buyer, I want to be able to contact an artist to purchase their work.
- - -
### Demo

* https://salty-plains-27692.herokuapp.com/

### Sample Store Fronts:

* https://salty-plains-27692.herokuapp.com/display-store-front/1
- - -
### Setup
    * In order to run the app, you will need to clone this repository and install all required technologies listed below.
- - -
### Required Technologies
1. [Node.js LTS](https://nodejs.org/en/)<br/>
2. [NPM](https://www.npmjs.com/get-npm)<br/>
3. [Git & Git Bash](https://git-scm.com/downloads)<br/>
4. [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)<br/>
### NPM Modules Used
1. Connect-flash
2. Express
3. Express-Handlebars
4. Express-Session
5. Express
6. JQuery
7. MySQL
8. Passport
9. Sequelize
### Installation Steps
1. Open Bash and Clone the Avant repo
    1. git clone [repo URL]
2. Install all required technologies
3. In Bash, change the current directory to the Avant directory and install all modules from the package.json, using the following command:
    1. npm i [Enter]  
4. In Bash, change to the db directory and run the schema.sql, using the following commands:
    1. mysql -u root -p [ENTER]
    2. Enter your MySQL password [ENTER]
    3. source schema.sql [ENTER]
    5. Create a .env file in the project root, containing a database object with your MySQL database credentials. Use the following syntax:
        1. DATABASE_URL="mysql://id:password@host:mySQLPort/databaseName"
### Execute Program
1. In Bash, enter the following command in the Avant directory, to start the server.
    1. node server.js [ENTER]
2. Open your browser and type the following URL:
    1. http://localhost:3000
- - -
### Technologies Used:
    - HTML5
    - CSS3
    - Heroku/JawsDB
    - Bootstrap 4
- - -
### Design Acceptance Criteria:
1. User login Page.
2. Artist Home Page:
    - Create Gallery Icon -  Opens form for user to enter artifact urls and user information (artist name, bio, artifact title, price, thumb image, regular image).
3. Browse by Artist feature - Allows viewers to select an artists page.
4. All content should be inserted/retrieved in/from a MySQL/JawsDB Database.
5. Artist Gallery page should display user information, artifacts, and prices.
- - -
### Future Enhancements:
1. Artist contact form that will send the artist and email.
2. Integration of instant messaging APIs like twillio.
3. Buyer content request form.
4. Image upload feature.
5. Security to prevent images from being copied and used without permission.
6. Allow artists to update their listings.

