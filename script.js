const chartColors = {
    primary: 'rgba(29, 155, 240, 0.8)',
    secondary: 'rgba(113, 118, 123, 0.8)',
    success: 'rgba(0, 186, 124, 0.8)',
    warning: 'rgba(255, 212, 0, 0.8)',
    danger: 'rgba(244, 33, 46, 0.8)',
};

Chart.defaults.color = '#71767b';
Chart.defaults.borderColor = '#2f3336';

// follower growth data
const followerData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Followers',
        data: [11200, 11650, 12100, 12847],
        borderColor: chartColors.primary,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
    }]
};

// engagement metrics
const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Likes',
            data: [320, 450, 380, 520, 490, 610, 580],
            backgroundColor: chartColors.primary,
        },
        {
            label: 'Comments',
            data: [45, 67, 52, 78, 65, 89, 76],
            backgroundColor: chartColors.secondary,
        },
        {
            label: 'Shares',
            data: [12, 23, 18, 34, 28, 41, 35],
            backgroundColor: chartColors.success,
        }
    ]
};

// content performance
const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Reach (thousands)',
        data: [45, 52, 61, 68, 74, 84],
        borderColor: chartColors.secondary,
        backgroundColor: 'rgba(118, 75, 162, 0.1)',
        tension: 0.4,
        fill: true,
    }]
};

// post types distribution
const distributionData = {
    labels: ['Images', 'Videos', 'Text', 'Links'],
    datasets: [{
        data: [45, 30, 15, 10],
        backgroundColor: [
            chartColors.primary,
            chartColors.secondary,
            chartColors.success,
            chartColors.warning,
        ],
    }]
};

const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        }
    }
};

// initialize all charts
function initCharts() {
    new Chart(document.getElementById('follower-chart'), {
        type: 'line',
        data: followerData,
        options: chartConfig
    });

    new Chart(document.getElementById('engagement-chart'), {
        type: 'bar',
        data: engagementData,
        options: chartConfig
    });

    new Chart(document.getElementById('performance-chart'), {
        type: 'line',
        data: performanceData,
        options: chartConfig
    });

    new Chart(document.getElementById('distribution-chart'), {
        type: 'doughnut',
        data: distributionData,
        options: chartConfig
    });
}

// update stats based on date range
document.getElementById('date-range').addEventListener('change', (e) => {
    const days = parseInt(e.target.value);

    // just multiply by a factor based on range
    const multiplier = days === 7 ? 0.3 : days === 30 ? 1 : 3;

    document.getElementById('total-followers').textContent =
        (12847 * (0.8 + multiplier * 0.1)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById('total-posts').textContent =
        Math.floor(234 * multiplier);

    document.getElementById('reach').textContent =
        (84.2 * multiplier).toFixed(1) + 'K';
});

window.addEventListener('load', initCharts);
