import { Hospital } from "@/types/hospital";

// Default map styles
export const mapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }, { lightness: 17 }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }, { lightness: 18 }]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }, { lightness: 16 }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#dedede" }, { lightness: 21 }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ color: "#fefefe" }, { lightness: 20 }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
  }
];

// Load the Google Maps script
export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error("Failed to load Google Maps")));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        reject(new Error("Google Maps failed to initialize"));
      }
    };
    
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
};

// Get user's current location with better error handling
export const getUserLocation = (): Promise<{lat: number, lng: number}> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got user location:", position.coords.latitude, position.coords.longitude);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Geolocation error, using default location:", error);
          // Default to San Francisco if geolocation fails
          resolve({ lat: 37.7749, lng: -122.4194 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log("Geolocation not supported, using default location");
      resolve({ lat: 37.7749, lng: -122.4194 });
    }
  });
};

// Create markers for hospitals
export const createHospitalMarkers = (
  map: any,
  hospitals: Hospital[]
): any[] => {
  if (!window.google || !window.google.maps) {
    console.error("Google Maps not loaded");
    return [];
  }

  return hospitals.map(hospital => {
    return new window.google.maps.Marker({
      position: { lat: hospital.lat, lng: hospital.lng },
      map,
      title: hospital.name,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#06b6d4",
        fillOpacity: 1,
        strokeColor: "#0891b2",
        strokeWeight: 2,
      }
    });
  });
};

// Create and open info window for selected hospital
export const showHospitalInfoWindow = (
  map: any,
  selectedHospital: Hospital
): any => {
  if (!window.google || !window.google.maps) {
    console.error("Google Maps not loaded");
    return null;
  }

  const infoWindow = new window.google.maps.InfoWindow({
    content: `
      <div style="padding: 10px;">
        <h3 style="font-weight: bold; margin-bottom: 5px;">${selectedHospital.name}</h3>
        <p>${selectedHospital.address}</p>
      </div>
    `
  });

  const marker = new window.google.maps.Marker({
    position: { lat: selectedHospital.lat, lng: selectedHospital.lng },
    map
  });
  
  infoWindow.open(map, marker);
  return infoWindow;
};

