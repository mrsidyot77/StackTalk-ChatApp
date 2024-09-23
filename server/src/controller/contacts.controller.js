import {User} from "../model/user.model.js"

export const searchContacts = async (req, res, next) => {
    try {
      const {searchTerm} = req.body

      if (!searchTerm || searchTerm === undefined) {
        res.status(400).send("searchTerm is required.")
      }
      
      const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regex = new RegExp(sanitizedSearchTerm,"i")
      const contacts = await User.find({
        $and : [{_id : {$ne: req.userId}}],  //this condition works to not to display the user that is loggedIn in search Bar
        $or : [{firstName: regex},{lastName: regex}, {email: regex}]
      }).select("-password")
      
      return res.status(200).send({contacts})
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internel server error.");
    }
  };