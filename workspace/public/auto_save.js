var timeoutID

$('form input').on('input', function() {

     clearTimeout(timeoutID) //clears windiow time out
    
    timeoutID = setTimeout(function() {
       
       // Runs evry 3 second  
        saveToDB();
    }, 1000);
});



// Serialize the form to JSON object
$.fn.serializeObject = function(){
        
     var jsonObject = {};
     var formSerializeArray = this.serializeArray(); //serialize the form
    
     // for every item in the serizalize array
      $.each(formSerializeArray, function() {
          
        if (jsonObject[this.name] !== undefined) {
                alert("UNDEFINED");
        } else {
            jsonObject[this.name] =   this.value ;
        }
    });
    //reutrn full JSON object
    return jsonObject;

    console.log(jsonObject);
};




// Save to the db usign AJAX call
function saveToDB() {
    
    var form = $("form");
    var idInput = $('#id');
     

    // AJAX call
    $.ajax({
        url: '/',                     // POST path
        type: "POST",
        data: form.serializeObject(), // serialize the form as JSON
        success: function (data) {
            // If the data is posted, show sucess message
            console.log('Successfully posted!'); 
            console.log('OBJECT ID:', data._id); 
            idInput.val(data._id); //capture POST request id
        },
        error: function (error) {
            console.log("ERROR:", error);
        }
    });

}



