const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            enum: ["Mr", "Mrs", "Miss"],
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: { unique: true },
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Please fill a valid email address",],
        },
        password: {
            type: String,
            required: true,
        },
    },
<<<<<<< HEAD
    
  
{ timestamps: true }
=======
    ilname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,"Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
>>>>>>> 128ba01c808672e8d568446e1a84512b7610d618
);

module.exports = mongoose.model("Author", authorSchema);
