const github = require('../helpers/github');
module.exports = (router) => {

  router.get('/user/:username', async (req, res) => {
    let user = req.params;
    if(!user || !user.username){
      return response(404,"Username required!");
    }
    user = user.username;
    //console.log("user: ", user);
    
    const data = await github.GithubHelper.getUserData(user);
    res.json(data);
    
    function response(code, msg){
      //return res.status(code).json({status: code, Message: msg});
      return res.json({status: code, Message: msg});
    }
  });  

 
  return router;
}
