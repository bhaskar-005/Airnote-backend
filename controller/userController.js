const user = require("../model/user");
//....panding update user......

//get user
exports.getuser = async(req,res)=>{
        try {
          const { id } = req.params;
      
          const findUser = await user.findById(id);
      
          if (!findUser) {
            return res.status(404).json({
              message: 'User not found',
            });
          }
          findUser.password = undefined;
          return res.status(200).json({
            message: 'User found',
            data: findUser,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message: 'Not able to find user',
          });
        }
      };

//delete user
exports.deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const findUser = await user.findByIdAndDelete(id)
        //delte posts and comments -->panding

        return res.status(200).json({
            message: 'User deleted successfully',
        })
    } catch (error) {
        return res.status(400).json({
            message:"user not deleted !"
        })
    }
}