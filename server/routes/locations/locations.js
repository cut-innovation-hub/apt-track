const express = require("express");
const geocoder = require("../../helpers/geocoder");
const Test = require("../../models/Test");
const router = express.Router();

// get items from arduino
router.post("/items", async (req, res) => {
  const { api_key, lng, lat } = req.body;
  console.log("api  key is ----- ", api_key, lng, lat, req.body);

  try {
    // if (api_key === "Ad5F10jkBM0") {
      const newTest = new Test({
        longitude: lng,
        latitude: lat,
      });
      // console.log('Data received :----------- ', newTest)
      const saved_test = await newTest.save();
      // pulling longitude and latitude from geocoder
      // const addressInfo = await geocoder.reverse({ lat: lat, lon: lng });
      global.io.sockets.emit('api-location-info', newTest)
      console.log("Data saved");
      return res
        .status(200)
        .send({ message: "Data from gps", data: newTest, from_api: req.body });
    // } else {
    //   console.error("error saving coords");
    //   return res.status(400).send({ message: "Wrong api key" });
    // }
    // console.log(`the data reveies`, req.body)
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
});

// get items from arduino
router.post("/from_actual", async (req, res) => {
  const {field1, field2, api_key} = req.query
  console.log("api  key is ----- ",api_key,  field1, field2);

  try {
    // if (api_key === "Ad5F10jkBM0") {
      const newTest = new Test({
        longitude: field1,
        latitude: field2,
      });
      // console.log('Data received :----------- ', newTest)
      const saved_test = await newTest.save();
      // pulling longitude and latitude from geocoder
      // const addressInfo = await geocoder.reverse({ lat: lat, lon: lng });
      global.io.sockets.emit('api-location-info', newTest)
      console.log("Data saved");
      return res
        .status(200)
        .send({ message: "Data from gps", data: newTest, from_api: req.body });
    // } else {
    //   console.error("error saving coords");
    //   return res.status(400).send({ message: "Wrong api key" });
    // }
    // console.log(`the data reveies`, req.body)
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
});

router.post("/geocode", async (req, res) => {
  try {
    //address from request bosy
    const { address } = req.body;

    //pulling longitude and latitude from geocoder
    const addressInfo = await geocoder.geocode(address);

    return res.status(200).send({ addressInfo: addressInfo });
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
});

router.post("/reverse-geocode", async (req, res) => {
  try {
    const { lon, lat } = req.body;

    const address = await geocoder.reverse({ lat: lat, lon: lon });

    return res.status(200).send({ addressInfo: address });
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
});

router.get("/items", (req, res) => {
  res.json({ message: "test coordinates from here" });
});

module.exports = router;
