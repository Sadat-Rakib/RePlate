import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Google Maps type declarations
declare global {
  interface Window {
    google: any;
  }
}

type GoogleMap = any;
type GoogleMarker = any;
type GoogleInfoWindow = any;

interface GoogleMapsEmbedProps {
  donationCenters?: Array<{
    id: number;
    name: string;
    address: string;
    lat?: number;
    lng?: number;
    type: string;
  }>;
  userLocation?: { lat: number; lng: number };
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  className?: string;
  height?: string;
}

export const GoogleMapsEmbed = ({
  donationCenters = [],
  userLocation,
  onLocationSelect,
  className = "",
  height = "400px"
}: GoogleMapsEmbedProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocationState, setUserLocationState] = useState(userLocation);
  const { toast } = useToast();

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Load Google Maps API
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setIsLoading(false);
      return;
    }

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setIsLoading(false);
        toast({
          title: "Map Error",
          description: "Failed to load Google Maps",
          variant: "destructive"
        });
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [GOOGLE_MAPS_API_KEY]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    try {
      const defaultCenter = userLocationState || { lat: 40.7128, lng: -74.0060 }; // Default to NYC

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: defaultCenter,
        styles: [
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      setMap(mapInstance);
      setIsLoading(false);

      // Add markers for donation centers
      donationCenters.forEach((center) => {
        if (center.lat && center.lng) {
          const marker = new window.google.maps.Marker({
            position: { lat: center.lat, lng: center.lng },
            map: mapInstance,
            title: center.name,
            icon: getMarkerIcon(center.type)
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${center.name}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">${center.address}</p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: #888; text-transform: capitalize;">
                  ${center.type.replace('-', ' ')}
                </p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        }
      });

      // Add user location marker if available
      if (userLocationState) {
        new window.google.maps.Marker({
          position: userLocationState,
          map: mapInstance,
          title: "Your Location",
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
            anchor: new window.google.maps.Point(12, 12)
          }
        });
      }

      // Add click listener for location selection
      if (onLocationSelect) {
        mapInstance.addListener('click', (event: any) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            onLocationSelect({ lat, lng });
          }
        });
      }

    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
      toast({
        title: "Map Error", 
        description: "Failed to initialize map",
        variant: "destructive"
      });
    }
  };

  const getMarkerIcon = (type: string) => {
    const colors = {
      'food-bank': '#10B981', // green
      'shelter': '#3B82F6',    // blue  
      'community': '#8B5CF6',  // purple
      'senior': '#F59E0B'      // amber
    };

    const color = colors[type as keyof typeof colors] || '#6B7280';

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}" stroke="#FFFFFF" stroke-width="1"/>
          <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(24, 24),
      anchor: new window.google.maps.Point(12, 24)
    };
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocationState(newLocation);
        
        if (map) {
          map.setCenter(newLocation);
          map.setZoom(14);
        }

        toast({
          title: "Location found",
          description: "Your location has been updated on the map"
        });
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to get your current location",
          variant: "destructive"
        });
      }
    );
  };

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Card className={`p-6 ${className}`} style={{ height }}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Google Maps API key required to display interactive map
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`} style={{ height }}>
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      
      {!isLoading && (
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={getCurrentLocation}
            className="shadow-lg"
          >
            <Navigation className="w-4 h-4 mr-2" />
            My Location
          </Button>
        </div>
      )}
    </Card>
  );
};