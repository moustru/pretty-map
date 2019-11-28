import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TOKEN: string = 'pk.eyJ1IjoibW91c3RydSIsImEiOiJjazNpeGwwc3cwYzM3M2ZucjFya2lsNnVxIn0.2CwWhxoD34kv_1zprSJ7rg'

const map = L.map('map', {
  center: [47.222078, 39.720349],
  zoom: 13
})

const marker = L.marker([47.222078, 39.720349]).addTo(map)

// const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: TOKEN
}).addTo(map);