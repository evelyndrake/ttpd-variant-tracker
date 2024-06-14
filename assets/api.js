fetch('/variants')
    .then(response => response.text())
    .then(data => {
        const element = document.getElementById('varNum');
        element.textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });