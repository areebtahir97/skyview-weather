import express, { response } from "express";
import axios from "axios";
const app = express();


app.set("view engine", "ejs");



app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
  
});


app.get("/weather", async(req, res) => {

  const city = req.query.city;
  const APIkey='792f070cefe929e01518cab3af05d3b5';
  
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
  let weather;
  let error=null;
  try {
    const response=await axios.get(url);
    weather=response.data;
  } catch (error) {
    weather=null;
    error="Error,Please try again."
  }

  res.render("index.ejs", { weather:weather, error:error });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

