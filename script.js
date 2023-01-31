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
        var map = L.map('map').setView(coordinates, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker(coordinates)
          .addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();

      },

      function () {
        alert('Error in getting current position');
      }
    );
}
