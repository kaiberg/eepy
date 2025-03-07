async function getLocations() {
	let response = await fetch("https://corsproxy.io/?https%3A%2F%2Fapi.steampowered.com%2FISteamApps%2FGetSDRConfig%2Fv1%2F%3Fappid%3D730");
  let json = await response.json();
  
  let pops = json.pops;
  let lots = [];

	for (var key of Object.keys(pops)) {
  	let name = pops[key].desc;
  	let [longitude, latitude] = pops[key].geo;
  
  	lots.push({
    	name,
      longitude,
      latitude
    })
  }

  return lots;
}

async function getUserLocation() {
	let location = await navigator.geolocation.getCurrentPosition();
  
  return [position.coords.latitude, position.coords.longitude];
}

var element = document.getElementById('osm-map');
element.style = 'height:300px;';

// Create Leaflet map on map element.
var map = L.map(element).setView([0, 0], 2);

// Add OSM tile layer to the Leaflet map.
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

getLocations().then(lots => {
	for (var lot of lots) {

	L.marker([lot.latitude, lot.longitude]).addTo(map).bindPopup(lot.name);
}
});

getUserLocation().then(location => {
	// todo
});
