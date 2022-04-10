const FoodItem = require("../models/foodItem.model");


exports.seedDatabase = (req, res)=>{
  let data = [
    {"itemName":"ALVARO","codeNumber":"001","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3NiZiee", "ingredients": ["alvaro bottle"]},
    {"itemName":"AROMATIC RICE-","codeNumber":"002","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3qoOXmW", "ingredients": ["rice"]},
    {"itemName":"BREAD-1/4 loaf","codeNumber":"003","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"11.00", "imgUrl": "https://bit.ly/3wpoF7R", "ingredients": ["bread"]},
    {"itemName":"BEEF","codeNumber":"004","staffCafeteriaPrice":"90.00","studentCafeteriaPrice":"84.00", "imgUrl": "https://bit.ly/3ucgpW9", "ingredients": ["beans", "onions", "tomatoes", "salt", "cooking oil"]},
    {"itemName":"BEANS STEW","codeNumber":"005","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3KYUF71", "ingredients": ["beans", "onions", "tomatoes", "salt", "cooking oil"]},
    {"itemName":"BEEF BURGER","codeNumber":"007","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3tojfZ4", "ingredients": ["beef", "onions", "egg", "garlic", "salt", "black pepper", "cooking oil", "hamburger buns", "lettuce", "tomatoes"]},
    {"itemName":"BLACK FOREST CAKES","codeNumber":"009","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3KW00fg", "ingredients": ["all-purpose flour", "cocoa powder", "sugar", "baking soda", "baking powder", "salt", "cooking oil", "egg", "buttermilk"]},
    {"itemName":"FRIED STEAK - BEEF","codeNumber":"010","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"350.00", "imgUrl": "https://bit.ly/3wl755b", "ingredients": ["beef", "onions", "tomtoes", "cooking oil", "salt", "black pepper"]},
    {"itemName":"COFFEE BLACK","codeNumber":"011","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"6.00", "imgUrl": "https://bit.ly/3iqriy5", "ingredients": ["coffee", "sugar"]},
    {"itemName":"COFFEE WHITE","codeNumber":"012","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/36FgdXC", "ingredients": ["coffee", "milk", "sugar"]},
    {"itemName":"CHAPATI","codeNumber":"013","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3N8xAAD", "ingredients": ["salt", "cooking oil", "all-purpose flour"]},
    {"itemName":"FRIED CABBAGES","codeNumber":"014","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3imfL31", "ingredients": ["cabbage", "salt", "onions", "tomatoes", "cooking oil"]},
    {"itemName":"CHIPS","codeNumber":"015","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3uju1PH", "ingredients": ["potatoes", "cooking oil"]},
    {"itemName":"SOFT CAKE","codeNumber":"016","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3uhV4uu", "ingredients": ["all-purpose flour", "egg", "sugar", "baking powder"]},
    {"itemName":"CHICKEN","codeNumber":"017","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00", "imgUrl": "https://bit.ly/36giQPE", "ingredients": ["chicken", "cooking oil", "salt", "all-purpose flour", "black pepper"]},
    {"itemName":"DRINKING CHOCOLATE ","codeNumber":"018","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3Ir9Sw4", "ingredients": ["cocoa powder", "sugar", "milk"]},
    {"itemName":"SMALL BOTTLED WATER","codeNumber":"019","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wpjG7w", "ingredients": ["water bottle"]},
    {"itemName":"GRILLED CHICKEN","codeNumber":"020","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3u7Xc88", "ingredients": ["chicken", "salt"]},
    {"itemName":"LOCAL CHICKEN STEW","codeNumber":"022","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3L0YaK3", "ingredients": ["chicken", "ginger", "garlic", "salt", "cooking oil", "onions", "tomatoes"]},
    {"itemName":"DOUGHNUT","codeNumber":"023","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00", "imgUrl": "https://bit.ly/3trLN3S", "ingredients": ["yeast", "milk", "sugar", "salt", "egg", "all-purpose flour", "cooking oil", "butter"]},
    {"itemName":"MUTHOKOI","codeNumber":"024","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3L4fJsC", "ingredients": ["onions", "maize corn", "potatoes", "salt", "cooking oil", "black pepper", "cumin", "tumeric", "coriander", "garlic", "ginger", "tomatoes"]},
    {"itemName":"BOILED EGG","codeNumber":"025","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/34YX5TT", "ingredients": ["egg"]},
    {"itemName":"FRIED EGG","codeNumber":"026","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wtjfc7", "ingredients": ["egg", "cooking oil", "salt"]},
    {"itemName":"SAVOURY EGG","codeNumber":"027","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/36dFYyd", "ingredients": ["egg", "vinegar", "garlic powder", "salt", "dijon mustard"]},
    {"itemName":"TILAPIA FISH","codeNumber":"030","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00", "imgUrl": "https://bit.ly/3tumkXJ", "ingredients": ["tilapia fish", "salt", "cooking oil", "ginger", "garlic"]},
    {"itemName":"FISH - FILLET","codeNumber":"032","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3IvDXKG", "ingredients": ["fish fillet", "all-purpose flour", "salt", "egg", "breadcrumbs", "cooking oil"]},
    {"itemName":"WHOLE FISH TILAPIA JUMBO","codeNumber":"033","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3N9Fyth", "ingredients": ["tilapia fish", "lime", "salt", "garlic", "ginger", "cooking oil"]},
    {"itemName":"JUMBO Q. CAKE","codeNumber":"034","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3tumkXJ", "ingredients": ["all-purpose flour", "egg", "sugar", "baking powder"]},
    {"itemName":"FRIED FISH","codeNumber":"035","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3N9Fyth", "ingredients": ["fish", "all-purpose flour", "salt", "egg", "breadcrumbs", "cooking oil"]},
    {"itemName":"GITHERI","codeNumber":"036","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3woLsAQ", "ingredients": ["beans", "maize corn", "tomatoes", "onions", "coriander", "cooking oil", "garlic", "salt"]},
    {"itemName":"HOT DOG ROLL","codeNumber":"037","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"45.00", "imgUrl": "https://bit.ly/36eDTlu", "ingredients": ["sandwich bread", "hotdogs", "cheese", "egg", "milk", "breadcrumbs"]},
    {"itemName":"IRIO","codeNumber":"038","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3IyTwRP", "ingredients": ["potatoes", "butter", "garlic", "onions", "maize corn", "peas", "salt"]},
    {"itemName":"KEBAB","codeNumber":"039","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3io1VNk", "ingredients": ["beef", "coriander", "breadcrumbs", "salt", "egg", "black pepper", "onions", "garlic", "ginger", "cumin", "cooking oil"]},
    {"itemName":"KALES","codeNumber":"040","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/36eEROE", "ingredients": ["kales", "cooking oil", "onions", "tomatoes"]},
    {"itemName":"LIVER","codeNumber":"041","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00", "imgUrl": "https://bit.ly/3iqAx1j", "ingredients": ["beef liver", "milk", "butter", "onions", "all-puporse flour", "salt", "black pepper"]},
    {"itemName":"MILK","codeNumber":"043","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3Nci32E", "ingredients": ["milk"]},
    {"itemName":"MATUMBO","codeNumber":"044","staffCafeteriaPrice":"80.00","studentCafeteriaPrice":"80.00", "imgUrl": "https://bit.ly/3InOfN2", "ingredients": ["matumbo", "cooking oil", "onions", "garlic", "cupscum", "coriander"]},
    {"itemName":"MANDAZI","codeNumber":"045","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3N8FLge", "ingredients": ["all-purpose flour", "baking powder", "salt", "sugar", "cardamon", "cinnamon", "egg", "butter", "cooking oil"]},
    {"itemName":"MEAT PIES","codeNumber":"046","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wqEawp", "ingredients": ["all-purpose flour", "salt", "butter", "potatoes", "onions", "beef", "carrots", "peas"]},
    {"itemName":"MANAGU","codeNumber":"049","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wxNr5M", "ingredients": ["managu", "cooking oil", "onions", "tomatoes", "salt"]},
    {"itemName":"MATOKE","codeNumber":"050","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3L6334v", "ingredients": ["matoke", "cooking oil", "onions", "beef", "garlic", "ginger", "salt", "black pepper", "tomatoes"]},
    {"itemName":"MALA","codeNumber":"052","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3N97Hkh", "ingredients": ["milk"]},
    {"itemName":"MURENDA","codeNumber":"053","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3qqLLrb", "ingredients": ["kunde", "mrenda", "salt", "milk"]},
    {"itemName":"NDENGU","codeNumber":"054","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"11.00", "imgUrl": "https://bit.ly/3ttXas2", "ingredients": ["dengu", "tomtoes", "onions", "cooking oil", "garlic", "ginger", "black pepper", "coriander", "salt"]},
    {"itemName":"NDUMA","codeNumber":"057","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3IrOKWn", "ingredients": ["nduma", "breadcrumbs", "egg"]},
    {"itemName":"NOVIDA","codeNumber":"058","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3wqFYpb", "ingredients": ["novida bottle"]},
    {"itemName":"OMENA","codeNumber":"060","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3iryBpq", "ingredients": ["omena", "onions", "tomatoes", "coriander", "salt", "cooking oil", "garlic", "cupscum"]},
    {"itemName":"MASHED POTATOES","codeNumber":"061","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3Jx1CMm", "ingredients": ["potatoes", "salt", "butter", "milk"]},
    {"itemName":"SWEET POTATOES","codeNumber":"062","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3Jx0yrA", "ingredients": ["sweet potatoes"]},
    {"itemName":"WHITE POTATOES","codeNumber":"063","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3CY59Rr", "ingredients": ["potatoes"]},
    {"itemName":"PICANA","codeNumber":"064","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/36AM5MI", "ingredients": ["picana bottle"]},
    {"itemName":"PILAU","codeNumber":"065","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3Juz1ah", "ingredients": ["cloves", "cumin", "cinnamon", "black pepper", "cardamon", "rice", "potatoes", "cooking oil", "onions", "garlic", "ginger", "pilau masala", "beef", "tomatoes paste", "salt"]},
    {"itemName":"QUEEN CAKE","codeNumber":"066","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wlYhfj", "ingredients": ["all-purpose flour", "butter", "icing sugar", "eggs", "baking powder", "lemon", "milk"]},
    {"itemName":"ROCK BUN","codeNumber":"068","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/37Ib6pP", "ingredients": ["butter", "sugar", "friut mix", "egg", "milk"]},
    {"itemName":"SAUSAGE","codeNumber":"070","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3tsrAL8", "ingredients": ["sausage", "cooking oil", "black pepper"]},
    {"itemName":"BEEF SAMOSA","codeNumber":"071","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3N92t87", "ingredients": ["beef", "cilantro", "carrots", "cabbage", "onions", "garlic", "salt", "all-purpose flour", "cooking oil"]},
    {"itemName":"SOUP","codeNumber":"075","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3qqtOc5", "ingredients": ["carrots", "celery", "onions", "salt", "black pepper", "tomatoes"]},
    {"itemName":"DIET SODA","codeNumber":"077","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3ItJxxa", "ingredients": ["diet soda bottle"]},
    {"itemName":"WATER SODA","codeNumber":"078","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00", "imgUrl": "https://bit.ly/3wqTVDF", "ingredients": ["water soda bottle"]},
    {"itemName":"SAMOSA (NDENGU)","codeNumber":"079","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/3iqGfjL", "ingredients": ["dengu", "cumin powder", "cooking oil", "onions", "black pepper", "salt", "garlic", "all-purpose flour", "ginger"]},
    {"itemName":"SAGET","codeNumber":"080","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wpIfRz", "ingredients": ["saget leaves", "tomatoes", "onions", "salt", "cooking oil", "milk"]},
    {"itemName":"BLACK TEA","codeNumber":"082","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"6.00", "imgUrl": "https://bit.ly/3N5P6We", "ingredients": ["tea leaves", "sugar"]},
    {"itemName":"WHITE TEA","codeNumber":"083","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3tvrse9", "ingredients": ["white tea leaves", "suagr"]},
    {"itemName":"TONIC WATER","codeNumber":"088","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3CZH8cq", "ingredients": ["tonic water bottle"]},
    {"itemName":"UGALI","codeNumber":"090","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"8.00", "imgUrl": "https://bit.ly/36AxiBM", "ingredients": ["maize flour"]},
    {"itemName":"UJI","codeNumber":"091","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3wGQ1XB", "ingredients": ["millet flour", "maize flour"]},
    {"itemName":"MIXED VEGETABLES","codeNumber":"093","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3IxygMm", "ingredients": ["onions", "garlic", "margarine", "potatoes", "carrots", "black pepper"]},
    {"itemName":"SANDWICH","codeNumber":"095","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3trEwAX", "ingredients": ["bread", "tomatoes", "cucumber", "cheese"]},
    {"itemName":"KUNDE","codeNumber":"096","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": " https://bit.ly/3N82k4S", "ingredients": ["salt", "onions", "garlic", "kunde", "cooking oil"]},
    {"itemName":"BOILED MAIZE","codeNumber":"097","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3CYhQvk", "ingredients": ["maize", "salt"]},
    {"itemName":"BUTTERNUTS","codeNumber":"098","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3ts61ug", "ingredients": ["all-purpose flour", "sugar", "salt", "pecan", "butter", "milk"]},
    {"itemName":"MARA BUNS","codeNumber":"099","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3Jx7mpo", "ingredients": ["all-purpose flour", "yeast", "milk", "cooking oil", "sugar", "salt"]},
    {"itemName":"UGALI WIMBI","codeNumber":"100","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3Ivsfjs", "ingredients": ["cassava flour", "millet flour", "maize flour"]},
    {"itemName":"BANANA","codeNumber":"101","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/36fk8dG", "ingredients": ["banana"]},
    {"itemName":"MURSIK","codeNumber":"103","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3L1FpX8", "ingredients": ["milk"]},
    {"itemName":"BHAJIA","codeNumber":"104","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/36y9VJ5", "ingredients": ["pataoes", "flour", "baking powder", "salt", "chilli", "cooking oil", "coriander"]},
    {"itemName":"Hot Dog Big","codeNumber":"108","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/37DP3R8", "ingredients": ["hotdog wiener", "hotdog bun", "mayonnaise", "lime", "cilantro"]},
    {"itemName":"Smokie","codeNumber":"110","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3tt74u5", "ingredients": ["smokies", "cooking oil", "salt"]},
    {"itemName":"Roast Chicken","codeNumber":"111","staffCafeteriaPrice":"250.00","studentCafeteriaPrice":"250.00", "imgUrl": "https://bit.ly/3qpe7lw", "ingredients": ["chicken", "salt"]},
    {"itemName":"Beef Casserole","codeNumber":"112","staffCafeteriaPrice":"170.00","studentCafeteriaPrice":"170.00", "imgUrl": "https://bit.ly/3wqLw2Z", "ingredients": ["beef", "salt", "onions", "tomatoes", "carrots", "mushroom", "black pepper"]},
    {"itemName":"Fried T-Bone Steak","codeNumber":"114","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3tvr3IG", "ingredients": ["t-bone steak", "salt", "black pepper", "cooking oil"]},
    {"itemName":"Chips and Salad","codeNumber":"119","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00", "imgUrl": "https://bit.ly/3Nd2xUf", "ingredients": ["potatoes", "cooking oil", "cabbage", "carrots"]}
    ]
  try {
    data.forEach((item) => {
      try {
        FoodItem.create(item)
        .then(()=>{
          console.log(`Food item added successfully`);
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

exports.getFoodItems = (req, res)=>{
  try {
    FoodItem.find({})
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
