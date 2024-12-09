const currencyInpSrc = document.getElementById("currency_inp_src");
const currencyInpDst = document.getElementById("currency_inp_dst");

const currencySrc = document.getElementById("currency_src");
const currencyDst = document.getElementById("currency_dst");

const swapBtn = document.getElementById("swap_btn");
const rateText = document.getElementById("rate");

function calcurateCurrency() {
    const currencySrc_text = currencySrc.value;
    const currencyDst_text = currencyDst.value;
    console.log(`convert ${currencySrc_text} to ${currencyDst_text}`);

    fetch(
        `https://v6.exchangerate-api.com/v6/2106bf7a09746e8406b41420/latest/${currencySrc_text}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data.conversion_rates);
            const rate = data.conversion_rates[currencyDst_text];
            rateText.innerHTML = `1 ${currencySrc_text} = ${rate} ${currencyDst_text}`;
            currencyInpDst.value = (currencyInpSrc.value * rate).toFixed(2);
        });
}

currencySrc.addEventListener("change", calcurateCurrency);
currencyDst.addEventListener("change", calcurateCurrency);
currencyInpSrc.addEventListener("input", calcurateCurrency);
currencyInpDst.addEventListener("input", calcurateCurrency);

swapBtn.addEventListener("click", () => {
    const temp = currencySrc.value;
    currencySrc.value = currencyDst.value;
    currencyDst.value = temp;

    calcurateCurrency();
});
