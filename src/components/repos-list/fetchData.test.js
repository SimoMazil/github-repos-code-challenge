require('es6-promise').polyfill();
require('isomorphic-fetch');

getRepos = async (dateQuery, page) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=created:>${dateQuery}&page=${page}&sort=stars&order=desc`)
  const data = await response.json()
  return data;
}

test('fetch data is defined', async () => {
  return getRepos(new Date(), 1).then(data => {
    expect(data).toBeDefined();
  });
});
