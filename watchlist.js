const apiKey = 'cur_live_TrOUDigrn9exLlIgcVIHaM8jDvkTQFfiUiIY1T2M';
const watchlist = document.getElementById('watchlist');
const addedPairs = new Set();

document.getElementById('watchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const pair = `${from}/${to}`;

  if (from === to) {
    alert("Please select two different currencies.");
    return;
  }
  if (addedPairs.has(pair)) return;

  const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.data[to].value.toFixed(2);

    const li = document.createElement('li');
    li.textContent = `1 ${from} = ${rate} ${to}`;
    watchlist.appendChild(li);
    addedPairs.add(pair);
  } catch {
    alert("Failed to add to watchlist");
  }
});
