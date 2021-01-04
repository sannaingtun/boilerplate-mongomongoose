require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

let Person;

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person", personSchema);
console.log(Person);
const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["vodka", "air"]});
  
  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    console.log(arrayOfPeople);
    if (err) return console.error(err);
    done(null, people)
  });  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.find({name: personName}, function(err, person){
    if (err) return console.log(err);
    console.log(person);
    person[0].age = ageToSet;
    person[0].save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  });  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, deletePerson){
    if (err) return console.log(err);
    done(null, deletePerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, function(err, deletePerson){
    if (err) return console.log(err);
    done(null, deletePerson)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name : 1})
        .limit(2)
        .select({ age: 0})
        .exec(function(err, results){
          if (err) return console.log(err);
          console.log(results);
          done(null, results);
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
