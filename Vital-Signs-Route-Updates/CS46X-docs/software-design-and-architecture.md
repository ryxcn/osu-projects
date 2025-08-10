# Software Design and Architecture

Team: Vital Signs Route Updates 

Contributors: Sarah Carricaburu, Rylie Chen, Lauren Twist, Kierra Young

CS 461: Senior Software Engineering Project

# Introduction 

The Vital Signs Route Update project aims to create a mobile-accessible web application. This application will facilitate the real-time transmission of patient vital sign updates from ambulances to Emergency Room staff, which allows hospitals to better understand the history of a patient and prepare appropriate treatment. Our system architecture needs to ensure that our software is secure, aligned with the hospital’s needs and medical legal guidelines, reliable, to account for 24/7 use, scalable, to account for the large number of users, and robust, to handle errors. Our architecture will ensure that (1) we can effectively scale the program after we build the initial product, (2) we can securely store and transport patient data, and (3) that our system can recover from errors well and does not run into unexpected downtime.


# Architectural Goals and Principles 

Our architecture key objectives include security, integration with existing medical technology, scalability to accommodate large amounts of data, and reliability. Ensuring the security of patient data is critical, leading to the principles of separation of concerns and minimal coupling, with the network, database, and website being managed separately. Interconnected systems have a higher risk of patient data leakage in the event of unexpected errors. By separating them, we ensure that the medical interface avoids direct access to the network to prevent leaks of unencrypted patient data. Guided by the modularity architectural principle, the application separates vital sign transmission into a number of distinct parts. This allows flexibility and easy modifications without disrupting the entire system. Additionally, our architecture prioritizes usability, efficiency, and reliability. These goals aim to provide a user-friendly experience for medical personnel and maintain reliable data transmission. 


# System Overview 


![alt_text](images/image1.png "image_tooltip")


There are three primary components: the network system, the web application, and the database. The medical device information reader will be a physical device that reads data from the vital sign monitor onboard the ambulance. The network system will then transmit the patient data to the web application, monitored by medical staff, and the database, storing patient and doctor information. 


# Architectural Patterns 

Our chosen architectural patterns are client-server, circuit breaker, and event sourcing. The client-server architecture will be beneficial because the central system will stabilize the system and help to secure the database. We’re likely to have lots of users sending information from many different locations; a central location will make it easier to manage the information that the server receives and handle it appropriately. The circuit breaker pattern will ensure that our data is transported safely. The networks in which our information is being transmitted may be unstable or unreliable depending on the ambulance’s location. Having an intermediary to appropriately route the data around hazards ensures that the data will reach its location safely. Finally, the event sourcing pattern will be beneficial since our application uses real-time data. Our database will serve as the event store in this system; providers (ambulance applications) will send data to the database accessible by consumers (hospital users).


# Component Descriptions 

**Medical Hardware Interface:** Interfaces with existing medical technology to transform patient data into a usable format for our network and user interface applications. The software runs on a physical device (built by the ECE team) that attaches to existing hardware.

**Network:** Transmits data from the ambulance to the hospital database and the hospital side of the application. Needs to be secure and appropriately encrypted to comply with legal standards.

**User Interface (Hospital/Ambulance):** Handles user interactions from both the hospital side and the ambulance side. Displays patient vital signs in a usable and readable format. Informs users of the systems’ uptime and whether or not it is functioning properly.

**Database:** Securely stores and manages patients’ vital signs and doctor information in a long-term relational database for future use.


# Data Management 

Information will be stored and managed in an encrypted relational database, with the object relationships shown below. Create and update actions will be done automatically through the integrated application, while read and delete will occur manually, from the hospital-side user interface.



![alt_text](images/image2.png "image_tooltip")



# Interface Definitions

Our system will use a REST API, as it is simpler and lightweight to use, isolates each request, and is generally better for web application development. While our application will be built as a web app, it is likely to run on phones and other devices. As a result, REST will make our setup quicker and will allow us to scale up faster. 

**Authenticating Users**

This will require a login screen, a method of storing usernames and passwords, and a way of authenticating a login. This will require a POST request, to send the information to the server. The request is sent from the user to our main server.

**Sending Patient Data**

This will require a POST request, to send information over the network to the database. The request is automatically sent by the application to the main database or server.

**Storing Patient Data (Database)**

This will require POST requests, to insert patient information into the database. This request is received from the ambulance-side application.

**Displaying Patient Data**

This will require GET requests, to fetch and display the history of a patient’s vital signs. This request is sent from the hospital-side application to the relevant database.


# Considerations 


## Security 

There are three primary security risks: authenticating users of the hospital and ambulance applications, sending patient data over the network, and storing patient data within a database. For authentication, we will require a username and password with length and complexity requirements. The login information will be sent over TSL to the main network, to ensure that it is not read by outside sources or leaked, as that would pose a security risk. We may also implement different privileges for different roles; for example, someone who exclusively works in an ambulance doesn’t need to read patient data from the application, since they would have local access to it. This reduces the number of users that can access HIPAA-protected data and thus reduces the amount of risk. The authentication process also allows us to track which users access what data, which allows authorities to deal with inappropriate access.

For transmitting patient data, we will use TSL to ensure that the information is encrypted and cannot be read by outside sources. The handshake process ensures that data is being sent to the correct location, and the data integrity check ensures that data is sent correctly, which minimizes the risk of error and the risk of information leaks. This protocol is common, reasonably easy to implement, and makes sense for the program and the type of information that we are dealing with.

