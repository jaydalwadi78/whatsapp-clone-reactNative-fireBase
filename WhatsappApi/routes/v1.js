const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Invalid Request", data: { "version_number": "v1.0.0" } })
});


//user profile and details 
router.get('/users', UserController.fetchall);
router.get('/user/:user_id', UserController.fetchUserData);
router.post('/addUser', UserController.addUser);
router.put('/editUser/users/:user_id', UserController.editUser);
router.put('/editUserProfile/users/:user_id', UserController.editUserProfile);


//user last message 
router.get('/userlastmessage', UserController.userLastMessage);



// user chat messages routes
router.post('/createchatroom', UserController.createChatroom);           // http://localhost:3000/v1/createchatroom
router.post('/sendchatmessage', UserController.sendChatmessage);         // http://localhost:3000/v1/sendchatmessage
router.get('/chatmessages', UserController.fetchChatmessages);           // http://localhost:3000/v1/chatmessages
router.post('/userchatmessages', UserController.userfetchChatmessages);  // http://localhost:3000/v1/userchatmessages


// user chat more functionality (gallery, camera, audio, document, location) routes
router.post('/sendgallerymessages', UserController.sendGallerymessages);   // http://localhost:3000/v1/sendgallerymessages
router.post('/sendcameramessages', UserController.sendCameramessages);     // http://localhost:3000/v1/sendcameramessages
router.post('/sendaudiomessages', UserController.sendAudiomessages);       // http://localhost:3000/v1/sendaudiomessages
router.post('/sendvideomessages', UserController.sendVideomessages);       // http://localhost:3000/v1/sendaudiomessages
router.post('/senddocumentmessages', UserController.sendDocumentmessages); // http://localhost:3000/v1/senddocumentmessages
router.post('/sendlocationmessages', UserController.sendLocationmessages); // http://localhost:3000/v1/sendlocationmessages


module.exports = router; 