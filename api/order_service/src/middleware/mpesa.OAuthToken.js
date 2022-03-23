const axios = require("axios");

async getOAuthToken(req, res, next)=>{
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const url = process.env.OAUTHTOKEN_URL;

  const buffer = new Buffer.from(consumerKey+":"+consumerSecret);
  const auth = `Basic ${buffer.toString('base64')}`;

  try {
    let {data} = await axios.get(url, {
      "headers": {
        "Authorization": auth
      }
    });

    req.token  = data['access_token'];
    return next();
  } catch (e) {
    return res.json({
      success: false,
      message: err['response']['statusText']
    })
  }
}
