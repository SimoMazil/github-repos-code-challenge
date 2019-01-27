export default async (dateQuery, page) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=created:>${dateQuery}&page=${page}&sort=stars&order=desc`)
  const data = await response.json()
  return data.items
}