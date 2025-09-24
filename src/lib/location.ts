/** @format */

export interface LocationData {
  lat: number;
  lng: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject({
        code: 0,
        message: "Geolocation is not supported by this browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let message = "Unknown error occurred";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location access denied by user. Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable. Please try again.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out. Please try again.";
            break;
        }

        reject({
          code: error.code,
          message: message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

export const watchLocation = (
  onSuccess: (location: LocationData) => void,
  onError: (error: GeolocationError) => void
): (() => void) => {
  if (!("geolocation" in navigator)) {
    onError({
      code: 0,
      message: "Geolocation is not supported by this browser",
    });
    return () => {};
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      let message = "Unknown error occurred";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "Location access denied by user";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          message = "Location request timed out";
          break;
      }

      onError({
        code: error.code,
        message: message,
      });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
};

export const formatLocationForDisplay = (location: LocationData): string => {
  return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
};
