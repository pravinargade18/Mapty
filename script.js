'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map,mapEvent;
// getCurrentPosition takes 2 functions as a parameter one is for successful current position and other one is for error hanling in getting current position

if(navigator.geolocation){  //if exist
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position); //it gives object 
        const {latitude}=position.coords;   //object destructuring 
        const {longitude}=position.coords;
        // console.log(latitude,longitude);
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        // copies from leaflet overview 
        // L.map('id of the element inwhich we want to display the map')
        // L is a namespace which consist of different methods like map tileLayer and so on 

        const coordinates =[latitude,longitude];
        map = L.map('map').setView(coordinates, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        

        map.on('click', function(mapE){
            mapEvent=mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
            
        })
      },

      function () {
        alert('Error in getting current position');
      }
    );
}


form.addEventListener('submit', function(e){
  // display mark
    e.preventDefault();
//   console.log(mapEvent);

    inputDistance.value=inputCadence.value=inputDuration.value=inputDuration.value=''; //clearing form

  const {lat,lng}=mapEvent.latlng;
  L.marker([lat,lng])
    .addTo(map)
    .bindPopup(L.popup({  //customized popup window with the help of library docs
      maxWidth:250,
      minWidth:100,
      autoClose:false,
      closeOnClick:false,
      className:'running-popup'
    })).setPopupContent('workout')
    .openPopup();
})

inputType.addEventListener('change', function() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
})