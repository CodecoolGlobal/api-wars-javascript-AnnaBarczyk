function generateTable(data) {
    let table = document.getElementById('tbody');

    for (let element of data.results) {
        let html = `<tr><td>${element.name}</td><td>${element.diameter}</td><td>${element.climate}</td><td>${element.terrain}</td><td>${element.surface_water}</td><td>${element.population}</td>`;
        let residentsHtml = `<td>'No residents'</td></tr>`
        if (element.residents.length !== 0) {
            residentsHtml = `<td><button type="button" class=".resident-button">${element.residents.length} resident(s)</button></td></tr>`
        }

        table.innerHTML += html + residentsHtml;
    }

}

fetch('https://swapi.co/api/planets/')  // set the path; the method is GET by default, but can be modified with a second parameter
    .then((response) => response.json())  // parse JSON format into JS object
    .then((data) => {
        generateTable(data)
    });
