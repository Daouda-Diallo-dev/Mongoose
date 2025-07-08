require('dotenv').config();
const mongoose = require('mongoose');
console.log("URI Mongoose :", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => console.error("❌ Erreur de connexion :", err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createPerson = () => {
  const person = new Person({
    name: "Ali",
    age: 25,
    favoriteFoods: ["Yassa", "Thieb", "Pizza"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("Personne enregistrée :", data);
  });
};

const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "John", age: 30, favoriteFoods: ["Burger", "Fries"] },
    { name: "Mary", age: 28, favoriteFoods: ["Salad", "Cake"] },
    { name: "Fatou", age: 35, favoriteFoods: ["Burrito", "Yassa"] }
  ];

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("Personnes créées :", people);
  });
};

const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    console.log("Résultat de find():", data);
  });
};

const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log("Résultat de findOne():", person);
  });
};

const findPersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log("Résultat de findById():", person);
  });
};

const addFoodAndSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log("Personne mise à jour :", updatedPerson);
    });
  });
};

const updateAgeByName = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.error(err);
      console.log("Document modifié :", updatedDoc);
    }
  );
};


const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, deletedDoc) => {
    if (err) return console.error(err);
    console.log("Document supprimé :", deletedDoc);
  });
};


const removeManyPeople = () => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("Documents supprimés :", result);
  });
};


const complexQuery = () => {
  Person.find({ favoriteFoods: "Burrito" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("Requête complexe :", data);
    });
};
