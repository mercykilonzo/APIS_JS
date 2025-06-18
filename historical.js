const apiKey = 'cur_live_TrOUDigrn9exLlIgcVIHaM8jDvkTQFfiUiIY1T2M';

document.getElementById('historicalForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const result = document.getElementById('result');

  if (!date) {
    result.textContent = " Please select a date.";
    return;
  }

  const url = `https://api.currencyapi.com/v3/historical?apikey=${apiKey}&date=${date}&base_currency=${from}&currencies=${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const rate = data.data[to].value;
    result.textContent = `On ${date}, 1 ${from} = ${rate} ${to}`;
  } catch (err) {
    result.textContent = " Could not fetch data.";
  }
});
