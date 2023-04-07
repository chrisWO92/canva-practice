const characterSelection = document.getElementById('character-selection')
const selectButton = document.getElementById('select-button')
const titansSection = document.getElementById('titans')
const verMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const moveRightBtn = document.getElementById('moveRight')
const moveLeftBtn = document.getElementById('moveLeft')
const moveUpBtn = document.getElementById('moveUp')
const moveDownBtn = document.getElementById('moveDown')

let interval

class Titan {
    constructor(name, img) {
        this.name = name
        this.img = img
        this.x = 20
        this.y = 30
        this.width = 50
        this.height = 50
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let armoredTitan = new Titan('armored-titan', './assets/armored-titan.png')
let attackTitan = new Titan('attack-titan', './assets/attack-on-titan.png')
let femaleTitan = new Titan('female-titan', './assets/female-titan.png')

let characters = [armoredTitan, attackTitan, femaleTitan]

let mapBG = new Image()
mapBG.src = './assets/map.png'

for (let i = 0; i < characters.length; i++) {
    titansSection.innerHTML += `
        <div id=${i} class="titan">
            <img src=${characters[i].img} alt=${characters[i].name} />
        </div>
    `
}

const titans = document.getElementsByClassName('titan')

let titanSelected
let titanImageSelected
let selected = false
let lienzo = mapa.getContext("2d")

for (let i = 0; i < titans.length; i++) {
    titans[i].addEventListener("click", (e) => {
        selected = true
        titanSelected = characters[i]
        titanImageSelected = e.target;
    })
}

const drawCanvas = () => {
    titanSelected.x = titanSelected.x + titanSelected.velocidadX
    titanSelected.y = titanSelected.y + titanSelected.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapBG,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        titanImageSelected,
        titanSelected.x,
        titanSelected.y, 
        titanSelected.width, 
        titanSelected.height
    )
}

const moveRight = () => {
    titanSelected.velocidadX = 5
}

const moveLeft = () => {
    titanSelected.velocidadX = -5
}

const moveUp = () => {
    titanSelected.velocidadY = -5
}

const moveDown = () => {
    titanSelected.velocidadY = 5
}

const stopMove = () => {
    titanSelected.velocidadX = 0
    titanSelected.velocidadY = 0
}

const keyPressed = (e) => {

    switch (e.key) {
        case 'ArrowRight':
            moveRight()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        default:
            break;
    }

}

const initializing = () => {

    interval = setInterval(drawCanvas, 50)

    moveRightBtn.onmousedown = moveRight
    moveRightBtn.onmouseup = stopMove

    moveLeftBtn.onmousedown = moveLeft
    moveLeftBtn.onmouseup = stopMove

    moveUpBtn.onmousedown = moveUp
    moveUpBtn.onmouseup = stopMove

    moveDownBtn.onmousedown = moveDown
    moveDownBtn.onmouseup = stopMove

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMove)
}

const selectFunction = () => {

    if (selected) {
        characterSelection.style.display = 'none'
        verMapa.style.display = 'flex'
        initializing()
    }

}



