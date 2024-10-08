const user_types = require('../db/models/user_types');
const users = require('../db/models/users');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/send-email');
const fileUpload = require('../utils/file-upload').fileUpload;
const email_template = require('../utils/email-templates/setPassword').resetPassword;
const dotenv = require('dotenv');
dotenv.config();

exports.createUser = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

        let name = req.body.name;
        console.log("name : ", name);

        let email = req.body.email;
        console.log("email : ", email);

        let age = req.body.age;
        console.log("age : ", age);

        function generateRandomPassword(length) {
            let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
            let password = "";
            
            for(var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random()*charset.length);
                password += charset.charAt(randomIndex);
            }
            return password;
        }

        var randomPassword = generateRandomPassword(12);
        console.log("random password : ",randomPassword);

        await sendEmail(email, "password created", email_template);

        let image = req.body.image;

        if (!name) {

            let response = error_function({
                statusCode: 400,
                message: "Name is required",
            });

            res.status(response.statusCode).send(response);
            return;
        }

        if(image) {
          let img_path =  await fileUpload(image,"users");
          console.log("img_path : ", img_path);
          body.image = img_path;
        }

        let salt = bcrypt.genSaltSync(10);
        console.log("salt : ", salt);

        let hashed_password = bcrypt.hashSync(randomPassword, salt);
        console.log("hashed_password : ", hashed_password);

        let count = await users.countDocuments({ email });
        console.log("count : ", count);

        if (count > 0) {
            let response = error_function({
                statusCode: 400,
                message: "User already exists",
            });

            res.status(response.statusCode).send(response);
            return
        }

        body.password = hashed_password;
        console.log("body : ", body);

        let user_type = await user_types.findOne({user_type : req.body.user_type});
        body.user_type = user_type._id;
        
        let new_user = await users.create(body);

        if (new_user) {

            let response = success_function({
                statusCode: 201,
                message: "User created successfully",
            });

            res.status(response.statusCode).send(response);
            return;
        } else {

            let response = error_function({
                statusCode: 400,
                message: "User creation failed",
            })
            res.status(response.statusCode).send(response);
            return;
        }

    } catch (error) {
        console.log("error : ", error);


        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong",
        })

        res.status(response.statusCode).send(response);
        return;
    }
}

exports.getAllUsers = async function (req, res) {
    try {
        let usersData = await users.find();
        console.log("usersData : ", usersData);

        let response = success_function({
            statusCode: 200,
            data: usersData,
            message: "Users fetched successfully",
        });

        res.status(response.statusCode).send(response);
        return;

    } catch (error) {
        console.log("error : ", error);

        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong",
        })

        res.status(response.statusCode).send(response);
        return;
    }
}

exports.getSingleUser = async function (req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);

        let userData = await users.find({ _id: id });
        console.log("userData : ", userData);

        let response = success_function({
            statusCode: 200,
            data: userData,
            message: "User data fetched successfully",
        });

        res.status(response.statusCode).send(response);
        return;

    } catch (error) {
        console.log("error : ", error);

        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong",
        })

        res.status(response.statusCode).send(response);
        return;
    }
}

//Complete update function
//Complete delete function