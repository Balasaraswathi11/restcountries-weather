var body=document.getElementById("body")//selecting the body


var bossdiv=document.createElement("div")//creating bossdiv
bossdiv.className='container'//giving id according to the testcase
body.append(bossdiv)//appending bossdiv to the body


var heading=document.createElement("h1")//creating h1 tag
heading.id="title" //giving id and className according to the testcase
heading.classList.add("text-center")
heading.textContent="Rest Countries and weather details"


    var rowdiv=document.createElement("div")// creating row tag
    rowdiv.id="country-cards"
    rowdiv.className="row"

    var coldiv1=bossdiv.append(heading,rowdiv)//creating a div for column



//fetching data from restcountries
async function fetchrestcountry(){
    var fetchcountry=await fetch("https://restcountries.com/v3.1/all");
    var res=await fetchcountry.json()
    return res
}

fetchrestcountry().then(data => {
    console.log(data);
    data.forEach(country => {
        var coldiv = document.createElement("div");
        coldiv.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4","container","mb-3");//adding the bootstrap styles
        rowdiv.append(coldiv)

        var card = document.createElement("div");
        card.classList.add("card", "border", "border-black","h-100","mb-2","p-3","mb-2","bg-secondary","text-white");
        coldiv.append(card);

        //cardheader - for displaying country names

        var cardheader = document.createElement("div");
        cardheader.classList.add("card-header", "border", "border-black", "fs-4","text-white","bg-dark","text-center");
        cardheader.textContent = country.name.common;
        card.append(cardheader);

        //img- for displaying the flag

        let cardflag = document.createElement("img");
        cardflag.classList.add("card-img-top", "cardflag", "h-100", "img-fluid", "d-flex", "justify-content-center", "align-items-center","p-3");
        cardflag.src = country.flags.png;
        card.appendChild(cardflag);


        //div for the country details
        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body");

        let cardtext=document.createElement("div")
        cardtext.className="card-text"
        cardbody.appendChild(cardtext)
        card.appendChild(cardbody)

        //capital
        var capitalParagraph = document.createElement("p");
        capitalParagraph.id = "capital";
        capitalParagraph.classList.add("text-center", "fs-4");

        var boldText = document.createElement("b");
        boldText.textContent = "Capital: ";
        boldText.className="boldregion"

        capitalParagraph.appendChild(boldText);
        capitalParagraph.append(` ${country.capital}`);
        cardtext.appendChild(capitalParagraph)


    //region
    var regionpara=document.createElement("p")
    regionpara.className="region fs-4 text-center"
    var regiontext=document.createElement("b")
    regiontext.textContent="Region: "
    regiontext.className="boldregion"
    regionpara.append(regiontext)
    regionpara.append(`${country.region}`)
    cardtext.appendChild(regionpara)


    //latitude
    var latitudepara=document.createElement("p")
    latitudepara.className="lat fs-4 text-center"
    var latitudeparatext=document.createElement("b")
    latitudeparatext.textContent="Latitude: "
    latitudeparatext.className="boldregion"
    latitudepara.append(latitudeparatext)
    latitudepara.append(`${country.capitalInfo.latlng[0]}`)
    cardtext.appendChild(latitudepara)



    //longitude
    var Longitute=document.createElement("p")
    Longitute.className="longitutite fs-4 text-center"
    var Longitutetext=document.createElement("b")
    Longitutetext.textContent="Longitute: "
    Longitutetext.className="boldregion"
    
    Longitute.append(Longitutetext)
    Longitute.append(`${country.capitalInfo.latlng[1]}`)
    cardtext.appendChild(Longitute)


    //country-code
    var codepara=document.createElement("p")
    codepara.className="code fs-4 text-center"
    var codetext=document.createElement("b")
    codetext.textContent="Code: "
    codetext.className="boldregion"
    codepara.append(codetext)
    codepara.append(`"${country.cca3}"`)
    cardtext.appendChild(codepara)


    //weather button
    var weatherdiv=document.createElement("div")
    weatherdiv.className="weather-div d-flex justify-content-center p-5"
    weatherbutton.innerText="Check Weather"
    weatherbutton.className=" button btn btn-primary "
    weatherdiv.appendChild(weatherbutton)
    cardbody.append(weatherdiv)


    //fetching weather

weatherbutton.addEventListener("click", () => {
            let lat = country.capitalInfo.latlng[0];
            let lon = country.capitalInfo.latlng[1];

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7225c7238c0d09736e27b9c99516154f&units=metric`)
                .then(response => response.json())
                .then(weatherData => {
                    
                    alert(`Weather for ${country.name.common}:
    Temperature: ${weatherData.main.temp} °C
    Weather: ${weatherData.weather[0].description}
    Wind Speed: ${weatherData.wind.speed} m/s
    Humidity: ${weatherData.main.humidity}%`);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    });
});



