var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app = express();
    

//Mongo Settings:
mongoose.connect("mongodb://localhost/DB4") //database path

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
  res.render("index") //renders the index page
 });



//POST ROUTE
app.post('/', function(req, res) {

    //Extracting data from the form input
    // trim is use to get rid of the extra spaces:
    var id = req.body.id.trim();
    
    
    var formData = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'address': req.body.address,
        'city': req.body.city,
        'state': req.body.state,
        'zipcode': req.body.zipcode,
    };


    //if the "id" value from the form equals empty , create  new data entry, else update the entry using ID
    if (id === "" ) {
        Form.create(formData, function (err, doc) {
            if (err) { console.log('ERROR:', err); }
            console.log('CREATED DOCUMENT:', doc);
            return res.send(doc); //make sure you get ID back from the AJAX call, inspect the source code
        });
    } else {
        
        //else if the data existed in the database, update it
        Form.update({"_id": id}, formData, function(err, doc) {
            if (err) { console.log('ERROR:', err); }
            console.log(doc);
        });
    }

});

//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER STARTED");
});
  

