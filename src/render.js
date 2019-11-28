let parentList = document.querySelector('.markers ul');
let markerListHTML = `<span class="markers-item-title"></span><button class="btn btn-danger btn-remove-marker">Удалить</button>`;

const Render = {
  update(map, action) {
    parentList.innerHTML = ''
    // т.к. Leaflet дает маркерам только четные ID, отфильтруем весь объект 
    let pointsIds = Object.keys(map._layers).filter(x => x % 2 == 0)

    for(var i = 1; i < pointsIds.length; i++) {
      this.createItem(map._layers[pointsIds[i]]._leaflet_id, action)
    }
  },

  createItem(id, action) {
    let li = document.createElement('li')
    li.innerHTML = markerListHTML
    li.classList.add('markers-item')
    li.setAttribute('id', id)
    li.childNodes[0].innerHTML = `Маркер №${li.getAttribute('id')}`
    li.childNodes[1].addEventListener('click', action)
    parentList.appendChild(li)
  }
}

export default Render