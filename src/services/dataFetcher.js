export function fetcher (endpoint) {
  const url = endpoint
  // const headers = new Headers()
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return fetch(url, { headers })
    .then(response => response.json())
}
