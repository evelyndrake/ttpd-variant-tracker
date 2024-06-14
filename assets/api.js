fetch('/variants') // Fetch the number of variants from the server
    .then(response => response.text())
    .then(data => { // Update the text content of the element with the number of variants
        const element = document.getElementById('varNum');
        element.textContent = data;
    })
    .catch(error => { // Handle errors
        console.error('Error:', error);
    });