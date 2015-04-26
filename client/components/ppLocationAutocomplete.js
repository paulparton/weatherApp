(function(){

  angular.module('pp.locationAutocomplete', []);
  angular.module('pp.locationAutocomplete')
    .directive('ppLocationAutocomplete', autoCompleteDirective);

  function autoCompleteDirective(){

    var directive = {
      scope:{
        location:'=location'
      },
      link: linker
    }

    return directive;

  }

  function linker(scope, element, attrs) {

    var input  = element[0],
        autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', loadPlaces);

    function loadPlaces(){
      
      var place = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry) {
        return;
      }

      var address = '';

      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      
      console.log(address);

      scope.$apply(function(){
        scope.location = address;
        //{
          //lat:place.geometry.location.lat(),
          //lng:place.geometry.location.lng() 
        //}
      });
      

    }

}


}());
