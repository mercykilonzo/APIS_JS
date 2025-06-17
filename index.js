   
   const ans = document.getElementById('result');
   async function convert() {
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const amount = document.getElementById('amount').value;
      const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_g6eHNNfiv9SxGWCma1Mb8KsDdWcIRenFDntPVvZp&base_currency=${from}&currencies=${to}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.data[to].value;
        const total = (rate * amount).toFixed(2);
        ans.textContent = `${amount} ${from} = ${total} ${to}`;
      } catch (error) {
        document.getElementById('result').innerText = "Error fetching rate.";
        console.error(error);
      }
    };




















