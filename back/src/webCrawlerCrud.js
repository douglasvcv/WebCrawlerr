import { MongoClient } from "mongodb";


//Connect to Cluster
export const connectToCluster = async (uri) => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
};

//Execute CRUD
export const executeWebCrawlerCrudOperations = async () => {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("webcrawler");
    const collection = db.collection("weather");

     console.log('CREATE WeatherForecast')
     await createWebCrawlerDocument(collection)

    // console.log("UPDATE Forecast currentTemperature");
    // await updateForecastByName(collection, "Crato", {
    //   currentTemperature: "27.4",
    // });

    // console.log("DELETE WeatherForecast");
    // await deleteForecastByName(collection, "Crato");

    console.log(await findForecastByName(collection, "Crato"));
   
  } finally {
    await mongoClient.close();
  }
};

//Post
export async function createWebCrawlerDocument(collection) {
  const forecastDocument = {
    currentTemperature: "24.4",
    icon: "//cdn.weatherapi.com/weather/64x64/day/353.png",
    locationName: "Crato",
    locationRegion: "Ceara",
    currentCondition: "Light rain shower",
  };

  await collection.insertOne(forecastDocument);
}

//Find
export async function findForecastByName(collection, locationName) {
  return collection.find({ locationName }).toArray();
}

//Update
export async function updateForecastByName(
  collection,
  locationName,
  updatedFields
) {
  await collection.updateMany({ locationName }, { $set: updatedFields });
}

//Delete
export async function deleteForecastByName(collection, locationName) {
  await collection.deleteMany({ locationName });
}
