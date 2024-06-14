// Update the initial number
fetch('/variants') // Fetch the number of variants from the server
    .then(response => response.text())
    .then(data => { // Update the text content of the element with the number of variants
        const element = document.getElementById('varNum');
        element.textContent = data;
    })
    .catch(error => { 
        console.error('Error:', error);
    });

// Hide table before loading
document.getElementById('varTable').style.display = 'none';

// Populate the table
fetch('/allvariants') // Fetch the array of variants from the server
    .then(response => response.json())
    .then(data => { // Populate the table with the array of variants
        const table = document.getElementById('varTableBody');
        var i = 0;
        data.forEach(variant => {
            const varFormats = variant.major_formats.join(', '); // Combine the formats into a single string
            const url = "https://www.discogs.com/release/"+variant.id; // Create the URL for the release
            const row = table.insertRow();
            row.insertCell().textContent = ++i; // Add a row number
            // Add an image to the cell
            const imageUrl = variant.thumb;
            const imgCell = row.insertCell();
            const img = document.createElement('img');
            img.style.width = '75px';
            img.style.height = '75px';
            img.src = imageUrl ? imageUrl : "https://i.imgur.com/E5yByRE.png";
            imgCell.appendChild(img);
            // Add a link to the cell
            const titleCell = row.insertCell();
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = variant.title + " ["+variant.format+"]";
            titleCell.appendChild(link);
            // Add the rest of the cells
            row.insertCell().textContent = varFormats
            row.insertCell().textContent = variant.released;
            row.insertCell().textContent = variant.label;
            row.insertCell().textContent = variant.country;
        });
        document.getElementById('varTable').style.display = 'table';
    })
    .catch(error => { 
        console.error('Error:', error);
    });

