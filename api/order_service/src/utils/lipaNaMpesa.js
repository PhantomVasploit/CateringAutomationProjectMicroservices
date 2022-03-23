const datetime = require("node-datetime");
const axios = require("axios");

exports.lipaNaMpesaOnline = async (orderCost, phoneNumber)=>{
  const token = req.token;
  const auth = `Bearer ${token}`
  // generating password
  let url = process.env.LIPANAMPESA_URL;
  const dt = datetime.create();
  const formatted = dt.format(YmdHMS);
  const passString = process.env.SHORTCODE + process.env.PASSKEY + formatted;

  let base64EncodedPassword = Buffer.from(passString).toString('base64');
  let transcaction_type = "CustomerPayBillOnline";
  let amount = orderCost;
  let partyA = process.env.PARTY_A;// the payer 254 format
  let partyB = process.env.PARTY_B; // business registered short code
  //let phoneNumber = phoneNumber;// the payer 254 format
  let callBackUrl = `/http://127.0.0.1:5006/api/order/processpayment`; // my endpoint to process the payment
  let accountReference = "EGERTON BITES";
  let transcaction_deec = "Paymant for the food ordered recieved";

  try {
    let { data } = await axios.post(process.env.STKPUSH_URL, {
        "BusinessShortCode":process.env.BUSINESSSHORTCODE,
        "Password":base64EncodedPassword,
        "Timestamp":formatted,
        "TransactionType":transcation_type,
        "Amount":amount,
        "PartyA":partyA,
        "PartyB":partyB,
        "PhoneNumber":phoneNumber,
        "CallBackURL": callBackUrl,
        "AccountReference":accountReference,
        "TransactionDesc":transaction_desc
    }, {
      "headers":{
        "Authorization": auth
      }
    })
    .catch((e)=>{
      console.log(`Error invoking STKPUSH: ${e.message}`);
    })
  } catch (e) {
    return res.send({
         success:false,
         message:err['response']['statusText']
     });
  }
}
