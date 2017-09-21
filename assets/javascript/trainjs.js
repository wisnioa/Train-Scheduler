//Train Script
 

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDyLe07YaIHh8ejNrwm7eqPfWfxTrajJtc",
    authDomain: "amanda-s-project.firebaseapp.com",
    databaseURL: "https://amanda-s-project.firebaseio.com",
    storageBucket: "amanda-s-project.appspot.com",
  };



 
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var nextArrival = "";
  var frequency = 10;

  // Capture Button Click
  $("#add-train-btn").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

  
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    nextArrival = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
     name: trainName,
     destination: destination,
     arrival: nextArrival,
     frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });



  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
        
              // Log everything that's coming out of snapshot
              console.log(snapshot.val());
              console.log(snapshot.val().sv.trainName);
              console.log(snapshot.val().sv.destination);
              console.log(snapshot.val().sv.frequency);
              console.log(snapshot.val().sv.nextArrival);
              
        
              // Change the HTML to reflect
              $("#train-name-display").html(sv.trainName);
              $("#destination-display").html(sv.destination);
              $("#frequency-display").html(sv.frequency);
              
        
           
                    

                // Handle the errors
            }, function(errorObject) {
              console.log("Errors handled: " + errorObject.code);
            });
// Assumptions
 //var tFrequency = 3;
 
     // Time is 3:30 AM
    // var firstTime = "03:30";
 
     // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
 
     // Current Time
     //var currentTime = moment();
     //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     //var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     //console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
 
     // Minute Until Train
     //var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // $("#min-away-display").html(tMinuesTillTrain);
 
     // Next Train
     //var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     //$("#next-arrival-display").html(nextTrain);


    