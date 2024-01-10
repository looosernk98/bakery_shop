const ROOT_URL = 'http://localhost:8000/api/v1'
function getApiData(apiUrl) {
    const url = `${ROOT_URL}${apiUrl}`
    return fetch(url).then(response => response.json().catch(error => error));
}

export default getApiData;