const AVERAGE_COST = 1.6;

async function fetchStockData() {
    const response = await fetch('assets/stock-data.json');
    const data = await response.json();
    return data;
}

function calculateEarningsPercentage(currentPrice, averageCost) {
    return ((currentPrice - averageCost) / averageCost) * 100;
}

async function createChart() {
    const stockData = await fetchStockData();
    const dates = stockData.values.map(entry => entry.datetime);
    const prices = stockData.values.map(entry => parseFloat(entry.close));

    const ctx = document.getElementById('hitiChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'Stock Price',
                data: prices.reverse(),
                backgroundColor: 'rgba(30, 235, 176, 0.2)',
                borderColor: 'rgba(30, 235, 176, 1)',
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    ticks: {
                        callback: function (value, index, values) {
                            const date = new Date(this.getLabelForValue(value));
                            return date.toLocaleString('default', { month: 'short' });
                        }
                    }
                },
                y: {
                    display: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });

    const overallEarningsElement = document.getElementById('overallEarnings');
    const currentPriceElement = document.getElementById('currentPrice');
    const currentPrice = prices[prices.length - 1];
    const earningsPercentage = calculateEarningsPercentage(currentPrice, AVERAGE_COST);

    currentPriceElement.textContent = `Price: \$${currentPrice.toFixed(2)}`;

    if (earningsPercentage >= 0) {
        overallEarningsElement.textContent = `Gain: ${earningsPercentage.toFixed(2)}%`;
        overallEarningsElement.classList.add('gain');
        overallEarningsElement.classList.remove('loss');
    } else {
        overallEarningsElement.textContent = `Loss: ${Math.abs(earningsPercentage).toFixed(2)}%`;
        overallEarningsElement.classList.add('loss');
        overallEarningsElement.class
    }
}

createChart();