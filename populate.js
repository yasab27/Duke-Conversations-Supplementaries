// This unit test script will automatically populate the database super fast with data in
// order to save developer time

let axios = require("axios")
let faker = require('faker');

const URL = "https://dukeconvo.herokuapp.com"

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomTimeStamp()
{
  min = Date.now() + 604800000
  max = Date.now() + 604800000 + 604800000
  return Math.random() * (max - min) + min;
}

////////////////////////////////////////
/// POST NEW PROFESSOR TO DB
function postProfessor(){
  axios.post(URL+ '/professor/register',
      {
        uniqueID: getRandomInt(999999).toString(),
        firstName: faker.name.firstName(),
        lastName:faker.name.lastName(),
        genderPronouns: getRandomInt(2),
        department: getRandomInt(10),
        title: faker.name.title(),
        school: getRandomInt(2),
        email:faker.internet.email()
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getProfID(){
  try {
    let res = await axios.get(URL+"/professors");
    profID = res.data[getRandomInt(res.data.length)].uniqueID;
    return profID;
  }
   catch (err) {
       console.error(err);
  }
}

// POST NEW DINNER TO THE DATABASE
async function postDinner(){

  // Get all professors
  let randomProfessorID = await getProfID();

  // console.log("ID: " + randomProfessorID);

  axios.post(URL+ '/dinner/register',
      {
        timeStamp: getRandomTimeStamp().toString(),
      	topic: faker.commerce.product(),
      	description:faker.lorem.sentence(),
      	studentLimit: getRandomInt(40),
      	address: faker.address.streetAddress(),
      	dietaryRestrictions:faker.lorem.words(),
      	professorID:randomProfessorID
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}


// POST NEW STUDENT TO THE DATABASE
function postStudent(){
  axios.post(URL+ '/student/register',
      {
      	netID: getRandomInt(999),
      	uniqueID: getRandomInt(999999),
      	firstName: faker.name.firstName(),
      	lastName: faker.name.lastName(),
      	genderPronouns: getRandomInt(2),
      	phoneNumber: faker.phone.phoneNumber(),
      	major: getRandomInt(10),
      	graduationYear: getRandomInt(2030)
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getDinnerID(){
  try {
    let res = await axios.get(URL+"/dinners");
    profID = res.data[getRandomInt(res.data.length)].id;
    return profID;
  }
   catch (err) {
       console.error(err);
  }
}

async function getStudentID(){
  try {
    let res = await axios.get(URL+"/students");
    profID = res.data[getRandomInt(res.data.length)].netID;
    return profID;
  }
   catch (err) {
       console.error(err);
  }
}

// POST new applications to random dinners with random existing students
async function postApplication(){

  // Get random dinner IDs and Students IDs from the database
  let randomDinnerID = await getDinnerID();
  let randomStudentID = await getStudentID();
  // console.log("ID: " + randomProfessorID);
  console.log(randomDinnerID);
  console.log(randomStudentID);
  axios.post(URL+ '/application/register',
      {
        interest: faker.lorem.paragraph(),
      	studentID: randomStudentID,
        dinnerID: randomDinnerID
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

////////////////////////////////////
// PRINT ALL USERS IN THE DB
function printUsers(){
  axios.get(URL+"/users")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// PRINT ALL DINNERS IN THE DB
function printDinners(){
  axios.get(URL+"/dinners")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// PRINT ALL PROFESSORS IN THE DB
function printProfessors(){
  axios.get(URL+"/professors")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function printApplications(){
  axios.get(URL+"/applications")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//////////////////////////////////////
// printDinners();
// postProfessor();
// printProfessors();
// postDinner();
// postDinner();
var prompt = require('prompt');

 //
 // Start the prompt
 //
 console.log("Please input the amount of new objects you wish to create:");
 prompt.start();

 prompt.get(['newprofs', 'newstudents', "newdins", "newapps"], function (err, result) {
   //
   // Log the results.
   //
   console.log('Command-line input received:');
   console.log('  New Professors To Create: ' + result.newprofs);
   console.log('  New Students to Create: ' + result.newstudents);
   console.log("  New Dinners to Create: " + result.newdins);
   console.log("  New Dinners to Create: " + result.newapps);

   for(var i = 0; i < result.newprofs;i++){
     postProfessor();
   }
   for(var i = 0; i < result.newstudents;i++){
     postStudent();
   }
   for(var i = 0; i < result.newdins;i++){
     postDinner();
   }
   for(var i = 0; i < result.newapps; i++){
     postApplication()
   }

 });
