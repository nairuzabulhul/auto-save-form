var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    // jsdom = require('jsdom'),
    app = express();
    

//Mongo Settings:
mongoose.connect("mongodb://localhost/DB4") //database path

// var db4 = mongoose.connect("mongodb://localhost/DB4") //database path

//App settings:
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Mongodb Schema
var formSchema = new mongoose.Schema({
  user_id:String,
   firstName:String,
   lastName:String,
   address:String,
   city:String,
   state:String,
   zipcode:String,
});

//Model the Schema
var Form = mongoose.model("Form", formSchema);


//Routing 

//GET
app.get("/", function(req,res){
    // var ObjectId = "57977c851beba4e113524b0c";
  res.render("index") //renders the index page
 });



//POST ROUTE
app.post('/', function(req, res) {

    //Extracting data from the form input
    var id = req.body.id.trim() === '' ? null : req.body.id; 
    // var id = req.body.id.trim();
    
    


    var formData = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'address': req.body.address,
        'city': req.body.city,
        'state': req.body.state,
        'zipcode': req.body.zipcode,
    };

    if (id === null ) {
        Form.create(formData, function (err, doc) {
            if (err) { console.log('ERROR:', err); }
            console.log('CREATED DOCUMENT:', doc);
            return res.send(doc);
        });
    } else {
        Form.update({"_id": id}, formData, function(err, doc) {
            if (err) { console.log('ERROR:', err); }
            console.log(doc);
        });
    }

});





   

//  Form.find({"_id":id}, function(err, foundData){
     
//     //  console.log("FOUND DATA",foundData); 
//     var createID = foundData[0]._id.toString();
//     console.log(createID, foundData);
//     console.log(id);
    
//     console.log('createID TYPE:', typeof(createID));
//     console.log('id TYPE:', typeof(id));
    
//     if(createID === id){
//         console.log("exists")
//     }else{
//         console.log("does not exist")
//     }
    
//  });


//     var update = {
//         "firstName":firstName
//     }

//  Form.update({}, update, {upsert: true}, function(err, upatedData) {
 
//  console.log(upatedData)
//   // raw will contain updatedExisting and the inserted item _id (if applicable)

     
//  });



// });
//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER STARTED");
});
  

