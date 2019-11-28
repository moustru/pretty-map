import './index.html'
import './index.scss'
require.context('./images/', true, /\.(jpe?g|png|svg)$/);

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Render from './render'

const TOKEN = 'pk.eyJ1IjoibW91c3RydSIsImEiOiJjazNpeGwwc3cwYzM3M2ZucjFya2lsNnVxIn0.2CwWhxoD34kv_1zprSJ7rg'
const points = []
const map = L.map('map', {
  center: [47.222078, 39.720349],
  zoom: 13
})

let polygon, marker

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: TOKEN
}).addTo(map)

map.on('click', e => {
  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
  points.push({
    id: marker._leaflet_id,
    lat: e.latlng.lat,
    lng: e.latlng.lng
  })

  Render.createItem(marker._leaflet_id, deletePoint)
})

document.querySelector('.btn-add-polygon').addEventListener('click', () => {
  let arr = []

  points.forEach(x => {
    arr.push([x.lat, x.lng])
  })

  polygon = L.polygon(arr).addTo(map)
})

document.querySelector('.btn-del-polygon').addEventListener('click', deletePolygon)

function deletePolygon() {
  map.removeLayer(polygon)
}

function deletePoint(e) {
  let relatedId = e.target.parentNode.getAttribute('id')
  let relatedPoint = points.find(x => x.id === Number(relatedId))
  let marker = map._layers[e.target.parentNode.getAttribute('id')]

  if(map.hasLayer(polygon)) deletePolygon()
  points.splice(points.indexOf(relatedPoint), 1)

  map.removeLayer(marker)
  Render.update(map, deletePoint)
}