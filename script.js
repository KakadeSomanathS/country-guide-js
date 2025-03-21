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
    // countryImg.src = "";
    return;
  }

  try {
    errorMsg.textContent = "";
    const data = await fetch(
      `https://restcountries.com/v3.1/name/${inputData}?fullText=true`
    );
    const responseData = await data.json();
    console.log("Api response", responseData);

    if (responseData.length > 0) {
      countryName.textContent = responseData[0]?.name?.common;
      countryImg.src = responseData[0]?.flags?.png;
      capital.textContent = responseData[0]?.capital;
      population.textContent = responseData[0]?.population;
      currency.textContent = responseData[0]?.currencies?.INR?.name || 'Currency Not Found';
      commonLanguage.textContent = responseData[0]?.languages?.eng || "Language Not Found";
      timeZone.textContent = responseData[0]?.timezones || "TimeZone Not Found";
      localStorage.setItem('country',inputData)
      countryInput.value = "";
      resultDiv.style.display = "block";
    } else {
      countryName.textContent = `Country Not Found`;
      countryImg.src = `Image Not Found`;
      currency.textContent = `Currency Not Found`;
    }
  } catch {}
});
