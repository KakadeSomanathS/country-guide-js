const countryInput = document.querySelector("#country-inp");
const searchBtn = document.querySelector("#search-btn");
const countryName = document.querySelector("#countryName");
const errorMsg = document.querySelector("#errorMsg");
const countryImg = document.querySelector("#countryImg");
const resultDiv = document.querySelector("#result");
const capital = document.querySelector("#capital");
const population = document.querySelector("#population");
const currency = document.querySelector("#currency");
const commonLanguage = document.querySelector("#commonLangauge");
const timeZone = document.querySelector("#timeZone");

resultDiv.style.display = "none";

searchBtn.addEventListener("click", async () => {
  const inputData = countryInput.value;

  if (!inputData) {
    errorMsg.textContent = "Please Enter City Name";
    return;
  }

  try {
    errorMsg.textContent = "";
    const data = await fetch(
      `https://restcountries.com/v3.1/name/${inputData}?fullText=true`
    );
    const responseData = await data.json();

    if (responseData.length >=   0) {
      const res = responseData && responseData[0];
  
      localStorage.setItem(
        "countryData",
        JSON.stringify({
          name: res?.name?.common,
          flag: res?.flags?.png,
          capital: res?.capital,
          population: res?.population.toLocaleString(),
          currency:
          Object.values(res.currencies)[0]?.name || "Currency Not Found",
          language: Object.values(res.languages).map(elem => elem).join(' | ') || "Language Not Found",
          timeZone: res?.timezones || "TimeZone Not Found",
        })
      );
      countryInput.value = "";
      resultDiv.style.display = "block";


  const storedData = localStorage.getItem("countryData");

  if (storedData) {
    const countryData = JSON.parse(storedData);
    console.log(countryData)
    countryName.textContent = countryData.name;
    countryImg.src = countryData.flag;
    capital.textContent = countryData.capital;
    population.textContent = countryData.population;
    currency.textContent =countryData.currency;
    commonLanguage.textContent = countryData.language;
    timeZone.textContent = countryData.timeZone;

    resultDiv.style.display = "block";
  }
    } else {
      countryName.textContent = `Country Not Found`;
      countryImg.src = `Image Not Found`;
      currency.textContent = `Currency Not Found`;
    }
  } catch {}
});


