import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Point {
  lat: number
  lng: number
}

const TOKEN: string = 'pk.eyJ1IjoibW91c3RydSIsImEiOiJjazNpeGwwc3cwYzM3M2ZucjFya2lsNnVxIn0.2CwWhxoD34kv_1zprSJ7rg'
const points: Point[] = []

const map = L.map('map', {
  center: [47.222078, 39.720349],
  zoom: 13
})

// const marker = L.marker([47.222078, 39.720349]).addTo(map)

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: TOKEN
}).addTo(map);

map.on('click', e => {
  L.marker([ e.latlng.lat, e.latlng.lng ]).addTo(map)
  points.push({
    lat: e.latlng.lat,
    lng: e.latlng.lng
  })

  console.log(points)
})

document.querySelector('.btn-success').addEventListener('click', () => {
  let arr = []
  
  points.forEach(x => {
    arr.push([ x.lat, x.lng ])
  })
  
  L.polygon(arr).addTo(map)
})