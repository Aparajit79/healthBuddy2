
interface Window {
  google: {
    maps: {
      Map: typeof google.maps.Map;
      Marker: typeof google.maps.Marker;
      InfoWindow: typeof google.maps.InfoWindow;
      LatLng: typeof google.maps.LatLng;
      LatLngLiteral: google.maps.LatLngLiteral;
      event: typeof google.maps.event;
      SymbolPath: {
        CIRCLE: number;
        FORWARD_CLOSED_ARROW: number;
        FORWARD_OPEN_ARROW: number;
        BACKWARD_CLOSED_ARROW: number;
        BACKWARD_OPEN_ARROW: number;
      };
      MapOptions: google.maps.MapOptions;
      MarkerOptions: google.maps.MarkerOptions;
    };
  };
}
