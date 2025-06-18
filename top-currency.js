const apiKey = 'cur_live_TrOUDigrn9exLlIgcVIHaM8jDvkTQFfiUiIY1T2M';
const rateTableBody = document.getElementById('rateTableBody');

async function fetchRates() {
  const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const rates = data.data;

    const sorted = Object.entries(rates)
      .sort((a, b) => b[1].value - a[1].value)
      .slice(0, 10);

    rateTableBody.innerHTML = '';
    sorted.forEach(([currency, info], i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${currency}</td>
        <td>${info.value.toFixed(4)}</td>
      `;
      rateTableBody.appendChild(tr);
    });

  } catch (err) {
    rateTableBody.innerHTML = `<tr><td colspan="3">Unable to load exchange rates.</td></tr>`;
  }
}

fetchRates();
