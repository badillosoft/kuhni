function ChartDoughnut() {
    const doughnut = document.createElement('canvas');
    doughnut.id = 'myChart';

    doughnut.dataset.config = JSON.stringify({
        type: 'doughnut',
        data: {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    'orange',
                    'gray',
                    'blue'
                ],
            }],
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }

    });

    doughnut.addEventListener("@update", () => {
        const config = JSON.parse(doughnut.dataset.config);
        config.options.title.text;
        config.data.datasets.data;
        config.data.datasets.backgroundColor;
        config.data.labels;
    });

    doughnut.dispatchEvent(new CustomEvent("@update"));

    window.onload = function () {
        const ctx = document.getElementById('myChart').getContext('2d');
        window.myDoughnut = new Chart(ctx, config);
    };

    return doughnut;
}