const github = require('../backend/helpers/github');
const user = "octocat";

test(`Is repos url format for ${user} is correct'`, () => {
    expect.assertions(1);
    expect(new github.GithubHelper(user).userRepos).toBe(`https://api.github.com/users/octocat/repos`);
});

it(`Is data found for user ${user}`, async () => {
    expect.assertions(1);
    const data = await github.GithubHelper.getUserData(user);
    console.log("data: ", data);
    expect(Array.isArray(data.data) && data.data.length > 0).toBe(true);
});