const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3006;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ippopay", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a schema for the minDifference collection
const minDifferenceSchema = new mongoose.Schema(
  {
    array1: {
      type: [Number],
      required: true,
    },
    array2: {
      type: [Number],
      required: true,
    },
    difference: {
      type: Number,
      required: true,
    },
  },
  { collection: "minDifference" }
);

// Define a model based on the minDifference schema
const MinDifference = mongoose.model("minDifference", minDifferenceSchema);

// Add a new entry to the minDifference collection
app.post("/add", (req, res) => {
  const { array1, array2, difference } = req.body;

  if (!array1 || !array2 || !difference) {
    return res.status(400).send("Missing required parameters");
  }

  console.log("difference", difference);
  const minDifference = new MinDifference({ array1, array2, difference });

  minDifference
    .save()
    .then(() => {
      res.send("Entry added successfully");
    })
    .catch((error) => {
      res.status(500).send("Error adding entry to minDifference collection");
    });
});

// Retrieve all entries from the minDifference collection
app.get("/retrieve", (req, res) => {
  MinDifference.find()
    .then((entries) => {
      res.json(entries);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error retrieving entries from minDifference collection");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
