require('dotenv').config();

console.log('hello');

const apiKey = process.env.API_KEY;

// const API_KEY = 'oblivus4a08bdd5ebe0c09c2dc147c3d';
// const API_TOKEN = 'd6e9f83bc27827b4b0bd39ae5d128cb9647b1e63';

//connect to oblivus api

// find out if possible to get list of each machine ID in one call

// using list VMs url: https://api.oblivus.com/cloud/virtualserver/list/?apiKey=your-API-key (required)&apiToken=your-API-token (required)

//using VM details url: https://api.oblivus.com/cloud/virtualserver/details/?apiKey=your-API-key (required)&apiToken=your-API-token (required)&vmID=your-vm-ID (required)
//every 5 minutes make a call to server to find out the status of each of my machines
