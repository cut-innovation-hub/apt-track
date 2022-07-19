const express = require("express");
const Test = require("../../models/Test");
const router = express.Router();

// get items from arduino
router.post("/items", async (req, res) => {
  const { api_key, longitude, latitude } = req.body;
  console.log('api  key is ----- ', api_key)

  try {
    // if (api_key === ES32_API_KEY) {
    //   const newTest = new Test({
    //     longitude: longitude,
    //     latitude: latitude,
    //   });
    //   console.log('Data received :----------- ', newTest)
    //   const saved_test = await newTest.save();
    //   return res
    //     .status(200)
    //     .send({ message: "Test data saved successfully", data: saved_test });
    // } else {
    //   return res.status(400).send({ message: "Wrong api key" });
    // }
    console.log(`the data reveies`, req.body)
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "test coordinates from here" });
});

module.exports = router;
