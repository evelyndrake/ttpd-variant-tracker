var express = require('express');
var path = require('path');
var app = express();
var userAgent = 'TTPDVariantTracker/1.0';
var dotenv = require('dotenv');
const axios = require('axios');
// Environment variables
dotenv.config();
var discogsToken = process.env.DISCOGS_TOKEN;
var port = process.env.PORT || 3000;

app.use('/assets',express.static(__dirname + '/assets'));

// Serve the index.html file
app.get('/', function(request,response){
	response.sendFile('index.html',{root:path.join(__dirname,'./views')});
});

// Get the number of variants for the album
app.get('/variants', async function(request, response) {
	try {
		const url = 'https://api.discogs.com/masters/3461018/versions';
		const discogsResponse = await axios.get(url, {
			headers: {
				'User-Agent': userAgent,
				'Authorization': `Discogs token=${discogsToken}`
			}
		});
		const items = discogsResponse.data.pagination.items;
		response.send(`${items}`);
	} catch (error) {
		console.error(error);
		response.status(500).send('Internal Server Error');
	}
});

app.listen(port,function(){
	console.log('Listening at port',port);
});

module.exports = app;