var timeoutID

$('form input').on('input', function() {

     clearTimeout(timeoutID) //clears windiow time out
    
    timeoutID = setTimeout(function() {
       
       // Runs evry 3 second  
        saveToDB();
    }, 3000);
});

//Save to the db usign AJAX call
function saveToDB() {
    
    //save to db message
    console.log('Saving to the db');
    
    var form = $("#form");
    
    //AJAX call
    $.ajax({
        url: '/',    //POST path
        type: "POST",
        data: form.serialize(), //serialize the form as JSON
        success: function (data) {
              //if the data is posted, show sucess message
            console.log('Successfully posted!');  
        },
        error: function (error) {
            console.log("ERROR:", error);
        }
    });
 }
