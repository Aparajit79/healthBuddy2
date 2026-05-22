
/// <reference types="vite/client" />

interface Window {
  google: {
    maps: {
      Map: any;
      Marker: any;
      InfoWindow: any;
      LatLng: any;
      LatLngLiteral: {
        lat: number;
        lng: number;
      };
      event: any;
      SymbolPath: {
        CIRCLE: number;
        FORWARD_CLOSED_ARROW: number;
        FORWARD_OPEN_ARROW: number;
        BACKWARD_CLOSED_ARROW: number;
        BACKWARD_OPEN_ARROW: number;
      };
      MapOptions: any;
      MarkerOptions: any;
    };
  };
}
