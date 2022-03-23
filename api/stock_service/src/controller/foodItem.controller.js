const FoodItem = require("../models/foodItem.model");


exports.seedDatabase = (req, res)=>{
  let data = [
    {"itemName":"ALVARO","codeNumber":"001","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"AROMATIC RICE-","codeNumber":"002","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"BREAD-1/4 loaf","codeNumber":"003","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"11.00"},
    {"itemName":"BEEF","codeNumber":"004","staffCafeteriaPrice":"90.00","studentCafeteriaPrice":"84.00"},
    {"itemName":"BEANS STEW","codeNumber":"005","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"BANDIKA","codeNumber":"006","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"15.00"},
    {"itemName":"BEEF BURGER","codeNumber":"007","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"BONES","codeNumber":"008","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00"},
    {"itemName":"BLACK FOREST CAKES","codeNumber":"009","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00"},
    {"itemName":"FRIED STEAK - BEEF","codeNumber":"010","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"350.00"},
    {"itemName":"COFFEE BLACK","codeNumber":"011","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"6.00"},
    {"itemName":"COFFEE WHITE","codeNumber":"012","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"15.00"},
    {"itemName":"CHAPATI","codeNumber":"013","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"CABBAGES FRIED","codeNumber":"014","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"CHIPS","codeNumber":"015","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00"},
    {"itemName":"CAKE - SOFT","codeNumber":"016","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"CHICKEN","codeNumber":"017","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00"},
    {"itemName":"CHOCOLATE -DRINKING","codeNumber":"018","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"SMALL BOTLED WATER","codeNumber":"019","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"GRILLED CHICKEN","codeNumber":"020","staffCafeteriaPrice":"350.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"CHOCOLATE - SPOON","codeNumber":"021","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"CHICKEN STEW-LOCAL","codeNumber":"022","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"DOUGHNUT","codeNumber":"023","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00"},
    {"itemName":"MUTHOKOI","codeNumber":"024","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"EGG - BOILED","codeNumber":"025","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"15.00"},
    {"itemName":"EGG - FRIED","codeNumber":"026","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"EGG - SAVOURY","codeNumber":"027","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"FRUITS","codeNumber":"028","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"FRUITS - SALAD","codeNumber":"029","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"FISH -TILAPIA","codeNumber":"030","staffCafeteriaPrice":"150.00","studentCafeteriaPrice":"150.00"},
    {"itemName":"FRUIT JUICE","codeNumber":"031","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"FISH - FILLET","codeNumber":"032","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"WHOLE FISH TILAPIA JUMBO","codeNumber":"033","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"JUMBO Q. CAKE","codeNumber":"034","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"FISH - FRIED","codeNumber":"035","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00"},
    {"itemName":"GITHERI","codeNumber":"036","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"HOT DOG ROLL","codeNumber":"037","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"45.00"},
    {"itemName":"IRIO","codeNumber":"038","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"KEBAB","codeNumber":"039","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"KALES","codeNumber":"040","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"LIVER","codeNumber":"041","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00"},
    {"itemName":"MARGARINE","codeNumber":"042","staffCafeteriaPrice":"4.00","studentCafeteriaPrice":"4.00"},
    {"itemName":"MILK","codeNumber":"043","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"MATUMBO","codeNumber":"044","staffCafeteriaPrice":"80.00","studentCafeteriaPrice":"80.00"},
    {"itemName":"MANDAZI","codeNumber":"045","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"MEAT PIES","codeNumber":"046","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"MILO","codeNumber":"047","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"MILO - SPOON","codeNumber":"048","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"MANAGU","codeNumber":"049","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"MATOKE","codeNumber":"050","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00"},
    {"itemName":"MALTA - GUINESS","codeNumber":"051","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"MALA","codeNumber":"052","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"MURENDA","codeNumber":"053","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"NDENGU","codeNumber":"054","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"11.00"},
    {"itemName":"NESCAFE - MILK","codeNumber":"055","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"6.00"},
    {"itemName":"NESCAFE - SPOON","codeNumber":"056","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"NDUMA","codeNumber":"057","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"NOVIDA","codeNumber":"058","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"ONIONS","codeNumber":"059","staffCafeteriaPrice":"2.00","studentCafeteriaPrice":"2.00"},
    {"itemName":"OMENA","codeNumber":"060","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"POTATOES - MASHED","codeNumber":"061","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"POTATOES - SWEET","codeNumber":"062","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"POTATOES - WHITE","codeNumber":"063","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"PICANA","codeNumber":"064","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"PILAU","codeNumber":"065","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"QUEEN CAKE","codeNumber":"066","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"RICE-FULL","codeNumber":"067","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"13.00"},
    {"itemName":"ROCK BUN (BIG)","codeNumber":"068","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"ROCK BUN (SMALL)","codeNumber":"069","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"SAUSAGE","codeNumber":"070","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"SAMOSA (BEEF)","codeNumber":"071","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"SODA (SMALL)","codeNumber":"072","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"STEAK","codeNumber":"073","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00"},
    {"itemName":"SODA (BIG)","codeNumber":"074","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"SOUP","codeNumber":"075","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"SAUSAGE ROLL","codeNumber":"076","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"SODA (DIET)","codeNumber":"077","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"SODA (WATER)","codeNumber":"078","staffCafeteriaPrice":"25.00","studentCafeteriaPrice":"25.00"},
    {"itemName":"SAMOSA (NDENGU)","codeNumber":"079","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"15.00"},
    {"itemName":"SAGET","codeNumber":"080","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"SODA (LIGHT)","codeNumber":"081","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"TEA - BLACK","codeNumber":"082","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"6.00"},
    {"itemName":"TEA - WHITE","codeNumber":"083","staffCafeteriaPrice":"15.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"TATTON","codeNumber":"084","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"16.00"},
    {"itemName":"TEA SCONCE","codeNumber":"085","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"TEA BAG","codeNumber":"086","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"TOMATOE","codeNumber":"087","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"TONIC WATER","codeNumber":"088","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"TAKE AWAY","codeNumber":"089","staffCafeteriaPrice":"5.00","studentCafeteriaPrice":"5.00"},
    {"itemName":"UGALI","codeNumber":"090","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"8.00"},
    {"itemName":"UJI","codeNumber":"091","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"VIMTO","codeNumber":"092","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"VEGETABLES - MIXED","codeNumber":"093","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"HIGHLAND MINERALWATER","codeNumber":"094","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"SANDWICH","codeNumber":"095","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"KUNDE","codeNumber":"096","staffCafeteriaPrice":"40.00","studentCafeteriaPrice":"40.00"},
    {"itemName":"BOILED MAIZE","codeNumber":"097","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"BUTTERNUTS","codeNumber":"098","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"MARA BUNS","codeNumber":"099","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"UGALI WIMBI","codeNumber":"100","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"BANANA","codeNumber":"101","staffCafeteriaPrice":"10.00","studentCafeteriaPrice":"10.00"},
    {"itemName":"KERINGET MINERWATER","codeNumber":"102","staffCafeteriaPrice":"45.00","studentCafeteriaPrice":"45.00"},
    {"itemName":"MURSIK","codeNumber":"103","staffCafeteriaPrice":"35.00","studentCafeteriaPrice":"35.00"},
    {"itemName":"BHAJIA","codeNumber":"104","staffCafeteriaPrice":"60.00","studentCafeteriaPrice":"60.00"},
    {"itemName":"SAFARI PRIDE WATER","codeNumber":"105","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"BLACK MILO","codeNumber":"106","staffCafeteriaPrice":"20.00","studentCafeteriaPrice":"20.00"},
    {"itemName":"JUMBO (BIG SIZE) TILAPIA","codeNumber":"107","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"Hot Dog Big","codeNumber":"108","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"Hot Dog Small","codeNumber":"109","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"Smoky","codeNumber":"110","staffCafeteriaPrice":"30.00","studentCafeteriaPrice":"30.00"},
    {"itemName":"Roast Chicken / chips/ugali/chapatti","codeNumber":"111","staffCafeteriaPrice":"250.00","studentCafeteriaPrice":"250.00"},
    {"itemName":"Beef Casserole","codeNumber":"112","staffCafeteriaPrice":"170.00","studentCafeteriaPrice":"170.00"},
    {"itemName":"Fried Steak","codeNumber":"113","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"Fried T-Bone Steak","codeNumber":"114","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"Fried Liver","codeNumber":"115","staffCafeteriaPrice":"200.00","studentCafeteriaPrice":"200.00"},
    {"itemName":"Ngengu Curry","codeNumber":"116","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"Bean Stew / Curry","codeNumber":"117","staffCafeteriaPrice":"50.00","studentCafeteriaPrice":"50.00"},
    {"itemName":"Fried Tilapia (ugali/chips/chapatti/)","codeNumber":"118","staffCafeteriaPrice":"250.00","studentCafeteriaPrice":"250.00"},
    {"itemName":"Chips and Salad","codeNumber":"119","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00"},
    {"itemName":"Rice Pilau","codeNumber":"120","staffCafeteriaPrice":"100.00","studentCafeteriaPrice":"100.00"}
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
