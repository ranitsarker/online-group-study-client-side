# Online Study Group

## assignment_category_0001
The described project is a comprehensive online assignment management system that enables users to create, delete, update, and view assignments. Users can filter assignments based on difficulty levels and, With logging in, explore assignment details and submit assignments. The system ensures secure assignment deletion, only allowing the creator to delete and update their assignments. Upon updating an assignment, users are provided with a pre-filled form for convenience. The platform also supports assignment marking, allowing instructors to review submitted assignments, provide marks, and offer feedback. The system employs various features like modals, toasts, and private pages to enhance user experience and communication. Overall, it offers a seamless and user-friendly environment for managing, submitting, and grading assignments in an educational setting.

## Project features and functionalities:

#### 1. User Registration: 
Users can create accounts with their name, email, password, and profile photo.

#### 2.	Social Login: 
Users can log in using social platforms such as Google.

#### 3. Assignment Creation: 
Any logged-in user can create assignments with various details.

#### 4.	Assignment Deletion
Users can delete assignments they have created.

#### 5.	Assignment Update: 
Users can update assignment details, and the form is pre-filled for convenience they have created.

#### 6.	Assignment Filtering: 
Users can filter assignments by difficulty level (easy, medium, hard).

#### 7.	Assignment Submission:
Users can submit assignments with PDF link insert only not typing and add notes with typing.

#### 8: Marking System: 
Any users can mark assignments, provide feedback, and give marks.

#### 9: Status Tracking
Assignments can change status from pending to complete after marking. For that two different database collections are working. If each assignment is complete that will show my assignment page and at the same time that same assignment will be removed from the submitted assignment page those were in pending status.

#### 10:User-Friendly Interface:
The system offers a user-friendly interface with toast messages and models for a better user experience.

#### 11: JWT validation:
JWT verifyToken generates when login and when the user logout that token is removed automatically from the browser cookie.



### Note: Important GitHub commits:
#### Client side:
* install react-router, tailwind, and daisy ui
* The registered user can log in now and also make login, register toggle
* onAuthStateChanged setup done
* Google login setup and also react hot tost setup
* password validation added for register page, for login error message handling
* I have posted the assignment to the database with the current user and showed the client side
* A private route has been created
* make a validation that only createdBy user can update the assignment and if another user can't update they will get the error message
* I have created one assignment submission page with one form and that form data and user email address I have added in database.
* I have set code for creating assignments with react data picker for due date and collecting users from * auth provider and sent current user and form data to database assignments collection main
* shown submitted assignment from database summited collected user by user with status
* givemark page was created and added code so each submitted assignment information shows and also one form for marking
* when clicking on the submit button from GiveMark page that assignment will complete my completed collection and other hand that same assignment will be removed from my submitted collection and also show data from the completed collection to my assignment page.
* I have fixed the completed assignment showing user-wise
* I have added a pdf preview system in the submitted assignment page and only .pdf and google drive pdf can sent and no type-only link insert
* I have changed the created user approach to the async function and also worked on updateProfile so now the user photoUrl will show in the navbar also I have cleared the register form value after submit
* I have created one component for the difficulty level assignment shown on the home page
* In all assignment page, I have added Pagination, per page 4 products will show
* The delete button redirects to login when without login anyone will click on the delete button of the created assignment
* assignment card page I have added one loading state and show one loading icon
* farmar-motion animation added
* Added pagination at home page also

I have a total of 57 commits. I have tried to give all those them are meaning full. 

### Live URL: https://online-group-study-be2ef.web.app/
