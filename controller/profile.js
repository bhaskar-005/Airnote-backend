const user = require("../model/user");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const findUser = await user.findById(id);

    if (findUser) {
      findUser.password = undefined;

      return res.status(200).json({
        success: true,
        message: "User found successfully",
        findUser,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
