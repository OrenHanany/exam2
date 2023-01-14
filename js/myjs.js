let myURL= "https://restcountries.com/v3.1/all";

let myData = [];
let regions= [];
let region = {};
let all=false;

$.ajax({
    url: myURL,
    success: (response) => {
      myData = response;
    },
    error: (error) => {
      console.log(error);
    },
});


$("#medina").click(() => {
    $("#allCountries").html(getData());
});
$("#all").click(() => {
    all=true;
    $("#allCountries").html(getData());
    all=false;
});

const getData = () => {
    let divData= "<p>statistics:</P>";
    let allPopulation = 0;
    let avePopulation =0;
    let countryNumber =0;
    myData.map ((country) => {
        if (country.name.common.includes($("#country").val()) || all==true) {
            allPopulation += country.population;
            countryNumber += 1;
        }
    })
    avePopulation= allPopulation/countryNumber;
    avePopulation= Math.round(avePopulation);
    divData += `<p>A- number of countries: ${countryNumber}</p>`;
    divData += `<p>B- Population: ${allPopulation}</p>`;
    divData += `<p>C- Ave Population: ${avePopulation}</p>`
    divData += "<table class='center' style='direction: ltr';>";
    divData += "<tr><td>Country Name</td><td>Number of citizens</td></tr>"
    regions=[];
    region={};
    myData.map ((country) => {
        if (country.name.common.includes($("#country").val()) || all == true) {
        divData += "<tr >";
        divData += `<td>${country.name.common}</td>`;
        divData += `<td>${country.population}</td>`
        divData += "</tr>";
        if (!regions.includes(country.region)){
            regions.push(country.region);
            region[country.region]=1;
        }
        else {
            region[country.region]+=1
        }
        }
    })
    divData += "</table><br/>";
    divData += "<table class='center' style='direction: ltr';>";
    divData += "<tr><td>Region</td><td>Number of countries</td></tr>"
    regions.map((item) => {
        divData+=`<tr><td>${item}</td><td>${region[item]}</td></tr>`
    })
    divData += "</table><br/>";
    return divData;
}


