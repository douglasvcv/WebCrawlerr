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
  const uri = process.env.VITE_DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("webcrawler");
    const collection = db.collection("weather");

    //  console.log('CREATE WeatherForecast')
    //  await createWebCrawlerDocument(collection)

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
executeWebCrawlerCrudOperations()
//Post
export async function createWebCrawlerDocument(collection, data) {
  const forecastDocument = {
  data    
  };

  await collection.insertOne(forecastDocument);
}

//Find
export async function findForecastByName(collection, name) {
  return collection.find({ name }).toArray();
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
