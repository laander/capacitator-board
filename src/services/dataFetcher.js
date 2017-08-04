export function fetcher () {
  const url = 'https://wt-3bd7299d97400fd5655b883c44d233ab-0.run.webtask.io/capacitator'
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  return fetch(url, { headers })
  .then(response => response.json())
}
