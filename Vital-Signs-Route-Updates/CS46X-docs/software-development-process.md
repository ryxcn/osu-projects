# Software Development Process (SDP)

Team: Vital Signs Route Updates 

Contributors: Lauren Twist, Kierra Young

CS 461: Senior Software Engineering Project

# **Principles** 



* We will respond to asynchronous communication on Discord within 24 hours, barring any unexpected emergencies or other extenuating circumstances.
* If a team member believes they cannot make a previously set deadline, they will inform the team a minimum of 24 hours in advance.
* If a member needs to be absent from a planned meeting, they will let the team know at least 24 hours before the meeting will occur.
* We will meet up every week to go over our progress for the last week and what we plan to accomplish for the next week.
* We will use Trello as a Kanban board to track tasks as they come. Work will be accomplished continuously, rather than in sprints. 
* At a minimum, the Trello backlog will always have work items ready for next two weeks.
* To avoid duplicate work, when a member takes on a task, they will immediately add themselves to the associated task on Trello.
* All changes will be developed in a separate git branch.
* Pull requests must be reviewed by at least one other team member before being merged into the main branch.
* Commit messages should be clear, concise, and descriptive.
* Pull requests should be reviewed and accepted or rejected within one week of completion.
* Tasks need to be completed over the one week between our team meetings. Any tasks that will take longer than the expected one-week time period will be broken down into smaller pieces.
* A work item will be validated by all team members and our project partners before we begin work on it. 
* A work item needs a clear description, a user story, and acceptance criteria before being worked on.


# **Process**



* On Sundays, we will ensure that the Trello board is updated: all tasks are appropriately labeled and explained, tasks are assigned appropriately, and tasks are in the correct stage of the process.
* We will use a Trello board (Kanban style) to manage our tasks, with the categories of backlog, in-progress, waiting, in review, and complete.
    * Backlog: tasks that are not currently being worked on. Labeled with color based on priority.
        * Green: high priority. Tasks that need to be completed as soon as possible.
        * Yellow: medium priority. Tasks that will need to be addressed, but aren’t immediately relevant.
        * Red: low priority or currently out of scope.
    * In-progress: tasks that are currently being worked on.
    * Waiting: tasks that are currently being worked on, but are dependent on another task being finished.
    * In review: tasks that are waiting for approval by another team member.
    * Complete: finished tasks.
* On Mondays, we will demo and review our current progress with the stakeholders.
* On Fridays, we will have a team review with our TA to discuss what we worked on last week and what we plan to work on next week.


# **Roles** 

Project Manager: Our project manager’s role is to keep the team accountable. They will manage deadlines, check on the team’s progress throughout the week, and help the team avoid blockers. They will organize and plan realistic work for members throughout the week and will ensure that our Trello board and GitHub are appropriately updated.

Product Manager: Our product manager’s role is to interface with our stakeholders. They will prepare a review of our team’s work for our stakeholders, and demonstrate our application to them. They will obtain feedback and bring it to the team, so we can make appropriate adjustments to our product.

Frontend Developer: Our frontend developer’s role is to program the user interface. They will design and implement a usable interface based on our target audience and the specifications required.

Backend Developer: Our backend developer will program the functionality and underlying operations of the application. They will work on programming the connection between the electrical communication device connected to the vital sign monitor and the web application used by hospital and ambulance personnel.

Network Security Specialist: Our network security specialist will be in charge of ensuring the safe transport of data from the ambulance to the hospital. They will need to ensure that the transport is encrypted, protected, and complies with HIPAA and other legal standards. 

 \
Data Engineer: Similarly, our data engineer will be in charge of the storage and management of the data that we are transporting. They will be in charge of ensuring our storage system complies with HIPAA laws, and that data is stored and displayed appropriately.

Our Team:



* Kierra: Product Manager, Network Security Specialist
* Lauren: Project Manager, Data Engineer
* Riley: Backend Developer
* Sarah: Frontend Developer


# **Tooling**


<table>
  <tr>
   <td><strong>Version Control</strong>
   </td>
   <td>GitHub
   </td>
  </tr>
  <tr>
   <td><strong>Project Management</strong>
   </td>
   <td>Trello
   </td>
  </tr>
  <tr>
   <td><strong>Documentation</strong>
   </td>
   <td>Google Docs, README
   </td>
  </tr>
  <tr>
   <td><strong>Test Framework</strong>
   </td>
   <td>Jest
   </td>
  </tr>
  <tr>
   <td><strong>Linting and Formatting</strong>
   </td>
   <td>Prettier
   </td>
  </tr>
  <tr>
   <td><strong>CI/CD</strong>
   </td>
   <td>GitHub Actions
   </td>
  </tr>
  <tr>
   <td><strong>IDE</strong>
   </td>
   <td>Visual Studio Code
   </td>
  </tr>
  <tr>
   <td><strong>Graphic Design</strong>
   </td>
   <td>Figma
   </td>
  </tr>
</table>



# **Definition of Done (DoD)** 



* All acceptance criteria are validated.
* Unit tests pass.
* Documentation and release notes are updated.
* Non-functional requirements are met.
* Pull request has been reviewed and merged to the main branch.
* Changes are deployed and installed in the staging environment.
* Changes are updated and under version control.
* Changes are implemented in all categories where necessary.
* Demo is prepared for the next Project Partner and TA meeting


# **Release Cycle** 



* Deploy all main branch merged pull requests to our staging environment.
* After the MVP is complete, release to production. After every term, release and deploy to production.
* Use semantic versioning Major.Minor.Patch:
    * Major: any software updates that make the program incompatible with previous versions.
    * Minor: significant feature improvements or software updates that are still backward compatible.
    * Patch: bug fixes and small updates.

Until the MVP is finished, the major version should be 0.


# **Environments**


<table>
  <tr>
   <td><strong>Environment</strong>
   </td>
   <td><strong>Infrastructure</strong>
   </td>
   <td><strong>Deployment</strong>
   </td>
   <td><strong>What is it for?</strong>
   </td>
   <td><strong>Monitoring</strong>
   </td>
  </tr>
  <tr>
   <td>Production
   </td>
   <td>Render through CI/CD
   </td>
   <td>Release
   </td>
   <td>Latest completed project release 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>Staging (Test)
   </td>
   <td>GitHub
   </td>
   <td>Pull Request
   </td>
   <td>New unreleased features, unit tests, integration tests
   </td>
   <td>GitHub Actions
   </td>
  </tr>
  <tr>
   <td>Dev
   </td>
   <td>Local (macOS and Windows)
   </td>
   <td>Commit
   </td>
   <td>Development
   </td>
   <td>N/A
   </td>
  </tr>
</table>