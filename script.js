// Récupérer les données de prix pour ETH et BTC
async function getData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
  );
  const data = await response.json();
  const btcPrices = data.prices;

  const response2 = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30"
  );
  const data2 = await response2.json();
  const ethPrices = data2.prices;

  return { btcPrices, ethPrices };
}

// Dessiner le graphique
async function drawChart() {
  const data = await getData();

  const btcData = {
    label: "BTC",
    data: data.btcPrices.map((price) => {
      return { x: price[0], y: price[1] };
    }),
    borderColor: "rgb(255, 99, 132)",
    tension: 0.1,
  };

  const ethData = {
    label: "ETH",
    data: data.ethPrices.map((price) => {
      return { x: price[0], y: price[1] };
    }),
    borderColor: "rgb(54, 162, 235)",
    tension: 0.1,
  };

  const chartData = {
    datasets: [btcData, ethData],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Prix (USD)",
        },
      },
    },
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
}

drawChart();
