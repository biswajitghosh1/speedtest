function runSpeedTest() {
    // Reset progress bar and error message
    document.getElementById('progressBar').style.width = '0';
    document.getElementById('errorMessage').innerText = '';

    // Simulate a simple progress update for demonstration purposes
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        document.getElementById('progressBar').style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(progressInterval);
            fetchData();  // Call the function to fetch speed test results
        }
    }, 500);
}

function fetchData() {
    fetch('/get_speed')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('downloadResult').innerText = `Download Speed: ${data.download_speed.toFixed(2)} Mbps`;
            document.getElementById('uploadResult').innerText = `Upload Speed: ${data.upload_speed.toFixed(2)} Mbps`;
            document.getElementById('pingResult').innerText = `Ping: ${data.ping.toFixed(2)} ms`;
            document.getElementById('latencyResult').innerText = `Latency: ${data.latency.toFixed(2)} ms`;

            if (data.is_fast) {
                document.getElementById('fastMessage').innerText = "Internet speed is Fast!";
            } else if (data.download_speed < 10) {
                document.getElementById('fastMessage').innerText = "Internet speed is Slow!";
            } else if (data.download_speed >= 10 && data.download_speed <= 15) {
                document.getElementById('fastMessage').innerText = "Internet speed is OK!";
            } else {
                document.getElementById('fastMessage').innerText = "";
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerText = `Error: ${error.message}`;
        });
}