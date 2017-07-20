const {
   FACEBOOK_VERIFY_TOKEN,
   FACEBOOK_PAGE_TOKEN,
   DEBUG
 } = process.env;
 
 module.exports = {
   debug: false || DEBUG,
   receive_via_postback: true,
   verify_token: FACEBOOK_VERIFY_TOKEN,
   access_token: FACEBOOK_PAGE_TOKEN
 };