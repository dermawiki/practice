<script>
function fetchChartData() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm.trim()) {
        alert('검색어를 입력해주세요.');
        return;
    }

    // 예시 URL, 실제 API 엔드포인트로 변경 필요
    const url = `https://api.example.com/searchData?query=${encodeURIComponent(searchTerm)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            createPieChart(data.results);
        } else {
            console.error('Failed to fetch data:', data.message);
            alert('데이터를 가져오는 데 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('데이터를 가져오는 중 오류가 발생했습니다.');
    });
}

function createPieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    if (window.myPieChart) {
        window.myPieChart.destroy(); // 이전 차트가 있을 경우 제거
    }
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels, // 예: ['시술1', '시술2', '시술3']
            datasets: [{
                data: data.values, // 예: [300, 150, 100]
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
</script>
