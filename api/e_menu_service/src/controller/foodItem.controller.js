const FoodItem = require("../models/foodItem.model");


exports.seedDatabase = (req, res)=>{
  let data = [
    {"itemName":"ALVARO","codeNumber":"001","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3NiZiee"},
    {"itemName":"AROMATIC RICE-","codeNumber":"002","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3qoOXmW"},
    {"itemName":"BREAD-1/4 loaf","codeNumber":"003","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"11.00", "imgUrl": "https://bit.ly/3wpoF7R"},
    {"itemName":"BEEF","codeNumber":"004","staffCafeteriaPrice":"90.00","studentCafeteriaPrice":"84.00", "imgUrl": "https://bit.ly/3ucgpW9"},
    {"itemName":"BEANS STEW","codeNumber":"005","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3KYUF71"},
    {"itemName":"BEEF BURGER","codeNumber":"007","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3tojfZ4"},
    {"itemName":"BLACK FOREST CAKES","codeNumber":"009","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3KW00fg"},
    {"itemName":"FRIED STEAK - BEEF","codeNumber":"010","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"350.00", "imgUrl": "https://bit.ly/3wl755b"},
    {"itemName":"COFFEE BLACK","codeNumber":"011","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"6.00", "imgUrl": "https://bit.ly/3iqriy5"},
    {"itemName":"COFFEE WHITE","codeNumber":"012","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/36FgdXC"},
    {"itemName":"CHAPATI","codeNumber":"013","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3N8xAAD"},
    {"itemName":"FRIED CABBAGES","codeNumber":"014","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3imfL31"},
    {"itemName":"CHIPS","codeNumber":"015","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3uju1PH"},
    {"itemName":"SOFT CAKE","codeNumber":"016","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3uhV4uu"},
    {"itemName":"CHICKEN","codeNumber":"017","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00", "imgUrl": "https://bit.ly/36giQPE"},
    {"itemName":"DRINKING CHOCOLATE ","codeNumber":"018","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3Ir9Sw4"},
    {"itemName":"SMALL BOTTLED WATER","codeNumber":"019","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wpjG7w"},
    {"itemName":"GRILLED CHICKEN","codeNumber":"020","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3u7Xc88"},
    {"itemName":"LOCAL CHICKEN STEW","codeNumber":"022","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3L0YaK3"},
    {"itemName":"DOUGHNUT","codeNumber":"023","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00", "imgUrl": "https://bit.ly/3trLN3S"},
    {"itemName":"MUTHOKOI","codeNumber":"024","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3L4fJsC"},
    {"itemName":"BOILED EGG","codeNumber":"025","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/34YX5TT"},
    {"itemName":"FRIED EGG","codeNumber":"026","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wtjfc7"},
    {"itemName":"SAVOURY EGG","codeNumber":"027","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/36dFYyd"},
    {"itemName":"FRUITS","codeNumber":"028","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3ufiPn8"},
    {"itemName":"FRUITS - SALAD","codeNumber":"029","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/36hpi94"},
    {"itemName":"FISH -TILAPIA","codeNumber":"030","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00", "imgUrl": "https://bit.ly/3tumkXJ"},
    {"itemName":"FRUIT JUICE","codeNumber":"031","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wotlLg"},
    {"itemName":"FISH - FILLET","codeNumber":"032","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3IvDXKG"},
    {"itemName":"WHOLE FISH TILAPIA JUMBO","codeNumber":"033","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3N9Fyth"},
    {"itemName":"JUMBO Q. CAKE","codeNumber":"034","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3tumkXJ"},
    {"itemName":"FRIED FISH","codeNumber":"035","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3N9Fyth"},
    {"itemName":"GITHERI","codeNumber":"036","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3woLsAQ"},
    {"itemName":"HOT DOG ROLL","codeNumber":"037","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"45.00", "imgUrl": "https://bit.ly/36eDTlu"},
    {"itemName":"IRIO","codeNumber":"038","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3IyTwRP"},
    {"itemName":"KEBAB","codeNumber":"039","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3io1VNk"},
    {"itemName":"KALES","codeNumber":"040","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/36eEROE"},
    {"itemName":"LIVER","codeNumber":"041","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00", "imgUrl": "https://bit.ly/3iqAx1j"},
    {"itemName":"MILK","codeNumber":"043","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3Nci32E"},
    {"itemName":"MATUMBO","codeNumber":"044","staffCafeteriaPrice":"80.00","studentCafeteriaPrice":"80.00", "imgUrl": "https://bit.ly/3InOfN2"},
    {"itemName":"MANDAZI","codeNumber":"045","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3N8FLge"},
    {"itemName":"MEAT PIES","codeNumber":"046","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wqEawp"},
    {"itemName":"MANAGU","codeNumber":"049","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wxNr5M"},
    {"itemName":"MATOKE","codeNumber":"050","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/3L6334v"},
    {"itemName":"MALA","codeNumber":"052","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3N97Hkh"},
    {"itemName":"MURENDA","codeNumber":"053","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3qqLLrb"},
    {"itemName":"NDENGU","codeNumber":"054","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"11.00", "imgUrl": "https://bit.ly/3ttXas2"},
    {"itemName":"NDUMA","codeNumber":"057","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3IrOKWn"},
    {"itemName":"NOVIDA","codeNumber":"058","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3wqFYpb"},
    {"itemName":"OMENA","codeNumber":"060","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3iryBpq"},
    {"itemName":"MASHED POTATOES","codeNumber":"061","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3Jx1CMm"},
    {"itemName":"SWEET POTATOES","codeNumber":"062","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3Jx0yrA"},
    {"itemName":"WHITE POTATOES","codeNumber":"063","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3CY59Rr"},
    {"itemName":"PICANA","codeNumber":"064","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/36AM5MI"},
    {"itemName":"PILAU","codeNumber":"065","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3Juz1ah"},
    {"itemName":"QUEEN CAKE","codeNumber":"066","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3wlYhfj"},
    {"itemName":"ROCK BUN","codeNumber":"068","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/37Ib6pP"},
    {"itemName":"SAUSAGE","codeNumber":"070","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3tsrAL8"},
    {"itemName":"BEEF SAMOSA","codeNumber":"071","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3N92t87"},
    {"itemName":"SOUP","codeNumber":"075","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00", "imgUrl": "https://bit.ly/3qqtOc5"},
    {"itemName":"DIET SODA","codeNumber":"077","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/3ItJxxa"},
    {"itemName":"WATER SODA","codeNumber":"078","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00", "imgUrl": "https://bit.ly/3wqTVDF"},
    {"itemName":"SAMOSA (NDENGU)","codeNumber":"079","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"15.00", "imgUrl": "https://bit.ly/3iqGfjL"},
    {"itemName":"SAGET","codeNumber":"080","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": "https://bit.ly/3wpIfRz"},
    {"itemName":"BLACK TEA","codeNumber":"082","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"6.00", "imgUrl": "https://bit.ly/3N5P6We"},
    {"itemName":"WHITE TEA","codeNumber":"083","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3tvrse9"},
    {"itemName":"TONIC WATER","codeNumber":"088","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3CZH8cq"},
    {"itemName":"UGALI","codeNumber":"090","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"8.00", "imgUrl": "https://bit.ly/36AxiBM"},
    {"itemName":"UJI","codeNumber":"091","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3wGQ1XB"},
    {"itemName":"MIXED VEGETABLES","codeNumber":"093","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3IxygMm"},
    {"itemName":"SANDWICH","codeNumber":"095","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3trEwAX"},
    {"itemName":"KUNDE","codeNumber":"096","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00", "imgUrl": " https://bit.ly/3N82k4S"},
    {"itemName":"BOILED MAIZE","codeNumber":"097","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00", "imgUrl": "https://bit.ly/3CYhQvk"},
    {"itemName":"BUTTERNUTS","codeNumber":"098","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3ts61ug"},
    {"itemName":"MARA BUNS","codeNumber":"099","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/3Jx7mpo"},
    {"itemName":"UGALI WIMBI","codeNumber":"100","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3Ivsfjs"},
    {"itemName":"BANANA","codeNumber":"101","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00", "imgUrl": "https://bit.ly/36fk8dG"},
    {"itemName":"MURSIK","codeNumber":"103","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00", "imgUrl": "https://bit.ly/3L1FpX8"},
    {"itemName":"BHAJIA","codeNumber":"104","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00", "imgUrl": "https://bit.ly/36y9VJ5"},
    {"itemName":"Hot Dog Big","codeNumber":"108","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00", "imgUrl": "https://bit.ly/37DP3R8"},
    {"itemName":"Smoky","codeNumber":"110","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00", "imgUrl": "https://bit.ly/3tt74u5"},
    {"itemName":"Roast Chicken / chips/ugali/chapatti","codeNumber":"111","staffCafeteriaPrice":"250.00","studentCafeteriaPrice":"250.00", "imgUrl": "https://bit.ly/3qpe7lw"},
    {"itemName":"Beef Casserole","codeNumber":"112","staffCafeteriaPrice":"170.00","studentCafeteriaPrice":"170.00", "imgUrl": "https://bit.ly/3wqLw2Z"},
    {"itemName":"Fried T-Bone Steak","codeNumber":"114","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00", "imgUrl": "https://bit.ly/3tvr3IG"},
    {"itemName":"Chips and Salad","codeNumber":"119","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00", "imgUrl": "https://bit.ly/3Nd2xUf"},
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
