// Variables
var trainName = "";
var destination = "";
var frequency = "";
var firstTrainTime = "";
var firstTimeConverted ="";
var currentTime = "";
var diffTime = ""; 
var tRemainder = "";
var tMinutesTillTrain = "";
var nextTrain = "";


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDyLe07YaIHh8ejNrwm7eqPfWfxTrajJtc",
    authDomain: "amanda-s-project.firebaseapp.com",
    databaseURL: "https://amanda-s-project.firebaseio.com/",
    storageBucket: "amanda-s-project.appspot.com",
  };

  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function() {
  // Capture Button Click
  $("#add-train-btn").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();


 
  //Storing user inputs in my variables
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();

    
    //Moment JS Stuff
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
 
    //  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
 
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
 
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   
 
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   
  
  

  //Pushing into Firebase
  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    nextTrain: nextTrain,
    tMinutesTillTrain: tMinutesTillTrain,
   }

   database.ref().push(newTrain);



  });
  
  database.ref().on("child_added", function(snapshot) {
    
   
     
  // Log everything that's coming out of snapshot
              console.log(snapshot.val());
              console.log(snapshot.val().trainName);
              console.log(snapshot.val().destination);
              console.log(snapshot.val().frequency);
              console.log(snapshot.val().nextTrain);
              console.log(snapshot.val().tMinutesTillTrain);
              
              
        
              // Change the HTML to reflect added trains/Moment JS times
   
      $("#added-trains").append("<tr><td>" + 
      trainName + "</td> <td>" +
      destination + "</td><td>" +
      frequency + "</td><td>" +
      nextTrain + "</td><td>" +
      tMinutesTillTrain + "</td></tr>");
  
     });
    });
           
                    

    

  
  
  
            
            
            
  