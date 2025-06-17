const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const swapBtn = document.getElementById('swapBtn');
const result = document.getElementById('result');
const amountInput = document.getElementById('amount');

swapBtn.addEventListener('click', () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  result.textContent = '';
});

document.getElementById('rateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;
  if (!amount || amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }
  if (from === to) {
    result.textContent = "Please select two different currencies.";
    return;
  }
  result.textContent = "Fetching rate...";

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    if (!data.rates || !data.rates[to]) {
      result.textContent = "No data available for this currency pair.";
      return;
    }
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(4);
    result.textContent = `Rate: 1 ${from} = ${rate} ${to} | ${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    result.textContent = "Could not fetch data. Please try again later.";
  }
});
