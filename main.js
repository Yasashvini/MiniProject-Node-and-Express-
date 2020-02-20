const csv = require('csv-parser');//include the csv-parser module
const os=require('os');//include the os module
var file=require('./file'); //include the other file to appends on data  
const fs = require('fs');//include the fs module to perform file operations
const util = require('util');//includes utility module
const readFile = util.promisify(fs.readFile);//Takes a function following the common error-first callback style, i.e. taking a (err, value) =>  callback as the last argument, and returns a version that returns promises.
var express=require('express'); //include the express framework to performtasks related to web application
var app=express();
var arr=[]; //temporary array for storing each line from the courses.txt (contains the details of the courses)
var arr1=[]; //temporary array for storing each line from the description.txt
var arr2=[];   // temporary array for storing the values obtained after splitting each row of faculty.csv using delimiter , 
var staff=[];// temporary array for storing the values obtained after splitting each row of faculty.txt using delimiter , 
var staff_details=[];
var csvWriter = require('csv-write-stream'); //writing and appending data to csv
var writer = csvWriter({sendHeaders: false});
var csvFilename = "out.csv";
// If CSV file does not exist, create it and add the headers
if (!fs.existsSync(csvFilename)) {
    writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream(csvFilename));
    writer.write({
    //headers of the out.csv file
      header1: 'Name',
      header2: 'Course',
      header3: 'Address',
      header4:'Phone',
      header5:'Email',
      header6:'Zip',
      header7:'Faculty'
    });
    writer.end();
  } 
//Routing: 
app.get('/home',function(req,res){
    res.render('page');
})

app.set('view engine','pug');//specify the template to use
app.set('views','./views');//defaults to the views directory in application's root directory
//This responds with a side navigation bar available in page4.pug with menus
app.get('/index',function(req,res){
    //res.render to load a .pug view file
    res.render('page4');
})

app.set('view engine','pug');
app.set('views','./views');
//This responds with a list of all available courses
app.get('/course',function(req,res)
{   
    readFile("./courses.txt")
    //the .then function executes after the successful completion of the previous statement
    .then((data)=>{
        arr = (data.toString()).split("\n");
        return arr;
    })
    .then((arr)=>{
    readFile("./description.txt")
    .then((data)=>{
        arr1 = (data.toString()).split("\n");
        //send data to html page
        res.render('page6',{
            sub:arr,
            des:arr1
        });
    })    
    })
})

//responds with a form to add course
app.get('/addCourse',function(req,res)
{
    res.render('page9.pug');
})

//responds with a form to register for a particular course
app.get('/course/register',function(req,res)
{
    
    readFile("./faculty.txt")
    // .then is executed after the completion of the previous statement
    .then((data)=>{
        arr2=data.toString().split("\n");
        var j=0;
        for(var i=0;i<arr2.length-1;i++)
        {
            staff=arr2[i].split(',');
            console.log(req.query['coursename']);
            if(staff[0]==req.query['coursename'])//query dtring parsing
            {
                staff_details[j]=staff[1];
                j++;
            }
        }
        res.render('page7',{
        subj:req.query['coursename'],
        fac_details:staff_details  
    })         
    })
    })
    
//include the body parser module to parse the content of the body on submission of form 
var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({
 extended:false})
 )

 //Post: Regiter student to a course. on successful registration registration successful is printed on the screen
app.post('/reg-sub',function(req,res){
    console.log(req.body.faculty)
    // Append some data to CSV the file    
    writer = csvWriter({sendHeaders: false});
writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
writer.write({
    header1: (req.body).name,
    header2:(req.body).course,
    header3:(req.body).addr,
    header4: (req.body).phn,
    header5:(req.body).email,
    header6: (req.body).zip,
    header7: (req.body).faculty
});
writer.end();
res.render('page7',{
    
    fac_details:staff_details ,
    message:"Registration successful"});
});

//post:A new course is added by the admin. Details from the form are appended to their respective files
app.post('/add_course',function(req,res){
    var emails=[];
    var phns=[];
    var facs=[];
    //Append data to the respective files
    file.append('courses.txt',req.body.name+os.EOL);
    file.append('description.txt',req.body.des+os.EOL);
    file.append('faculty.txt',req.body.name+","+req.body.fac+os.EOL);
    facs=(req.body.fac).split(',');
    emails=(req.body.email).split(',');
    phns=(req.body.phn).split(',');
    for(var i=0;i<emails.length;i++){
        file.append('faculties.txt',facs[i]+','+emails[i]+','+req.body.name+','+phns[i]+os.EOL);
    }
    res.render('page9',{
        message:"The course has been added successfully!!!"
    })
})

//Responds with the list of students who had enrolled to a particular course
app.get('/course/display',function(req,res){
readFile('./out.csv')
    .then((data)=>{
        return data.toString();
    })
    .then((data)=>{
        var users=[];
        var usr_details=[];//array of objects having fields name,phn,email,faculty
        var obj={};//object for temporary storage
        var user=[];
        users=data.split('\n')
        for(var i=0;i<users.length;i++)
        {
            user= users[i].split(',');
            //parse the url or query string
            if(req.query['coursename']==user[1])
            {
                obj={
                name:user[0],
                phn:user[3],
                email:user[4],
                faculty:user[6]
            }
            usr_details.push(obj);//add the object into the array user_details
        }
        }
        res.render(('page8'),{
            details:usr_details
        })
    })
});

//provides an option to search for a particular faculty form a list
app.get('/faculty',function(req,res)
{//reads the content of favulrirs
    readFile('./faculties.txt')
    .then((data)=>{
        return data.toString();
    })
    .then((data)=>{
        var facs=[];
        var fac_details=[];
        var obj={};
        var fac=[];
        facs=data.split('\n')
        for(var i=0;i<facs.length-1;i++)
        {
            fac= facs[i].split(',');
            
                obj={
                name:fac[0],//name
                phn:fac[3],//phone 
                email:fac[1]//email
            }
            fac_details.push(obj);
        }
        //send faculty details to the .pug page
        res.render('page10',{
            faculty_details:fac_details
        })
        })
})
app.listen(3004);