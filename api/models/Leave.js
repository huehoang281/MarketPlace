const mongoose = require("mongoose")

const LeaveSchema = new mongoose.Schema(
    {
        userCmnd : {
            type : String,
            required : true,
        },
        status : {
            type : String,
            default : "pending"
        }
    }, { timestamps: true }
)


module.exports = mongoose.model("Leave", LeaveSchema)
