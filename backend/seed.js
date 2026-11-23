const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
  await users.insertOne({
    name: "Pritheesh",
    address: { city: "Paris", country: "France" },
  });
  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "zion",
    skills: ["JavaScript", "HTML", "MongoDB"],
  });
  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
    {
      name: "zerper",
      address: { city: "Lyon", country: "France" },
      skills: ["CSS"],
    },
    {
      name: "vatsal",
      address: { city: "delhi", country: "india" },
      skills: ["Node.js"],
    },
    {
      name: "Justin",
      address: { city: "Tokyo", country: "Japan" },
    },
    {
      name: "Sebastain",
      address: { city: "belin", country: "Germany" },
    },
    {
      name: "krishna",
      address: { city: "delhi", country: "india" },
    },
  ]);
  // TODO 4: retrieve all documents and log each user's name.
  const allUsers = await users.find().toArray();
  allUsers.forEach((user) => console.log(user.name));

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log(parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
  const frenchUsers = await users
    .find({ "address.country": "France" })
    .toArray();
  frenchUsers.forEach((user) => console.log(user.name));

  // TODO 7: find all users who have a skills field and log their names.
  const skilledUsers = await users.find({ skills: { $exists: true } }).toArray();
  skilledUsers.forEach((user) => console.log(user.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
