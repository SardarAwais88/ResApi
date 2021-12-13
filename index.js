let express = require('express');
const { param } = require('express/lib/request');
const usersRepo = require('./Repos/UsersRepo');

let app = express();

// let we have to define the route


let router = express.Router();
// now we import userrepo to acces that data
//let usersRepo = require('./Repos/UsersRepo'); // we just provide the path of user
// we need to recieve the data inside the body method
app.use(express.json());
app.use('/api/', router);

//now use the userrepo.get method


// now define router grt method
// now this get method will called by 
//default when you run your application


// read operation returnng array data


router.get('/', function (req, res, next) {

    // get data f
    usersRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message": "users data fetched successfully",
            "data": data
        });

    }, function (err) {
        next(err);
    });
});

// get by id
router.get('/:id', function (req, res, next) {

    // pass the id
    let id = req.params.id;
    // get data id
    usersRepo.getById(id, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message": "users data fetched successfully",
            "data": data
        });

    }, function (err) {
        next(err);
    });


});

// Create Users
router.post('/', function (req, res, next) {

    // pass the id
    //  let id = req.params.id;
    // get data id
    usersRepo.insert(req.body, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message": "users data fetched successfully",
            "data": data
        });

    }, function (err) {
        next(err);
    });


});

// update user // put for update user 
router.put('/:id', function (req, res, next) {

    // pass the id
    //  let id = req.params.id;
    // get data id
    usersRepo.update(req.params.id, req.body, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "Updated",
            "message": "users data Updated successfully",
            "data": data
        });

    }, function (err) {
        // next(err);
        // we can use this 
        res.status(404).json({
            "status": 404,
            "statusText": err.message,
            "error": err.message,

            "data": err
        });

    });
});


// delet users

router.delete('/:id', function (req, res, next) {

    // pass the id
    //  let id = req.params.id;
    // get data id
    usersRepo.delete(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "deleted",
                "message": "users with id" + req.params.id + "Deleted successfully"

            });
        }
        else { }
    }, function (err) {
        // next(err);
        // we can use this 
        res.status(404).json({
            "status": 404,
            "statusText": err.message,
            "error": err.message,

            "data": err
        });

    });
});
app.listen(5000, function () {
    console.log("app running on http://localhost:5000");
});


