export {googleMap as default};

const googleMap = document.createElement('div');
googleMap.id = 'googleMap';
googleMap.className = 'feedback__image';

function initMap() {
  const uluru = {lat: 48.467833, lng: 35.045326};
  const map = new google.maps.Map(googleMap, {
    zoom: 13,
    center: uluru,
  });
  const marker = new google.maps.Marker({position: uluru, map});
}
window.initMap = initMap;

const googleMapsScript = document.createElement('script');
googleMapsScript.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyArtnERhFcemFd6xWTBfbjyJYRCK6fvgMw&callback=initMap';
document.body.appendChild(googleMapsScript);
