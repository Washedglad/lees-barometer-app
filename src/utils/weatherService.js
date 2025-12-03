// Weather Service - Get current barometric pressure by location

/**
 * Get user's current position using browser Geolocation API
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Please allow location access.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while getting location.'));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // Cache position for 5 minutes
      }
    );
  });
};

/**
 * Get weather data from Open-Meteo API (free, no API key required)
 * Returns pressure in hPa
 */
export const getWeatherByCoordinates = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=surface_pressure,temperature_2m&temperature_unit=celsius`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.current || !data.current.surface_pressure) {
      throw new Error('Invalid weather data received');
    }
    
    return {
      pressure_hPa: data.current.surface_pressure,
      temperature_C: data.current.temperature_2m,
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation,
      timezone: data.timezone
    };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

/**
 * Get reverse geocoding (location name from coordinates)
 * Using Nominatim API (OpenStreetMap, free)
 */
export const getLocationName = async (latitude, longitude) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LeesBarometer/1.0'
      }
    });
    
    if (!response.ok) {
      return 'Unknown Location';
    }
    
    const data = await response.json();
    
    if (data.address) {
      const { city, town, village, county, state, country } = data.address;
      const place = city || town || village || county;
      return place && state ? `${place}, ${state}` : (place || state || country || 'Unknown Location');
    }
    
    return 'Unknown Location';
  } catch (error) {
    console.warn('Failed to get location name:', error);
    return 'Unknown Location';
  }
};

/**
 * Complete workflow: Get location, fetch weather, return pressure
 */
export const getCurrentBarometricPressure = async () => {
  try {
    // Step 1: Get user's position
    const position = await getCurrentPosition();
    
    // Step 2: Fetch weather data
    const weather = await getWeatherByCoordinates(position.latitude, position.longitude);
    
    // Step 3: Get location name (optional, non-blocking)
    let locationName = 'Your Location';
    try {
      locationName = await getLocationName(position.latitude, position.longitude);
    } catch (error) {
      console.warn('Could not fetch location name:', error);
    }
    
    return {
      success: true,
      pressure_hPa: weather.pressure_hPa,
      temperature_C: weather.temperature_C,
      latitude: weather.latitude,
      longitude: weather.longitude,
      elevation: weather.elevation,
      locationName: locationName,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Convert pressure from hPa to other units
 */
export const convertPressureFromHPa = (hPa) => {
  return {
    hPa: hPa,
    mmHg: hPa * 0.750062,
    inHg: hPa * 0.02953,
    PSI: hPa * 0.0145038
  };
};

