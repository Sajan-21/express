const { success_function, error_function } = require('../utils/responseHandler');
const users = require('../db/models/models');

exports.addUser = async function (req, res) {

    let datas = req.body;
    console.log("datas : ", datas);

    console.log("name : ", datas.name);
    let name = datas.name;
    console.log("name : ", name);
    let regExpName = /^[a-z]+[a-z]$/i;
    let resultName = regExpName.test(name);
    if (resultName === false) {
        console.log("enter valid name");
    }

    console.log("email : ", datas.email);
    let email = datas.email;
    console.log("email : ", email);
    let regExpemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let resultemail = regExpemail.test(email);
    if (resultemail === false) {
        console.log("enter valid email");
    }

    let salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(datas.password, salt);

    let password = hashed_password;
    console.log("password : ", password);

    let userData = {
        name,
        email,
        password
    }

    if (resultName === true && resultemail === true) {
        if (!(email === await users.findOne({ email }))) {

            await users.create({userData})
                .then((message) => {
                    console.log('message : ', message);

                    let response = success_function({
                        statusCode : 201,
                        message : "user created successfully"
                    });
                    res.status(response.statusCode).send(response);
                    return ;
                    
                })
                .catch((error) => {
                    console.log("error : ", error);
                    
                    let response = error_function({
                        statusCode : 400,
                        messagr : "user creation failed"
                    });

                    res.status(response.statusCode).send(response);
                    return ;
                });

        } else {

            console.log("email already exists...");

            let response = error_function({
                statusCode : 400,
                messagr : "eamil already exists"
            });

            res.status(response.statusCode).send(response);
            return ;

        }

    } else {

        let response = error_function({
            statusCode : 400,
            messagr : "validation failed"
        });

        res.status(response.statusCode).send(response);
        return ;

    }

}

