const request       = require("request");
const GITHUB_USERS  = "https://api.github.com/users/";

/**
 * A GithubHelper class which has all the business logics and gets data from github.
 * @author Sailab
 */
class GithubHelper{
  constructor(user){
    this.user       = user;
    this.userRepos  = GITHUB_USERS + "" + user + "/repos";
  }

  static async getUserData(user){
    //default response
    let result = {
      Message: "",
      status: 500
    };

    let Github = new GithubHelper(user);
    let response = await this.requestJsonData(Github.userRepos).catch((exception) => {
        result.Message = exception.msg;
        result.status = 404;
    });
    if(result.status == 404){
      return result;
    }

    if(!response || response.length == 0){
      result.Message = "Nothing found for this repository";
      result.status = 404;
      return result;
    }
    
    //start from empty array then fill it in the loop
    result.data = [];

    //get repository name
    //get owner login
    for (const repo of response) {
      let dataRequired = {
        name: repo.name,
        ownerlogin: repo.owner.login,
        branches: []
      }

      //get this repo branch names and last commit sha
      //For example data from url: https://api.github.com/repos/octocat/Hello-World/branches
      //there is only single commit for each branch, so we asume it's always the last one
      //also, in each inspected branch so far this tag "{/branch}" exist at the end, 
      //so we remove it from the url otherwise the url won't work.
      let branches_url = repo.branches_url;
      if(branches_url){
        branches_url = branches_url.replace("{/branch}", "");
        let branches = await this.requestJsonData(branches_url).catch((exception) => {
            //no branch details found - for now skip this and show no error
        });

        if(branches){ //branches exist - we also asume it's always array                  
            for (const branch of branches) {
              let branchX = {name: branch.name};
              if(branch.commit && branch.commit.sha){//in case commit not exist
                branchX.sha = branch.commit.sha;
              }
              dataRequired.branches.push(branchX);
            }          
        }

      }

      result.data.push(dataRequired);
    }
    
    result.Message = "Looks good";
    result.status = 200;

    return result;
  }

  /**
   * Send HTTP request to requestURL
   * @param {*} requestUrl the URL from which to retrieve JSON data.
   */
  static requestJsonData(requestUrl) {
    
    return new Promise(function (resolve, reject) {

        let headers = {
          'Content-Type': 'application/json',
          'User-Agent': '*',
          'Cache-Control': 'no-cache'
        }
        request({method: 'GET', url: requestUrl, headers: headers}, (error, response, body) => {
              if (error) {
                  return reject({error: error, msg: "Request error"});

              }else if(!response.statusCode || !response.statusCode.toString().startsWith(2)){
                  return reject({error: response, msg: response.statusMessage});

              }
              
              try {
                  //just in case the response isn't in JSON format.
                  return resolve(JSON.parse(body));

              } catch (e) {
                  return reject({error: e, msg: "JSON Parser error"});
              }
          });
    });

  }
	  
}

module.exports.GithubHelper = GithubHelper 
