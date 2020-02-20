# MiniProject-Node-and-Express-
Building a course page with facilities like listing the courses, adding courses and faculties, enabling students to register and choose faculties, search faculties, search courses, displaying the details of the students who have registered under a particular course to the admin.

The home page(http://localhost:3004/home) goes with an attractive background along with a caption- Modeling Excellence. The page is made colourful using pug templates and css. A side navigator bar(menu) is made to help user navigate to view courses, subscribe to courses, search courses and faculties, add courses.

http://localhost:3004/course : List courses with a short description beneath it. Provides the option for the students to register for courses along with an option to choose their faculty. It provides the admin to have a look at the details of the students registerd for a course. The details are displayed in the form of a table

Course registration: A registration form is made. The details of the student is entered and the faculty chosen. The details are submitted and written into a csv file using post method.

Add courses: A form to add on courses is made. The faculties are also added at the same time. the form is submitted using post method and the data is stored in a file.

The faculties menu displays all faculties. The user is provided the option to search for a particular faculty and the details including the contact number and email id of the faculty is displayed.


Modules used:
Express: web application framework
fs: file systems(reading,writing,appending)
csv-parser: processing csv files
util: utility module
csv-write-stream:
body-parser: parse the content of the body on submission of the form

Concepts used:
Express fraework used to create the web application
The app starts a server and listens on port 3004
Routing: app.get(url) and app.post() are used 
Query string or url parsing: urls are parsed using req.query['coursename'] and the information is passed onto the .pug file
req.body is used to look into the data submitted. req.body.attributename is used to extract specific attribute values from the body.
Data is read asynchronously using the readFile command. 
data is appended onto a file using appendFile function. 
All similar functions are grouped together in a separate file and exported using the exports keyword. the exported function are included in the main file using require. the functions are called when necessary.
Promises and callbacks: The consumer code should wait for the producer code to produce data and for it to execute fully. Inorder to decide the order of execution of codes and make the consumer code wait for the producer code to complete, we use promises. the .then method is executed. Multiple .then() methods are used so as to execute code in succession. .then methods shall return values too.
Templates : pug template is used to add more color and aesthetic sense to the web page. The .pug file can be deployed in the web page using res.render(filename). Data is also passed to the .pug file.

Files used:
courses.txt: contains the names of the courses
description.txt: contains the description of the course
faculties.txt: contains the details of the faculties along with the course he/she is handling
out.csv: contains the details of the registered students along with the enrolled course
main.js: Handles get and post methods for routing. calls the necessary functions
file.js: Similar functions are grouped together in this file and exported.

.pug files:
page.pug: provide html content for the home page. page4.pug is included/referred here.
page4.pug: provides html and css for side navigation bar(menu).
page6.pug: Lists courses using div tag.
page7.pug: Registration form for students to enroll in courses of their choice.
page8.pug: Details of students registered in a particular course are displayed in the form of a table.
page9.pug: Form to add new courses and faculties.
page10.pug: Faculty details are displayed using div tag. users can search for any particular faculty.

