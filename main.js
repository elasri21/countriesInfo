const counties = document.querySelector(".countries .container");

import result from "./data.json" assert { type: "json" };

for (let i = 0; i < result.length; i++) {
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  box.setAttribute("id", `${i}`)
  box.setAttribute("data-region", `${result[i].region}`);
  box.setAttribute("data-name", `${result[i].name}`);
  box.innerHTML = `
    <div class="flag">
        <img src="${result[i].flag}" alt="${result[i].name}">
    </div>
    <div class="info">
        <h2>${result[i].name}</h2>
        <p><strong>Population: </strong>${result[i].population}</p>
        <p><strong>region: </strong>${result[i].region}</p>
        <p><strong>capital: </strong>${result[i].capital}</p>
    </div>
    `;
  counties.appendChild(box);
}

// show countries of a region
const select = document.querySelector("select");
const allCountries = Array.from(
  document.querySelectorAll(".countries .container .box")
);
select.addEventListener("change", function () {
  allCountries.forEach((country) => {
    if (this.value == country.dataset.region) {
      country.style.display = "block";
    } else if (this.value == "All") {
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  });
});

// show a country
const searchField = document.querySelector(".field");
searchField.addEventListener("input", function () {
  let nation = this.value;
  let reg = new RegExp(nation, "ig");
  allCountries.forEach((country) => {
    if (country.dataset.name.toString().match(reg)) {
      country.style.display = "block";
    } else if (nation == "") {
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  });
});

//
const countryInfo = document.querySelector(".full-info .container");
searchField.addEventListener("input", function () {
  let name = this.value.toLowerCase();
  allCountries.forEach((country) => {
    if (name == country.dataset.name.toLowerCase()) {
      // back btn
      let backBtn = document.createElement("div");
      backBtn.setAttribute("class", "btn");
      backBtn.innerHTML = `
        <i class="fa-solid fa-arrow-left"></i>
        <button>back</button>
        `;
      countryInfo.appendChild(backBtn);
      // create info box
      let info = document.createElement("div");
      info.setAttribute("class", "info");
      countryInfo.appendChild(info);
      // flag
      let flag = document.createElement("div");
      flag.setAttribute("class", "big-flag");
      flag.innerHTML = `<img src="${result[+country.id].flag}" alt="${country.name}">`;
      info.appendChild(flag);
      //details-info
      let detailsInfo = document.createElement("div");
      detailsInfo.setAttribute("class", "details-info");
      let h3 = document.createElement("h3");
      let h3Txt = document.createTextNode(`${country.dataset.name}`);
      h3.appendChild(h3Txt);
      detailsInfo.appendChild(h3);
      //more-info
      let moreInfo = document.createElement("div");
      moreInfo.setAttribute("class", "more-info");
      let div1 = document.createElement("div");
      div1.innerHTML = `
                <p><strong>Native Name: </strong>${country.dataset.name}</p>
                <p><strong>Population: </strong>${result[+country.id].population}</p>
                <p><strong>Region: </strong>${result[+country.id].region}</p>
                <p><strong>Sub Region: </strong>${result[+country.id].subregion}</p>
                <p><strong>Capital: </strong>${result[+country.id].capital}</p>
                `;
      let div2 = document.createElement("div");
      let domin = document.createElement("p");
      domin.innerHTML = `<strong>Top Level Domin: </strong>${result[+country.id].topLevelDomain}`;
      // currencies
      let currencies = document.createElement("p");
      currencies.innerHTML = `<strong>Currenciese: </strong>`;
      let currLen = result[+country.id].currencies.length;
      for (let i = 0; i < currLen; i++) {
        let cuuName = document.createTextNode(`${result[+country.id].currencies[i].name}`);
        currencies.appendChild(cuuName);
      }

      // Languages
      let languages = document.createElement("p");
      languages.innerHTML = `<strong>Languages: </strong>`;
      let lanLen = result[+country.id].languages.length;
      for (let i = 0; i < lanLen; i++) {
        let lanName = document.createTextNode(`${result[+country.id].languages[i].name}`);
        languages.appendChild(lanName);
      }

            // borders
            let borderCounties = document.createElement("div");
            borderCounties.setAttribute("class", "border-counties");
            let borders = document.createElement("p");
            borders.innerHTML = `<strong>Borders: </strong>`;
            let borderLen = result[+country.id].borders.length;
            for (let i = 0; i < borderLen; i++) {
                let span = document.createElement("span");
              let spanTxt = document.createTextNode(`${result[+country.id].borders[i]}`);
              span.appendChild(spanTxt);
              borders.appendChild(span);
            }
            borderCounties.appendChild(borders);


      div2.appendChild(domin);
      div2.appendChild(currencies);
      div2.appendChild(languages);
      moreInfo.appendChild(div1);
      moreInfo.appendChild(div2);
      detailsInfo.appendChild(moreInfo);
      detailsInfo.appendChild(borderCounties);
      info.appendChild(detailsInfo);

      document.querySelector(".btn").addEventListener("click", function() {
          searchField.value = "";
          countryInfo.innerHTML = "";
          allCountries.forEach(c => c.style.display = "block");
      });
    }
  });
});
