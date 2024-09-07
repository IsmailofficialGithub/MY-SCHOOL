import studentModel from "../models/studentModel.js";

export const getStudentForTeacher = async (req, res) => {
     try {
       const user = await studentModel.findById(req.params.id).select("-photo -answer -password -userId");
       if (!user) {
         res.status(300).send({
           success: false,
           message: "No Student Found",
         });
       } else {
         res.status(200).send({
           success: true,
           message: "getting student info successfully",
           user,
         });
       }
     } catch (error) {
       console.log(error);
       res.status(500).send({
         success: false,
         message: "error in getting info of student",
         error,
       });
     }
   };