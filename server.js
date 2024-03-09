import express, { response } from "express";
import axios from "axios";
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");


// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("https://main--skyview-weatherapp.netlify.app/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
  
});

// Handle the /weather route
app.get("https://main--skyview-weatherapp.netlify.app/weather", async(req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const APIkey='792f070cefe929e01518cab3af05d3b5';
  // Add your logic here to fetch weather data from the API
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
  // Render the index template with the weather data and error message
  res.render("index.ejs", { weather:weather, error:error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

