var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    // jsdom = require('jsdom'),
    app = express();
    

//Mongo Settings:
mongoose.connect("mongodb://localhost/database") //database path

//App settings:
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Mongodb Schema
var formSchema = new mongoose.Schema({
    
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
  res.render("index") //renders the index page
});



//POST
app.post('/', function(req, res) {

    //Extracting data from the form input
     var firstName = req.body.firstName;
     var lastName  = req.body.lastName;
     var address   = req.body.address;
     var city      = req.body.city;
     var state     = req.body.state;
     var zipcode   = req.body.zipcode;
     
     var newForm  = {
         firstName:firstName, 
         lastName:lastName,
         address:address,
         city:city,
         state:state,
         zipcode:zipcode
        };

    //Adding to the database
    Form.create(newForm, function(error, post) {
        console.log("data added");
    });

});




//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER STARTED");
});
  

