# Vital Signs Product Requirements 

Team: Vital Signs Route Updates 

Contributors: Sarah Carricaburu, Rylie Chen, Lauren Twist, Kierra Young

CS 461: Senior Software Engineering Project

# **1. Problem Description**

During patient transport, ambulances are unable to efficiently communicate patient’s vital signs to hospitals, leading to poorer patient outcomes. Hospitals are typically only notified of a patient’s vital signs 5 minutes before arrival; as a result, they are unable to properly prepare medications, blood, and other materials they may need before the patient arrives.


## **1.1 Scope**

In this project, we will be working to create an application that safely and securely transports vital signs to hospitals every minute. In other words, our priorities are interfacing with existing ambulance medical technology, transporting patient data (heart rate, blood pressure, temperature, and breath rate) while complying with HIPAA, and creating a hospital-side app that displays information in a way that is readable and easy to use. Stretch goals include adding back-and-forth communication options for hospital staff and the ambulance, adding a live stream for patient data (rather than ~ one-minute pings), and interfacing with hospital organization systems for efficient staff assignment.


## **1.2 Use Cases**

A patient is in a highly traumatic accident, and their vital signs are changing rapidly. The ambulance staff begin communication through the app at the beginning of the 15-minute ride to the hospital. The hospital staff can use the vital signs to prepare the correct amount of blood before the patient is in the hospital, leading to faster treatment.

This case can be ethically tested in two parts: through transporting sample data from the application to the hospital and getting feedback on whether its form would be usable, and through reading live vital signs from patients and checking whether the output is usable for providers.

Ambulance staff are transporting a patient through a very bumpy and inconsistent road, which makes radio communication difficult. The app can transport patient vitals to the hospital, meaning the ambulance staff can focus more on temporary treatment and stabilization.

This case can be tested by seeing how effectively our app runs in different environmental conditions (weather, lower cellular access, difficult roads, etc.)


# **2. Purpose and Vision (Background)**

Our purpose is to develop an app to standardize ambulance-hospital communications and improve patient outcomes. We want to provide an easy-to-use user interface that will allow providers to see, at a glance, the vital signs of a patient being transported over the entire ambulance ride. Hospital and ambulance staff are already under a significant amount of pressure at their jobs; we want to create an app that will remove the need for person-person communication of vital signs, allowing both sides to focus more on treating the patient.

Currently, vital signs are communicated around five minutes out from the hospital by the ambulance staff. This communication can be unreliable due to driving conditions; difficult roads mean that EMTs may be unable to focus on communicating information. Furthermore, highly unstable signs may be complex to communicate, and it can be difficult to judge exactly what treatments need to be prepared at the hospital. The five-minute timeline does not provide sufficient time for hospital staff to prepare some treatments; certain blood transfusions, for example, can take up to 45 minutes to prepare. These minutes can be the difference between life and death for a patient in critical condition.


# **3. Stakeholders**

**Project Partners: Mike Dramatologist and Jerry Young**

Our project partners need to be updated fairly regularly: every once a week at the beginning of the project, and likely every two to three weeks as the development process begins. They will require progress updates on how far we are on the application, any major roadblocks we’ve encountered, and what our next steps will be. They are decision-makers, and we will need to communicate with them to decide exactly what the application will look like, what features should be prioritized, and any other major decisions about the application. Mike is also the expert in our group on hospital operations, and any user interface decisions will need to be approved by him. Small-scale team decisions, such as who will work on what part of the project, the structure of our team, and our personal organization, do not need to go through them. For informed decision-making, we will need to collectively decide on a reasonable project scope and decide what we will accomplish over the next few terms.

**Users**

Users will only need to be updated once we have an MVP available for testing. They will only need updates after major updates or changes to our product that change how it operates or performs. They will not have direct decision-making control, but their feedback on our application will influence the features and development of our application. To give informed feedback on our product, they will need information on the features and scope of our application, and the progression of our development.

**Engineering team**

Our team is one of the stakeholders of the project, and we will need to have strong communication skills and consistently update each other on our progress: likely, this will lead to once-a-week team meetings or other formal communications. To make informed decisions, we will need updates on everyone’s respective development progress, what tasks the team members will be working on next, and any blocks resulting from other members’ work. We will also need information from our project partners on what features they want us to prioritize. We are decision-makers for micro-decisions, such as our development environment, team systems, etc., but the main look and features of the application will be decided by our project partners. We do have some control over the features, as we can communicate features that may be unreasonable or overly difficult for us to develop, and what we believe would be beneficial to focus on instead. However, final decisions will likely still be decided by our partners. 

**OSU Capstone Support Staff**

OSU Capstone support staff, such as TAs, will also need weekly updates. They will require progress updates on the app that demonstrate how well our team is working together and how much we’ve accomplished. Similar to users, they will not have a direct decision-making impact, but their advice on our team structure and project organization will be beneficial for our team.

**Hospital IT Staff and Management**

