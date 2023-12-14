const user = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const emailValidation = await user.findOne({ email: email });

        if (emailValidation) {
            return res.status(400).json({
                message: "User already exists, please login."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userEntry = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePhoto: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        });

        if (userEntry) {
            return res.status(200).json({
                message: "Entry created.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Not able to register.",
            error:error,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailValidation = await user.findOne({ email: email });

        if (!emailValidation) {
            return res.status(400).json({
                message: "User not found, please signup."
            });
        }

        const passwordValidation = await bcrypt.compare(password, emailValidation.password);

        if (!passwordValidation) {
            return res.status(400).json({
                message: "Password is incorrect."
            });
        }

        if (passwordValidation) {
            const payload = {
                id: emailValidation._id, 
                email: emailValidation.email,
                firstName: emailValidation.firstName,
                lastName: emailValidation.lastName,
                profilePhoto: emailValidation.profilePhoto,
                
            }
            console.log('Payload:', payload);
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
            user.token = token;
            return res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                domain :'.airnote-iota.vercel.app'
            }).json({
                message: "Logged in successfully.",
                token,
               
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Not logged in',
            error: error.message
        });
    }
}

exports.logout = async(req,res)=>{
    try {
        res.clearCookie("token").status(200).json({
            message:"logout successfully.",
        })
    } catch (error) {
        return res.status(400).json({
            message:"not able to logout",
            error: error.message,
        });
    }
}

exports.refetch = async (req, res) => {
    try {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.error(err);
                return res.status(401).json({
                    message: 'Unauthorized access',
                });
            }

            
            res.status(200).json({
                decoded,
                message: 'success',
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
