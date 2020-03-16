


function generateTable(data) {
    let table = document.getElementById('tbody');

    for (let element of data.results) {
        let populationString = element.population;
        let populationFormatted = populationString;
        if (populationFormatted !== 'unknown') {
            let populationUnformatted = parseInt(populationString);
            populationFormatted = populationUnformatted.toLocaleString();
        }
        let html = `<tr><td>${element.name}</td><td>${element.diameter}</td><td>${element.climate}</td><td>${element.terrain}</td><td>${element.surface_water}%</td><td>${populationFormatted}</td>`;
        let residentsHtml = `<td>'No residents'</td></tr>`;
        if (element.residents.length !== 0) {
            residentsHtml = `<td><button type="button" class=".residents-button" data-planetname="${element.name}">${element.residents.length} resident(s)</button></td></tr>`;

        }


        table.innerHTML += html + residentsHtml;

    }
}


// function getResidents() {
//     console.log('residents')
//     let planetName = this.dataset[name];
//     console.log(planetName)
//
//     fetch('https://swapi.co/api/planets/')  // set the path; the method is GET by default, but can be modified with a second parameter
//     .then((response) => response.json())  // parse JSON format into JS object
//     .then((data) => {
//         for (let element of data.results) {
//             if (element.name === planetName) {
//                let residentsLinks = element.residents
//             }
//     }
//     });
//     return residentsLinks
// }

function showResidents() {
    let thisButton = this;
    let planetName = thisButton.dataset.planetname;

    fetch('https://swapi.co/api/planets/')  // set the path; the method is GET by default, but can be modified with a second parameter
    .then((response) => response.json())  // parse JSON format into JS object
    .then((data) => {
        for (let element of data.results) {
            if (element.name === planetName) {
               let residentsLinks = element.residents;
                console.log(residentsLinks);
                return residentsLinks
            }
    }
    });

};


function addEventListenerResidents() {
    let buttons = document.getElementsByClassName('.residents-button');
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", showResidents);
    }
}


let apiLink = 'https://swapi.co/api/planets/';
fetch(apiLink)  // set the path; the method is GET by default, but can be modified with a second parameter
    .then((response) => response.json())  // parse JSON format into JS object
    .then((data) => {
        generateTable(data);
        addEventListenerResidents();

    });








