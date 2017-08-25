import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  destination1: any = '';
  MyLocation: any;
  request:any;




  constructor(public navCtrl: NavController) {

    let that = this;
    setInterval(function(){
      that.calculateAndDisplayRoute();
    },5000)

  }
  
   calculateAndDisplayRoute() {
     let  that = this;
     let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 20,
          center: {lat: 19.028470  , lng: 99.896315}
        });
        directionsDisplay.setMap(map);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
           map.setCenter(pos);
           that.MyLocation = new google.maps.LatLng(pos);
           
          
        });

        that.request={
          origin: that.MyLocation,
          destination: this.destination1,
          travelMode: 'DRIVING'
           };
        directionsService.route(that.request, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

         
           

        } 
       
       
}
}