const ans = document.getElementById('result');
const swapBtn = document.getElementById('swap-btn');
const from = document.getElementById('from');
const to = document.getElementById('to');


if (swapBtn) {
  swapBtn.onclick = function() {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
  };
}

document.getElementById('rateForm').onsubmit = async function(e) {
  e.preventDefault();
  convert();
};

async function convert() {
  const amount = document.getElementById('amount').value;
  if (isNaN(amount) || amount <= 0) {
    ans.textContent = "Please enter a valid amount greater than zero.";
    return;
  }
  if (from.value === to.value) {
    ans.textContent = "Please select two different currencies.";
    return;
  }
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_g6eHNNfiv9SxGWCma1Mb8KsDdWcIRenFDntPVvZp&base_currency=${from.value}&currencies=${to.value}`;
  ans.textContent = "Fetching rate...";
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.data || !data.data[to.value]) {
      ans.textContent = "Rate data not available for this currency pair.";
      return;
    }
    const rate = data.data[to.value].value;
    const total = (rate * amount).toFixed(2);
    ans.textContent = `${amount} ${from.value} = ${total} ${to.value}`;
  } catch (error) {
    ans.textContent = "Error fetching rate.";
    console.error(error);
  }
}


















