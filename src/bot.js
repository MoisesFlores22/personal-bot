require('dotenv').config();
 
 // Load Configuration
 const witConfig = require('./config/wit');
 const botkitConfig = require('./config/botkit');
 
 // Init Botkit
 const Botkit = require('botkit');
 const wit = require('botkit-witai')(witConfig);
 
 const controller = Botkit.facebookbot(botkitConfig);
 const bot = controller.spawn();
 controller.middleware.receive.use(wit.receive);
 
 // Init Threads
 //require('./threads/index')(controller);
 
 // Setup Webserver
 const { PORT } = process.env;
 controller.setupWebserver(PORT, (err, webserver) => {
   controller.createWebhookEndpoints(controller.webserver, bot, () => {
     console.log('moy Bot is online!');
   });
 });