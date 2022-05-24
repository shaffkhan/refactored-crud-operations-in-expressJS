const { json } = require("express");
const express = require("express");
const fs = require("fs");


const { stringify } = require("querystring");
const app = express();
app.use(express.json());



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


app.get("/api/v1/tours", (req,res) =>{
    res.status(200).send("hey there from the server");
})






//all callback methods for diff http methods:///////////////////////////////////////////////
/////////////////////////////////////////////
//////////////////////////////
//////////////////////
//////////////
//////////
//////
///
//
const getAllTours = (req,res) =>{

    console.log(req.params);


    const id = req.params.id *1;

    const tour = tours.find((el) =>{
        el.id === id;
    })


if (id > tours.length){
    res.status(404).json({
        status:"failuer",
        message:"ivalid id"
    })
}



    res.status(200).json({
        status :"success",
        data:{
            tour
        }
    })
};

/////////////////////////////////////////
////////////////////////////////////////

const updateTour = (req, res) => {
    console.log(req.params.id);
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }
  
    res.status(200).json({
      status: 'success',
      data:"will update here"
    });
  };

/////////////////////////////////////////
////////////////////////////////////////

  const deleteTour =  (req, res) => {
    console.log(req.params.id);
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  };

/////////////////////////////////////////
////////////////////////////////////////


  const addNewTour = (req,res)=>{
    // console.log(req.body);

    const newid = tours[tours.length - 1]+1;
    const newtour = Object.assign({id : newid}, req.body);


    tours.push(newtour);



    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {

        res.status(201).json({

            status : "success",
            tours : tours.length,
            data :{
               data : newtour 
            } 

        });
       
    });
    
}

/////////////////////////////////////////////
//////////////////////////////
//////////////////////
//////////////
//////////
//////
///
//

//We can do even better by finding common routes, putting those routes Express’s route() method,
// and chaining multiple HTTP methods it:///////////////////////////////////////////////
/////////////////////////////////////////////
//////////////////////////////
//////////////////////
//////////////
//////////
//////
///
//

app.route("/api/v1/tours")
.get(getAllTours)
.post(addNewTour);



app.route("/api/v1/tours/:id")
.patch(updateTour)
.post(addNewTour)
.delete(deleteTour);
////////////////////////////////////
//////////////////////////////////
//////////////////////////
/////////////////////
/////////////////
//////////
//////
//

const port = 30000;
app.listen(port, () => {
    console.log('app running on port ${port}');
})