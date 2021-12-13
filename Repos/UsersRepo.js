// get data from file system module using 
const { json } = require('express/lib/response');
let fs = require('fs');
// now give the related path where is our data

let FILE_PATH = './assets/users.json';

// its  a promise to me  i gve you data really
let usersRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_PATH, function (error, data) {
            // if any error occur give error either give  data
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(data));
            }
        })
    },
    // get user by id
    getById: function (id, resolve, reject) {
        fs.readFile(FILE_PATH, function (error, data) {
            // if any error occur give error either give  data
            if (error) {
                reject(error);
            }
            else {
                let users = JSON.parse(data);
                let user = users.find((u => u.id == id))
                resolve(user);
            }
        })
    },
    // insert users // post method
    insert: function (user, resolve, reject) {
        fs.readFile(FILE_PATH, function (error, data) {
            // if any error occur give error either give  data
            if (error) {
                reject(error);
            }
            else {
                let users = JSON.parse(data);
                if (user) {
                    users.push(user);
                }
                fs.writeFile(FILE_PATH, JSON.stringify(users), function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(user);
                    }
                });
            }
        })
    },
    // Update User 
    update: function (id, NewuserData, resolve, reject) {
        fs.readFile(FILE_PATH, function (error, data) {
            // if any error occur give error either give  data
            if (error) {
                reject(error);
            }
            else {
                let users = JSON.parse(data);
                // find the user with id
                let user = users.find((u => u.id == id))
                // asign the user
                if (user) {
                    Object.assign(user, NewuserData)
                }
                else {
                    let ex = new Error("User not found");
                    reject(ex)
                    return
                }

                /*  if (user) {
                      users.push(user);
                  }*/
                fs.writeFile(FILE_PATH, JSON.stringify(users), function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(user);
                    }
                });
            }
        })
    },

    // delete method for action
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_PATH, function (error, data) {
            // if any error occur give error either give  data
            if (error) {
                reject(error);
            }
            else {
                let users = JSON.parse(data);
                // find the user with id
                let index = users.findIndex((u => u.id == id));
                if (index > -1) {
                    users.splice(index, 1)
                }
                // asign the user

                else {
                    let ex = new Error("User not found");
                    reject(ex)
                    return
                }

                /*  if (user) {
                      users.push(user);
                  }*/
                fs.writeFile(FILE_PATH, JSON.stringify(users), function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve("user Deleted Successfully");
                    }
                });
            }
        })
    }
}



// export the user repo wo we can access ths on index.js using repository pattern
module.exports = usersRepo;