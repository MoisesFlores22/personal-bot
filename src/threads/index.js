module.exports = (controller, conversations) => {
 
   controller.hears(['hey', 'hello'], 'message_received', (bot, message) => {
     createConvo(bot, message);
   });
 
   controller.on('facebook_optin', (bot, message) => {
     createConvo(bot, message);
   });
 
   // ------ Additional Functions ------- //
 
 const createConvo = (bot, message) => {
   bot.createConversation(message, startConversation);
 };
 
  const startConversation = (err, convo) => {
    
    // Load all threads
    const normalizedPath = require('path').join(__dirname);
    require('fs').readdirSync(normalizedPath).forEach(file => {
    
      if (file === 'index.js' || file === 'utils.js') {
        return;
      }
    
      require(`./${file}`)(err, convo);
    
    });
    
    convo.on('end', conv => {
      conv.say('C ya lata!');
      conv.next();
    });
    
    convo.onTimeout(conv => {
      conv.say('Oh no! The time limit has expired.');
      conv.next();
    });
    
    // Start Conversation
    convo.gotoThread('greetings');
    convo.activate();
  };
 
 };