const Ingredient = require("../models/ingredient.model");


exports.seedDatabase = (req, res)=>{
  let data = [
{"itemName": "alvaro bottle"},
{"itemName": "rice"},
{"itemName": "bread"},
{"itemName": "beans"},
{"itemName": "onions"},
{"itemName": "tomatoes"},
{"itemName": "salt"},
{"itemName": "cooking oil"},
{"itemName": "beef"},
{"itemName": "black pepper"},
{"itemName": "coffee"},
{"itemName": "sugar"},
{"itemName": "milk"},
{"itemName": "all-purpose flour"},
{"itemName": "cabbage"},
{"itemName": "potatoes"},
{"itemName": "chicken"},
{"itemName": "drinking chocolate"},
{"itemName": "water bottle"},
{"itemName": "ginger"},
{"itemName": "garlic"},
{"itemName": "egg"},
{"itemName": "tilapia fish"},
{"itemName": "breadcrumbs"},
{"itemName": "lime"},
{"itemName": "fish fillet"},
{"itemName": "fish"},
{"itemName": "maize corn"},
{"itemName": "coriander"},
{"itemName": "sandwich bread"},
{"itemName": "hotdogs"},
{"itemName": "cheese"},
{"itemName": "hamburger buns"},
{"itemName": "lettuce"},
{"itemName": "cocoa powder"},
{"itemName": "baking powder"},
{"itemName": "baking soda"},
{"itemName": "buttermilk"},
{"itemName": "watter bottle"},
{"itemName": "yeast"},
{"itemName": "butter"},
{"itemName": "cumin"},
{"itemName": "tumeric"},
{"itemName": "vinegar"},
{"itemName": "garlic powder"},
{"itemName": "dijon mustard"},
{"itemName": "peas"},
{"itemName": "kales"},
{"itemName": "beef liver"},
{"itemName": "matumbo"},
{"itemName": "cupscum"},
{"itemName": "cardamon"},
{"itemName": "cinnamon"},
{"itemName": "carrots"},
{"itemName": "managu"},
{"itemName": "matoke"},
{"itemName": "kunde"},
{"itemName": "mrenda"},
{"itemName": "dengu"},
{"itemName": "nduma"},
{"itemName": "novida bottle"},
{"itemName": "omena"},
{"itemName": "sweet potatoes"},
{"itemName": "picana bottle"},
{"itemName": "cloves"},
{"itemName": "pilau masala"},
{"itemName": "tomatoe paste"},
{"itemName": "icing sugar"},
{"itemName": "lemon"},
{"itemName": "fruit mix"},
{"itemName": "sausage"},
{"itemName": "cilantro"},
{"itemName": "celery"},
{"itemName": "diet soda bottle"},
{"itemName": "water soda bottle"},
{"itemName": "cumin powder"},
{"itemName": "saget leaves"},
{"itemName": "tea leaves"},
{"itemName": "white tea leaves"},
{"itemName": "tonic water bottle"},
{"itemName": "maize flour"},
{"itemName": "millet flour"},
{"itemName": "margarine"},
{"itemName": "cucumber"},
{"itemName": "pecan"},
{"itemName": "cassava flour"},
{"itemName": "banana"},
{"itemName": "chilli"},
{"itemName": "hotdog wiener"},
{"itemName": "hotdog bun"},
{"itemName": "mayonnase"},
{"itemName": "mushroom"},
{"itemName": "t-bone steak"},
]
  try {
    data.forEach((item) => {
      try {
        Ingredient.create(item)
        .then(()=>{
          console.log(`Ingredient added successfully`);
        })
        .catch((e)=>{
          res.status(401).json({"Message": `Error creating food item: ${e.message}`})
        })
      } catch (e) {
        console.log(`Error whilst creating foodItem: ${e.message}`);
      }
    });
  } catch (e) {
    console.log(`Error @ the seeding food item handler: ${e.message}`);
  }
}

exports.getIngredients = (req, res)=>{
  try {
    Ingredient.find({})
    .then((items)=>{
      res.status(200).json({"Message":"Fetch successful", items});
    })
    .catch((e)=>{
      res.status(401).json({"Message": `Fetch failed: ${e.message}`})
    })
  } catch (e) {
    console.log(`Error @ the fetch food items handler: ${e.message}`);
  }
}
