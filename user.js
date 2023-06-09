const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const mongo = require("mongodb");
const mongoclint = mongo.MongoClient;
var url = "mongodb+srv://manickavasagardgl:vasagar%40123@nodelearn.ejuqunh.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
const process = require("process");
app.get("/", async function (req, res) {
  try {
    var connection = await mongoclint.connect(url);
    var db = connection.db("nodelearn");
    var result = await db.collection("user").find({}).toArray();
    res.json(result);
    connection.close();
  } catch (error) {
    console.log(error);
  }
});

app.get("/:id", async function (req, res) {
  try {
    var connection = await mongoclint.connect(url);
    var db = connection.db("nodelearn");
    var ObjId = new mongo.ObjectId(req.params.id);
    var result = await db.collection("user").findOne({ _id: ObjId });
    if (result) {
      res.json(result);
    } else {
      res.status(401).json({ message: "user not found" });
    }

    connection.close();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/creat-user", async function (req, res) {
  try {
    var connection = await mongoclint.connect(url);
    var db = connection.db("nodelearn");
    await db.collection("user").insertOne(req.body);
    connection.close();
    res.json({ message: "user inserted!" });
  } catch (error) {
    console.log(error);
  }

  // req.body.id=count;
  // userlist.push(req.body);
  // count+=1;
  // res.json({message:"user added!"})
});

app.delete("/delete-user/:id", async function (req, res) {
  try {
    var connection = await mongoclint.connect(url);
    var db = connection.db("nodelearn");
    var ObjId = new mongo.ObjectId(req.params.id);
    await db.collection("user").deleteOne({ _id: ObjId });
    res.json({ message: "user deleted!" });
    connection.close();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
  //   var index = userlist.findIndex((obj) => obj.id == req.params.id);
  //   userlist.splice(index, 1);
  //   res.json({ message: "user deleted !" });
});

app.put("/update-user/:id",async function (req, res) {
    try {
        var connection = await mongoclint.connect(url);
        var db = connection.db("nodelearn");
        var ObjId = new mongo.ObjectId(req.params.id);
        await db.collection("user").findOneAndUpdate({ _id: ObjId },{$set:req.body});
        res.json({ message: "user updated!" });
        connection.close();
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
        console.log(error);
      }
//   var index = userlist.findIndex((obj) => obj.id == req.params.id);
//   console.log(index);
//   Object.keys(req.body).forEach((obj) => {
//     console.log(userlist[index]);
//     userlist[index][obj] = req.body[obj];
//   });
//   res.json({ message: "update user !" });
});

app.listen( process.env.PORT || 3001);