Lastly, for storing patient data, we will need to store information within an encrypted database. HIPAA requires physical, technical, and administrative protections for patient data. We will use an encrypted database to protect patient data from unauthorized access, login credentials to authenticate users, audit logs to track database access, and data backups to secure the data.


## Performance

**Speed of Response**

Our application needs to be able to send information quickly across a network. To do this, we will ensure that data is sent efficiently; data will be zipped before being sent to reduce the load on the network. Additionally, we will use a load-balancing mechanism to distribute network traffic across multiple servers, thus reducing the load on any one server. This ensures that information is routed in the most efficient way possible which also accounts for server load.

**Scalability**

Our application needs to scale well in order to serve a large number of users. We can accomplish this in a few parts: first, by using REST sending to send data efficiently over the network. This will reduce the total amount of load over the network and make it easier to add more users. Load balancing will also play a role as if data is routed effectively, we can reduce the amount of server usage on any one server. Additionally, we will need to invest in a large central server; finding efficient ways to store data will allow us to reduce the cost of this server.

**Availability**

Our application needs to be available over a wide location and be available at all times excluding scheduled maintenance. Solutions for this include redundant databases for storing information, automated failure replacement systems for servers and networks, and software-defined infrastructure, such as virtual servers and systems. We will also need to implement a reasonable recovery time objective for the software.


## Maintenance and Support 

Our project partner Mike Dramatologist will be taking ownership of the project after we complete our work. He has enough computer science knowledge to understand most of our work and has connections within hospitals to sell the program to. Our system for maintenance and support will depend primarily on how far we get on the application. If there is enough demand, and if some of the integration limitations can be handled, Mike plans to eventually monetize the project after we pass it off to him. He will likely hire another computer science and electrical engineering team to continue the development of our work; however, it is unclear exactly what this team will look like (size, experience, etc.) or what skills they will have. To facilitate this takeover, we will provide appropriate documentation on all aspects of our code, the server systems that we used, our research, and any other relevant materials for the project.

If we progress far enough during the school year, we will likely begin to beta test our application in a low-stakes environment, with fake patients and emergencies. This will allow us to collect user feedback and adjust the application to better fit their needs. Through our development and user testing, we can develop a user manual that answers common questions and provides a clear guide for setting up, integrating, and utilizing our application.


# Deployment Strategy 

To start, our application will likely be developed exclusively on local servers, as the project does not have the funding for large-scale servers or testing. This means that we will use a local database for testing, and create two local users (one client and one server) to test the network portion of our application. Our application needs to run on a variety of devices; thus, we will use a variety of virtual machines to test our project. Once a basic version of the application is functioning, we will likely use a blue-green deployment system: we will test the new system (blue) while the old system (green) continues to run for current users. Once the system has been appropriately tested, we will swap to the new system. If any issues arise, we can roll back to the old system, which we know is functioning.

We know that the UI app will need to run on a variety of devices; as a result, we should make the application relatively lightweight, with minimal storage and memory requirements. Since the majority of information within the app will be stored in an online database, we do not expect to run into issues with storage. The initial database will be managed through AWS Amazon Relational Database Service which provides a free version for twelve months with 750 hours on single instance databases, 20 GB of general purpose storage (SSD), and 20 GB of storage for automated database backups per month. Eventually, the relational database will need to scale to a larger database to manage the amount of patient information that we plan to receive.


# Testing Strategy 

**Unit Tests**

Unit tests are small tests meant to test the functionality of individual pieces of code. All other pieces of code related to the unit test will be modeled or mocked appropriately.



* User Interface (Local)
    * Users can enter information into the UI and submit it.
    * Data is correctly displayed on the UI and appropriately formatted.
* Network (Local, Client-Server)
    * A secure connection can be made between two points on the network. The connection and information are encrypted, and data cannot be read through the connection.
    * Information from the sending users is encrypted before being sent over the network.
    * Information on the receiving side can be successfully decrypted and read.
* Hardware Reader (Local)
    * The device appropriately formats and packages data to be sent.
    * The device appropriately signals when it is on, off, or inactive.
* Database (Database Server)
    * CRUD commands correctly create, upload, fetch, and delete formatted patient data to or from a database.

**Integration Tests**

All of these tests will occur in a test environment that mimics the live environment. The appropriate client-server relationships should all functionally mimic what the live version of the application will look like.



* User Interface and Network
    * Check that information entered on the user interface (e.g., a login) is successfully sent to the network.
* Network and Database
    * Test whether information sent over the network successfully reaches the hospital database and whether information that reaches the database is successfully uploaded (CRUD tests).
* Hardware and Network
    * Test whether information read from the hardware (patient vital signs) successfully reaches the network.

**Regression Tests (Local, Client-Server)**



* Will be used to ensure that new features or bug fixes do not break any previous functionality. These will likely need to be manually tested.

**System Tests (Local, Virtual Machine)**



* Used to test how our code functions on a wide variety of machines and devices.

**Acceptance Tests (Local, Client-Server)**



* Used to test whether or not our code successfully achieves the functionality described in the requirements.


# Glossary 



* UI/UX: User Interface and User Experience
* TSL: Transport Layer Security
* REST: Representational State Transfer
* API: Application
* CRUD: Create, Read, Update, Delete
* HIPAA: Health Insurance Portability and Accountability Act
* CI/CD: Continuous Integration and Continuous Delivery/Deployment