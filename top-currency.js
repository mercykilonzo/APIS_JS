
const apiKey = 'cur_live_TrOUDigrn9exLlIgcVIHaM8jDvkTQFfiUiIY1T2M';
const rateList = document.getElementById('rateList');

async function fetchRates() {
  const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    const rates = data.data;
    
    const sorted = Object.entries(rates)
      .sort((a, b) => b[1].value - a[1].value)
      .slice(0, 10); 

    sorted.forEach(([currency, info]) => {
      const li = document.createElement('li');
      li.textContent = `1 USD = ${info.value} ${currency}`;
      rateList.appendChild(li);
    });

  } catch (err) {
    rateList.innerHTML = "<li> Unable to load exchange rates.</li>";
  }
}

fetchRates();
