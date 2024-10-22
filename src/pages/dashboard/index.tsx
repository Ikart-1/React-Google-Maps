import PageHead from '@/components/shared/page-head.jsx';
import React, { useState, useEffect, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polyline
} from '@react-google-maps/api';
import { datastoresNike, Store } from '@/constants/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs.js';
import { Clock, Phone } from 'lucide-react';

const retroMapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    stylers: [{ color: '#e9e9e9' }]
  },
  {
    featureType: 'landscape',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#523735' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f1e6' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9b2a6' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#dcd2be' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ae9e90' }]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#93817c' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#a5b076' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#447530' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f5f1e6' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#fdfcf8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f8c967' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e9bc62' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#e98d58' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#db8555' }]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#806b63' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8f7d77' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ebe3cd' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b9d3c2' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#92998d' }]
  }
];

export default function DashboardPage() {
  const [positionUtilisateur, setPositionUtilisateur] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [storeSélectionnée, setStoreSélectionnée] = useState<Store | null>(
    null
  );
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [storeTriées, setStoreTriées] = useState<Store[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [iconeStore, setIconeStore] = useState<google.maps.Icon | null>(null);
  const [iconeUtilisateur, setIconeUtilisateur] =
    useState<google.maps.Icon | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'votre_clé_api',
    libraries: ['places']
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      setIconeStore({
        url: '/assets/icon_map.png',
        scaledSize: new window.google.maps.Size(60, 60)
      });

      setIconeUtilisateur({
        url: '/assets/icone_user.png',
        scaledSize: new window.google.maps.Size(85, 85)
      });
    }
  }, [isLoaded]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositionUtilisateur({ lat: latitude, lng: longitude });
        },
        (erreur) => {
          console.error(
            "Erreur lors de l'obtention de la position de l'utilisateur:",
            erreur
          );
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  }, []);

  const calculerDistancesAvecMatrix = useCallback(
    async (origine: google.maps.LatLngLiteral) => {
      if (!isLoaded) return;

      const service = new google.maps.DistanceMatrixService();
      const destinations = datastoresNike.map((store) => {
        const [lat, lng] = store.gps_degres_decimaux
          .split(', ')
          .map(parseFloat);
        return new google.maps.LatLng(lat, lng);
      });

      try {
        const result = await service.getDistanceMatrix({
          origins: [origine],
          destinations: destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        });

        const storesAvecDistance = datastoresNike.map((store, index) => ({
          ...store,
          distance: result.rows[0].elements[index].distance.value / 1000
        }));

        const triées = storesAvecDistance.sort(
          (a, b) => (a.distance || 0) - (b.distance || 0)
        );
        setStoreTriées(triées);
      } catch (error) {
        console.error(
          'Erreur lors du calcul des distances avec Matrix:',
          error
        );
        const storesAvecDistance = datastoresNike.map((store) => {
          const [lat, lng] = store.gps_degres_decimaux
            .split(', ')
            .map(parseFloat);
          const distance = calculerDistance(origine.lat, origine.lng, lat, lng);
          return { ...store, distance };
        });
        const triées = storesAvecDistance.sort(
          (a, b) => (a.distance || 0) - (b.distance || 0)
        );
        setStoreTriées(triées);
      }
    },
    [isLoaded]
  );

  useEffect(() => {
    if (positionUtilisateur && isLoaded) {
      calculerDistancesAvecMatrix(positionUtilisateur);
    }
  }, [positionUtilisateur, isLoaded, calculerDistancesAvecMatrix]);

  useEffect(() => {
    if (storeSélectionnée) {
      const timer = setTimeout(() => {
        setStoreSélectionnée(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [storeSélectionnée]);

  const calculerDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const gererClicMarqueur = (store: Store) => {
    setStoreSélectionnée(store);
    if (positionUtilisateur && isLoaded) {
      const [lat, lng] = store.gps_degres_decimaux.split(', ').map(parseFloat);
      const serviceDirections = new window.google.maps.DirectionsService();
      serviceDirections.route(
        {
          origin: positionUtilisateur,
          destination: { lat, lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (resultat, statut) => {
          if (statut === window.google.maps.DirectionsStatus.OK) {
            setDirections(resultat);
          }
        }
      );
    }
  };

  if (loadError) {
    return <div>Erreur lors du chargement de Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Chargement de Google Maps...</div>;
  }

  return (
    <>
      <PageHead title="Dashboard | App" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="h-full w-full p-4">
              <Card className="h-full w-full">
                <CardHeader>
                  <CardTitle>Liste des Store NIke</CardTitle>
                  <CardDescription>
                    Trouvez le Store le plus proche de vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="mb-5"
                    style={{ height: '400px', width: '100%' }}
                  >
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '400px' }}
                      center={
                        positionUtilisateur || { lat: 48.870643, lng: 2.332654 }
                      }
                      zoom={10}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={{
                        styles: retroMapStyle,
                        disableDefaultUI: true,
                        zoomControl: true
                      }}
                    >
                      {positionUtilisateur && iconeUtilisateur && (
                        <Marker
                          position={positionUtilisateur}
                          icon={iconeUtilisateur}
                        />
                      )}
                      {storeTriées.map((store) => {
                        const [lat, lng] = store.gps_degres_decimaux
                          .split(', ')
                          .map(parseFloat);
                        return (
                          <Marker
                            key={store.store_name}
                            position={{ lat, lng }}
                            onClick={() => gererClicMarqueur(store)}
                            icon={iconeStore}
                          />
                        );
                      })}
                      {storeSélectionnée && (
                        <InfoWindow
                          position={{
                            lat: parseFloat(
                              storeSélectionnée.gps_degres_decimaux.split(
                                ', '
                              )[0]
                            ),
                            lng: parseFloat(
                              storeSélectionnée.gps_degres_decimaux.split(
                                ', '
                              )[1]
                            )
                          }}
                          onCloseClick={() => setStoreSélectionnée(null)}
                        >
                          <div className="w-72">
                            <div
                              className="h-32 w-full rounded-t-lg bg-cover bg-center"
                              style={{
                                backgroundImage: `url(/assets/${storeSélectionnée.img2})`
                              }}
                            />
                            <div className="rounded-b-lg bg-white p-4 shadow-sm">
                              <h3 className="mb-2 text-xl font-bold text-gray-900">
                                {storeSélectionnée.store_name}
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                  <Phone className="mr-2 h-4 w-4" />
                                  <span className="text-sm">
                                    {storeSélectionnée.tel}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-green-500" />
                                  <div className="flex items-center">
                                    <span className="text-sm text-gray-600">
                                      Mode
                                    </span>
                                    <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                      Ouvert 24h/24
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                      {directions && (
                        <Polyline
                          path={directions.routes[0].overview_path}
                          options={{
                            strokeColor: '#0000FF',
                            strokeOpacity: 0.8,
                            strokeWeight: 5
                          }}
                        />
                      )}
                    </GoogleMap>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {storeTriées.map((store, index) => (
                      <Card key={index} className="flex h-full flex-col">
                        <CardHeader className="overflow-hidden p-0">
                          <div
                            className="h-48 w-full rounded-t-lg bg-cover bg-center"
                            style={{
                              backgroundImage: `url(/assets/${store.img2})`
                            }}
                          />
                        </CardHeader>
                        <CardContent className="flex-grow p-4">
                          <h3 className="text-lg font-semibold text-primary">
                            {store.store_name}
                          </h3>
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 p-4">
                          <Button variant="outline">
                            à {store.distance?.toFixed(2)} km
                          </Button>
                          <Button variant="destructive">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${store.store_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Maps
                            </a>
                          </Button>
                          <Button variant="default">
                            <a
                              href={`https://www.waze.com/ul?ll=${store.gps_degres_decimaux}&navigate=yes&zoom=17`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Waze
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
