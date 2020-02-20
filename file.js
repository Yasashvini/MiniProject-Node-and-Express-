const fs=require('fs');
const csv = require('csv-parser');


function append(file,data)
{
    fs.appendFile(file, data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
}
function read_csv(course_name)
{
var usr_details=[];
//const promise=new Promise((resolve,reject)=>{
fs.createReadStream('out.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log(course_name);
      if(row.Course==course_name)
      {
        usr_details.push(row);
        console.log(usr_details);
      }

    })
    return usr_details;
//})

//return promise;
}
exports.append=append;
