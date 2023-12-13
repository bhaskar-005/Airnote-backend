const Comment = require("../model/comment");


//get post
exports.getAllComment = async (req, res) => {
     try {
        const getcomment = await Comment.find();
     if (getcomment) {
        return res.status(200).json({
            message:'all comment fetched.',
            data:getcomment
        })
     }
     } catch (error) {
        return res.status(400).json({
            message:'comment not fetched.',
            getAllPost,
        })
     }
}

//get post by id
exports.getcomment = async (req, res) => {
    try {
        const {id} = req.params;
       const getcomment = await Comment.findById(id);
    if (getcomment) {
       return res.status(200).json({
           message:'all comment fetched.',
           getcomment,
       })
    }
    } catch (error) {
       return res.status(400).json({
           message:'comment not fetched.'
       })
    }
}
//create post 
exports.createComment = async(req,res)=>{
    try {
        const{content,author,post} = req.body;
        if(!content||!author||!post){
            return res.status(400).json({
                message:'all fields required.',
            })
        }
        const commententry = await Comment.create({
            content,
            post,
            author,
        })
        if(commententry){
            return res.status(200).json({
                message:"comment created successfull.",
                data:commententry,
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:'entry not created',
            error: error,
        })
    };
};

//update post 
exports.updateComment = async(req,res)=>{
      try {
        const {id} = req.params;
        const updateEntry = await Comment.findByIdAndUpdate(id,{$set:req.body});
        if (updateEntry) {
            return res.status(200).json({
                message:'comment updated',
                updateEntry,
            })
        }
      } catch (error) {
        return res.status(400).json({
            message:'comment not updated',
        })
      }
}

//delete post
exports.deleteComment = async(req,res)=>{
     try {
        const{id} = req.params;
        const deletecomment = await Comment.findByIdAndDelete(id);
        if(deletecomment){
            return res.status(200).json({
                message:'comment deleted',
            })
        }
     } catch (error) {
        return res.status(400).json({
            message:'comment not deleted',
        })
     }
}