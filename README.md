# Avant

Team Members: `Isaac Motley`, `Tony Lockhart`, `Nadine Hernandez`, and `Daniel Valverde`

Group Responsibilities:  All members will contribute to the JavaScript/JQuery code.  Additionally, the team will also jump in to help each other as needed.

    * Isaac: Responsible for project management and github setup. 
    * Tony: Responsible for sequelize integration of routes, db, views, and authenticatio.
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
# Demo

* https://salty-plains-27692.herokuapp.com/

# Sample Store Fronts:

* http://localhost:3000/display-store-front/1
* http://localhost:3000/display-store-front/2
- - -
### Technologies Used:
    - Libraries:
        - Connect-flash
        - Express
        - Express-Handlebars
        - Express-Session
        - Express
        - JQuery
        - MySql
        - Passport
        - Sequelize
    - HTML5
    - CSS3
    - Heroku/JawsDB
 
 ### Requirements:
 *Create a .env file in the root with your local MySQL credentials.  Use the following syntax:
    - DATABASE_URL="mysql://userId:password@localhost:3306/avant_db"
- - -
### Design Acceptance Criteria:
1. User login Page.
2. Artist Home Page:
    - Create Gallery Icon -  Opens form for user to enter artifact urls and user information (artist name, bio, artifact title, price, thumb image, regular image).
3. Browse by Artist feature - Allows viewers to select an artists page.
4. All content should be inserted/retrieved in/from a MySql/JawsDB Database.
5. Artist Gallery page should display user information, artifacts, and prices.
- - -
### Future Enhancements:
1. Artist contact form that will send the artist and email.
2. Integration of messages APIs like twillio for instant messaging.
3. Buyer content request form.
4. Image upload feature.
5. Security to prevent images from being copied and used without permission.
6. Allow artists to update their listings.

