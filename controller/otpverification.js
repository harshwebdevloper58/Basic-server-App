const otpgenerator = require("otp-generator");
const OTPmodel = require("../model/otp");
const nodemailer = require("nodemailer");

const otpverification = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate email
        if (!email) {
            throw new Error("Email is required");
        }

        console.log("Received email:", email);

        const otp = otpgenerator.generate(6, {
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        });

        console.log("Generated OTP:", otp);

        // const cDate = new Date();

        // const result = await OTPmodel.findOneAndUpdate(
        //     { email },
        //     { otp, optExpiration: cDate },
        //     { upsert: true, new: true, setDefaultsOnInsert: true }
        // );

        
        try {
      
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  
                    user: 'shrivastavaharsh1910@gmail.com',
                    pass: 'thlj tmhs yyvl utqb'
                }
            });
      
            var mailOptions = {
                from: 'shrivastavaharsh1910@gmail.com',
                to: email,
                subject: 'Otp verification for PracticsPage',
                text: `Your Otp for Verification is ${otp}`
            };
      
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: to '+email + info.response);
                }
            });
        } catch (error) {
            console.error("Error in sending OTP email:", error);
        }

        return res.status(200).json(otp);

    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

module.exports = {
    otpverification
};
