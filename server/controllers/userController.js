const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const JWT = require("jsonwebtoken");
const OtpGenerator = require("otp-generator");

const sendOTP = async (req, resp) => {

    try {

        const { email } = req.body;

        //generate otp [in otp only numbers present]
        let otp = OtpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });


        // check otp is unique or not
        const checkOtp = await Otp.findOne({ otp: otp });

        // ? We want unique otp, so jab tak  unique otp nahi milta, tab tak loop chalega
        // if not unique
        while (checkOtp) {
            otp = OtpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            checkOtp = await Otp.findOne({ otp: otp })
        }


        //crate payload and create an entry for otp in db
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);


        // return response 
        resp.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            response: otpBody
        })

    } catch (error) {
        // console.log("Something went wrong while send otp: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while send otp",
            error: error.message
        });
        // next(error)
    }


}

const userLogin = async (req, resp) => {
    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email: email });


        // Check otp is correct or not

        const recentOtp = await Otp.findOne({ email: email }).sort({ createdAt: -1 });

        // if otp not found and matched 
        if (recentOtp === null) {
            return resp.status(404).json({
                success: false,
                message: "Invalid otp"  // in otp collection no otp found with this email
            })
        } else if (otp != recentOtp.otp) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Otp!!"
            })
        }


        if (!user) {

            const userCreated = await User.create({
                email: email,
            })

            // created token
            const payload = {
                email: userCreated.email,
                id: userCreated._id,
            }

            const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "30m",  //30min
            })

            resp.status(200).json({
                success: true,
                message: "Logged In Successfully !!!",
                response: userCreated,
                token: token
            })

        } else {
            // created token
            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "30m",  //30min
            })

            resp.status(200).json({
                success: true,
                message: "Logged In Successfully !!",
                response: user,
                token: token
            })
        }

    } catch (error) {
        // console.log("Something went wrong while login user: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while login",
            error: error.message
        });
    }
}

const userDetails = async (req, resp) => {
    try {

        const userData = req.user;

        const userEmail = userData.email;

        const userDetails = await User.find({ email: userEmail })


        resp.status(200).json({ success: true, response: userDetails });


    } catch (error) {
        // console.log("Something went wrong while getting user data: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while user data",
            error: error.message
        });
    }
}




module.exports = { sendOTP, userLogin, userDetails };