Hospital IT staff and management will be in charge of purchasing and implementing our system. As a result, their needs will need to be considered through the development of our app. Similar to users, they will not have direct decision-making control over the app; however, we will need to research to see what pricing, features, etc. will make this app appealing to purchase and use.


# **4. Preliminary Context**


## **4.1 Assumptions**

We and the ECE team will be able to interface with existing medical devices to obtain vital signs.

We can develop a web app that works across all mobile platforms and for computers.

We will be able to use a library or function to encrypt patient data and send it over the network to hospitals.

Users will be willing to test our product and offer feedback once our MVP is developed.

We will be able to develop an MVP of our product over the three terms of capstone that we have.


## **4.2 Constraints**

We need to ensure that patient data is stored safely and securely. We need to avoid violating HIPAA; we will need to research medical data laws and regulations. 

We are a small team, and it may not be realistic for us to complete the entire application due to the short timeline. We have discussed the project with our partners, and have decided on a realistic timeline for the project.

Our application will need to interface with the design that the ECE team builds, which will also need to interface with healthcare vital sign technology. As such, the ECE team’s prototype may need to be built or clearly defined before we can begin work on the ambulance side of the application.


## **4.3 Dependencies**

We are dependent on the ECE team to interface with existing medical devices to transport data.

We are dependent on access to a cellular network to transport patient data. We will likely rely on existing network libraries to create a connection, which will require documentation access and information.

We need access to a hospital or other secure database to store patient vital signs and information.

If we are integrating with any existing hospital applications, we will be dependent on access to those apps to develop our interface.

We are relying on hospitals being willing to test an MVP design, to understand what should be changed or further developed.

We are relying on getting the security and encryption portion of the work done early, as tests cannot be completed until we are handling patient data safely.


# **5. Market Assessment and Competition Analysis**

**Ambulance Staff Communication**

Currently, EMTs communicate patient vital signs to the hospital around five minutes before they arrive at the hospital. However, this is much slower and less consistent than our method would be and also requires active communication. This method can also be disrupted due to road conditions or verbal miscommunications.

**IoT Proposed Ambulance Data Transfer System**

This is very similar to our work and accomplishes the majority of what our app was aiming to do. However, there was only a proof of concept completed in 2018. Since then, it appears that there have been no further updates, and the program is not open-source, so we cannot use it as a basis for our application. However, their resources and information may be beneficial.

**Early Warning Scores Research **

Research on ambulance vital signs reading has made mortality and case severity predictions much more accurate, meaning our application may be less necessary. However, predicting one set of vitals is still difficult, and it does not remove the preparation time necessary for medication.

These technologies are the most directly competing with our application; however, we may need to do more research to see if any other alternatives exist.


# **6. Target Demographics (User Persona)**

Jason is a 20-year-old EMT who works in San Francisco, where many of the roads are in poor condition. As such, he often faces difficulty in clearly communicating patient vital signs to hospitals, due to poor road quality and disruption.

Emily is a 41-year-old emergency clinic technician, whose role is to prepare blood and medications for incoming ambulance transports. She is often frustrated by the lack of communication through the transition process and is frustrated by the short turnaround time and rush to obtain materials.

Amber is a 32-year-old ER attending who uses the ambulance’s vital signs to prepare the hospital for incoming patients. She is frustrated by the difficulty that comes from predicting volatile patients with only a short subset of their vital signs.


# **7. Requirements**


## **7.1 User Stories and Features (Functional Requirements)**


<table>
  <tr>
   <td><strong>User Story</strong>
   </td>
   <td><strong>Feature</strong>
   </td>
   <td><strong>Priority</strong>
   </td>
   <td><strong>GitHub Issue</strong>
   </td>
   <td><strong>Dependency</strong>
   </td>
  </tr>
  <tr>
   <td>As an EMT, I want to be able to automatically send data to the hospital, without having to utilize a radio to communicate vitals.
   </td>
   <td>Interface with Vital Signs Systems
   </td>
   <td>Must Have
   </td>
   <td>TBD
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>As a physician, I want to be able to check the vital signs progression of a patient in transport quickly and easily.
   </td>
   <td>Hospital App Interface
   </td>
   <td>Must Have
   </td>
   <td>TBD
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>As a hospital administrator, I want to be confident that patient data is stored and transported securely from the ambulance to the hospital.
   </td>
   <td>Secure Transport and Encryption
   </td>
   <td>Should Have
   </td>
   <td>TBD
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>As a physician, I want to be able to view a current live stream of patient vital signs from the ambulance.
   </td>
   <td>TBD
   </td>
   <td>Could Have
   </td>
   <td>TBD
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>As an EMT, I want to be able to add notes to a patient's information through the app and send it over with their vital signs.
   </td>
   <td>N/A
   </td>
   <td>Will Not Have
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>As a technician, I want to be able to view treatment requests through the application, to obtain clearer written instructions.
   </td>
   <td>N/A
   </td>
   <td>Will Not Have
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
</table>



