let apiLink = 'https://swapi.co/api/planets/';
let nextApi = "";
let prevApi = "";

let planets = function(link) {
    fetch(link)  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            nextApi = data.next;
            prevApi = data.previous;
            generateTable(data);
            addEventListenerResidents(link);

        });
};

planets(apiLink);

let generateTable = function f(data) {
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
            residentsHtml = `<td><button type="button" data-planetname="${element.name}" class="btn btn-primary" data-toggle="modal" data-target="#myModal">${element.residents.length} resident(s)</button></td></tr>`;

        }


        table.innerHTML += html + residentsHtml;

    }
};


function addEventListenerResidents(link) {
    let buttons = document.getElementsByClassName('btn btn-primary');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (){
            let thisButton = this;
            let planetName = thisButton.dataset.planetname;

            fetch(link)  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                for (let element of data.results) {
                    if (element.name === planetName) {
                       let residentsLinks = element.residents;
                       printResidentsTable(residentsLinks)
                    }

            }

            });

                });
            }
}



function printResidentsTable(residentsLinks) {
    let oldtable = document.getElementById('modal-body');
    let oldhtml = ``;
    oldtable.innerHTML = oldhtml;
    for (let link of residentsLinks) {
        fetch(link)  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                let table = document.getElementById('modal-body');
                let html = `<tr><td>${data.name}</td><td>${data.height}</td><td>${data.mass}</td><td>${data.skin_color}</td><td>${data.hair_color}</td><td>${data.eye_color}</td><td>${data.birth_year}</td><td>${data.gender}</td>`;
                table.innerHTML += html;


            })
    }
}




let nextButton = document.getElementById('Next');
let prevButton = document.getElementById('Previous');

nextButton.addEventListener('click', function (event) {
    let table = document.getElementById('tbody');
    htmlClear = '';
    table.innerHTML = htmlClear;
    planets(nextApi)
});

prevButton.addEventListener('click', function (event) {
    let table = document.getElementById('tbody');
    htmlClear = '';
    table.innerHTML = htmlClear;
    planets(prevApi)
});