// Enhanced function to find nearby hospitals based on user location
export const findNearbyHospitals = (userLocation: {lat: number, lng: number}): Hospital[] => {
  console.log("Finding hospitals near:", userLocation);
  
  // Comprehensive hospital database for all major Indian cities
  const hospitalDatabase: Hospital[] = [
    // Mumbai
    { id: 1, name: "Kokilaben Dhirubhai Ambani Hospital", address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Mumbai", lat: 19.1197, lng: 72.8269 },
    { id: 2, name: "Lilavati Hospital", address: "A-791, Bandra Reclamation, Mumbai", lat: 19.0534, lng: 72.8257 },
    { id: 3, name: "Breach Candy Hospital", address: "60A, Bhulabhai Desai Rd, Mumbai", lat: 18.9667, lng: 72.8081 },
    { id: 4, name: "Jaslok Hospital", address: "15, Dr. Deshmukh Marg, Mumbai", lat: 18.9696, lng: 72.8118 },
    { id: 5, name: "Hinduja Hospital", address: "Veer Savarkar Marg, Mahim, Mumbai", lat: 19.0330, lng: 72.8397 },

    // Delhi
    { id: 6, name: "All India Institute of Medical Sciences (AIIMS)", address: "Sri Aurobindo Marg, New Delhi", lat: 28.5672, lng: 77.2100 },
    { id: 7, name: "Apollo Hospital Delhi", address: "Sarita Vihar, New Delhi", lat: 28.5245, lng: 77.2887 },
    { id: 8, name: "Fortis Hospital Noida", address: "B-22, Sector 62, Noida", lat: 28.6187, lng: 77.3684 },
    { id: 9, name: "Max Super Speciality Hospital", address: "2, Press Enclave Road, Saket, New Delhi", lat: 28.5245, lng: 77.2066 },
    { id: 10, name: "Sir Ganga Ram Hospital", address: "Rajinder Nagar, New Delhi", lat: 28.6378, lng: 77.1982 },

    // Chennai
    { id: 11, name: "Apollo Hospital Chennai", address: "21 Greams Lane, Chennai, Tamil Nadu", lat: 13.0569, lng: 80.2466 },
    { id: 12, name: "Fortis Malar Hospital", address: "52 1st Main Rd, Gandhi Nagar, Chennai", lat: 13.0394, lng: 80.2297 },
    { id: 13, name: "MIOT International", address: "4/112, Mount Poonamalle Road, Chennai", lat: 13.0324, lng: 80.1986 },
    { id: 14, name: "Global Health City", address: "439, Cheran Nagar, Chennai", lat: 13.0123, lng: 80.2086 },
    { id: 15, name: "Vijaya Hospital", address: "434, N.S.K. Salai, Chennai", lat: 13.0445, lng: 80.2182 },

    // Bangalore
    { id: 16, name: "Manipal Hospital Bangalore", address: "98, Rustom Bagh, Bangalore", lat: 12.9876, lng: 77.5955 },
    { id: 17, name: "Apollo Hospital Bangalore", address: "154/11, Bannerghatta Rd, Bangalore", lat: 12.9057, lng: 77.5996 },
    { id: 18, name: "Fortis Hospital Bangalore", address: "14, Cunningham Rd, Bangalore", lat: 12.9716, lng: 77.5946 },
    { id: 19, name: "Narayana Health City", address: "258/A, Bommasandra, Bangalore", lat: 12.8068, lng: 77.6749 },
    { id: 20, name: "Columbia Asia Hospital", address: "Kirloskar Business Park, Bangalore", lat: 12.8955, lng: 77.6412 },

    // Hyderabad
    { id: 21, name: "Apollo Hospital Hyderabad", address: "Jubilee Hills, Hyderabad", lat: 17.4326, lng: 78.4071 },
    { id: 22, name: "Care Hospital Hyderabad", address: "Road No. 1, Banjara Hills, Hyderabad", lat: 17.4167, lng: 78.4499 },
    { id: 23, name: "KIMS Hospital", address: "Minister Road, Secunderabad", lat: 17.4399, lng: 78.4983 },
    { id: 24, name: "Continental Hospital", address: "IT Park Road, Nanakramguda, Hyderabad", lat: 17.4239, lng: 78.3636 },
    { id: 25, name: "Yashoda Hospital", address: "Raj Bhavan Road, Somajiguda, Hyderabad", lat: 17.4184, lng: 78.4591 },

    // Kolkata
    { id: 26, name: "Apollo Gleneagles Hospital", address: "58, Canal Circular Road, Kolkata", lat: 22.5244, lng: 88.3924 },
    { id: 27, name: "AMRI Hospital", address: "JC-16 & 17, Salt Lake City, Kolkata", lat: 22.5626, lng: 88.4119 },
    { id: 28, name: "Fortis Hospital Kolkata", address: "730, Anandapur, Kolkata", lat: 22.5107, lng: 88.3683 },
    { id: 29, name: "Ruby General Hospital", address: "16, Alipore Road, Kolkata", lat: 22.5355, lng: 88.3347 },
    { id: 30, name: "Belle Vue Clinic", address: "9, Dr. U. N. Brahmachari Street, Kolkata", lat: 22.5535, lng: 88.3507 },

    // Pune
    { id: 31, name: "Ruby Hall Clinic", address: "40, Sassoon Road, Pune", lat: 18.5314, lng: 73.8446 },
    { id: 32, name: "Jehangir Hospital", address: "32, Sassoon Road, Pune", lat: 18.5204, lng: 73.8567 },
    { id: 33, name: "Deenanath Mangeshkar Hospital", address: "Erandwane, Pune", lat: 18.5089, lng: 73.8235 },
    { id: 34, name: "KEM Hospital", address: "Rasta Peth, Pune", lat: 18.5112, lng: 73.8436 },
    { id: 35, name: "Aditya Birla Memorial Hospital", address: "Chinchwad, Pune", lat: 18.6298, lng: 73.8131 },

    // Ahmedabad
    { id: 36, name: "Apollo Hospital Ahmedabad", address: "Plot No 1A, GIDC, Gandhinagar", lat: 23.2156, lng: 72.6369 },
    { id: 37, name: "Zydus Hospital", address: "Nr. Sola Bridge, S.G. Highway, Ahmedabad", lat: 23.0685, lng: 72.5290 },
    { id: 38, name: "Sterling Hospital", address: "Racecourse Circle, Rajkot Road, Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { id: 39, name: "SAL Hospital", address: "Drive-in Road, Thaltej, Ahmedabad", lat: 23.0469, lng: 72.5008 },
    { id: 40, name: "Shalby Hospital", address: "S.B.I Colony, SG Highway, Ahmedabad", lat: 23.0395, lng: 72.5066 },

    // Jaipur
    { id: 41, name: "Fortis Escorts Hospital", address: "Jawahar Lal Nehru Marg, Jaipur", lat: 26.8854, lng: 75.8144 },
    { id: 42, name: "Narayana Multispeciality Hospital", address: "Sector 28, Pratap Nagar, Jaipur", lat: 26.8560, lng: 75.8030 },
    { id: 43, name: "Eternal Hospital", address: "Jagatpura Road, Jaipur", lat: 26.8518, lng: 75.8648 },
    { id: 44, name: "Manipal Hospital Jaipur", address: "Sector 5, Vidhyadhar Nagar, Jaipur", lat: 26.9677, lng: 75.7794 },
    { id: 45, name: "CK Birla Hospital", address: "Nehru Sahkar Bhawan, Tonk Road, Jaipur", lat: 26.8593, lng: 75.8170 },

    // Kochi
    { id: 46, name: "Apollo Hospital Kochi", address: "Vanchikulam Road, Ernakulam, Kochi", lat: 9.9312, lng: 76.2673 },
    { id: 47, name: "Aster Medcity", address: "Kuttisahib Road, Cherloor, Kochi", lat: 9.9252, lng: 76.2619 },
    { id: 48, name: "Rajagiri Hospital", address: "Chunangamveli, Aluva, Kochi", lat: 10.1102, lng: 76.3789 },
    { id: 49, name: "Lourdes Hospital", address: "Pachalam, Ernakulam, Kochi", lat: 9.9669, lng: 76.2905 },
    { id: 50, name: "Medical Trust Hospital", address: "M.G. Road, Ernakulam, Kochi", lat: 9.9816, lng: 76.2999 },

    // Lucknow
    { id: 51, name: "SGPGI Hospital", address: "Raebareli Road, Lucknow", lat: 26.8407, lng: 80.9966 },
    { id: 52, name: "Apollo Hospital Lucknow", address: "Kanpur - Lucknow Rd, Sector B, Lucknow", lat: 26.7271, lng: 80.8958 },
    { id: 53, name: "Max Super Speciality Hospital", address: "1, Sarvodaya Nagar, Lucknow", lat: 26.8467, lng: 80.9462 },
    { id: 54, name: "Medanta Hospital", address: "Sector-B, Pocket-A, LDA Colony, Lucknow", lat: 26.8003, lng: 80.9732 },
    { id: 55, name: "Sahara Hospital", address: "Viraj Khand, Gomti Nagar, Lucknow", lat: 26.8518, lng: 81.0072 },

    // Chandigarh
    { id: 56, name: "PGIMER Chandigarh", address: "Sector 12, Chandigarh", lat: 30.7646, lng: 76.7729 },
    { id: 57, name: "Fortis Hospital Mohali", address: "Sector 62, Phase VIII, Mohali", lat: 30.7046, lng: 76.7179 },
    { id: 58, name: "Max Super Speciality Hospital", address: "Phase VI, Mohali", lat: 30.6942, lng: 76.6856 },
    { id: 59, name: "Ivy Hospital", address: "Sector 71, Mohali", lat: 30.6908, lng: 76.7345 },
    { id: 60, name: "Alchemist Hospital", address: "Sector 21, Panchkula", lat: 30.6942, lng: 76.8606 }
  ];

  // Calculate distance and find the closest hospitals
  const hospitalsWithDistance = hospitalDatabase.map(hospital => ({
    ...hospital,
    distance: calculateDistance(userLocation, hospital)
  }));

  // Sort by distance and get the 8 closest hospitals from anywhere in India
  const nearbyHospitals = hospitalsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8)
    .map(({ distance, ...hospital }) => hospital);

  console.log("Found nearby hospitals across India:", nearbyHospitals);
  return nearbyHospitals;
};

// Calculate distance between two points using Haversine formula
const calculateDistance = (point1: {lat: number, lng: number}, point2: {lat: number, lng: number}): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