## **7.2 Non-Functional Requirements**



* The product should work on multiple devices with multiple screen sizes, including tablets, desktops, and mobile devices.
* The product should comply with relevant patient data protection regulations and guidelines, such as HIPAA. This requires an encryption level of security level 4.
* The system should notify hospital staff and EMTs should data fail to be transmitted or should it be corrupted during transport.
* The product should always be online and accessible, excluding scheduled maintenance.
* The product should have a less than 30-second startup and connection time.
* The code should be well-documented, standardized, and clear, with effective comments.
* The product should be easily understandable by 90%+ of users within 5 minutes of using the application (directions included).
* The product should be scalable, with adding new users being relatively cheap and simple; more research will be needed to determine a reasonable number for this requirement.
* The application will need to be robust to support up to 40% more than the average number of users, to account for holidays, large emergencies, etc.


## **7.3 Data Requirements**

The product will need to store the vital signs of patients before sending them across the network. Most of these signs—blood pressure (systolic and diastolic), heart rate, temperature, respiration rate, and blood oxygen level—can be stored in flat numbers which makes them simple to store and send. Patient information also needs to be stored including name and date of birth. We’ll use a relational database to structure our data, organizing vital sign information under individual patient names.


## **7.4 Integration Requirements**

We will need to integrate with the ECE team’s product, which will interface with existing ambulance vital sign monitors. Their product will connect to these monitors, and our software (running on their product) will zip the data and preprocess it for sending. It will then encrypt the data and send it to the hospital-side application, which will decrypt the data and display it for providers to use. 

We may also need to interface with existing healthcare databases to store the patient information we obtain. We will utilize existing network and encryption libraries to send data through.


## **7.5 User Interaction and Design**

Our design needs to be easy to read and understand at a glance, with all the information immediately available. These apps are used in emergencies; any difficulty with locating or understanding can cause unnecessary slowdowns, which may put patients at risk. Below is a mockup of what our apps look like on the EMT side and the hospital side.



![alt_text](images/image3.png "image_tooltip")



# **8. Milestones and Timeline**

**Fall Term:**



* Mid-Late October: Finalize product requirements with project partners. Officially define necessary features, scope, and stretch features.
* Late October: Define team roles and responsibilities. Place current goals in the team Trello board or other organizational system. Set up a GitHub repository and any other team management tools and systems.
* Early November: Begin product development on the web application, network system, and database.
* Early December: Complete initial development and begin product testing on the web application, network system, and database. 
    * Web Application (Front and Backend): Sarah, Rylie
    * Network System and Database: Kierra, Lauren

**Winter Term:**



* Late December-Early January: Begin integration of all three components: network system, database, and web application. 
* Late February: Successfully read data from the EMT electronic interface created by the ECE team. 
* Early March: Finalize all aspects of secure data transport to the hospital side of the application. Work on displaying data in the hospital application in an effective format for physicians.

**Spring Term:**



* Early April: Test basic application in a variety of environments. Work on finalizing UI for EMT and hospital applications. Obtain user feedback on whether the application is clear and easy to use.
* Early May: Complete MVP application. Work on the presentation and finalize any minor details.
* Early June: Present at Capstone Fair.


# 


# **9. Goals and Success Metrics**


<table>
  <tr>
   <td><strong>Goal</strong>
   </td>
   <td><strong>Metric</strong>
   </td>
   <td><strong>Baseline</strong>
   </td>
   <td><strong>Target</strong>
   </td>
  </tr>
  <tr>
   <td>Product-Market Fit
   </td>
   <td>How much of a positive impact has this application had on your daily tasks?
   </td>
   <td>&lt; 40% say it has had a moderate or higher positive impact
   </td>
   <td>> 40% say it has had a moderate or higher positive impact
   </td>
  </tr>
  <tr>
   <td>Usability
   </td>
   <td>How confident do you feel in your understanding of this application after using it for 5 minutes?
   </td>
   <td>&lt; 50% say they had moderate or above confidence in utilizing the application in the future
   </td>
   <td>> 50% say they had moderate or above confidence in utilizing the application in the future
   </td>
  </tr>
  <tr>
   <td>Treatment Time
   </td>
   <td>Speed of treatment of a patient before and after using the application.
   </td>
   <td>&lt; 5-minute difference between using the application and not using the application.
   </td>
   <td>> 5-minute difference between using the application and now using the application.
   </td>
  </tr>
</table>



# **10. Out of Scope**

Some goals are unrealistic for us to accomplish in our time frame. We will likely not be able to create a full live-streamed data system for ambulance-to-hospital communication. Additionally, unless our development timeline is sped up significantly, we are also going to be unable to fully test our application before the spring; furthermore, we will not be able to fully test the application due to safety and security laws. In addition, we will likely be unable to create back-and-forth communication due to the interface constraints of the device attaching to the vital signs systems. Due to HIPAA laws, a lack of access to testing, and the timeline for the project, interfacing with hospital systems is also out of scope for this project.