import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Box from '@mui/material/Box';

function Marker(props: {
  title: string;
  position: google.maps.LatLngLiteral;
  showInfo?: boolean;
  onClickMarker?: () => void;
  onCloseInfo?: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={props.onClickMarker}
        position={props.position}
        title={props.title}
      />

      {props.showInfo && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={props.onCloseInfo}
          headerDisabled={true}
        >
          <div>
            <p>Details about {props.title}.</p>
            <a href="https://www.google.com">Link to more info</a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function EventMap() {
  const [openInfoIdx, setOpenInfoIdx] = useState<number | null>(null);

  const handleMarkerClick = (index: number) => {
    setOpenInfoIdx(index);
  };

  const handleCloseInfo = () => {
    setOpenInfoIdx(null);
  };

  const handleMapClick = () => {
    setOpenInfoIdx(null);
  };

  const position = { lat: 30.266375800188623, lng: -97.7491266114782 };

  const events: Array<{ title: string; position: google.maps.LatLngLiteral }> =
    [
      {
        title: 'Event 1',
        position: { lat: 30.266375800188623, lng: -97.7491266114782 },
      },
      {
        title: 'Event 2',
        position: { lat: 30.27, lng: -97.75 },
      },
      {
        title: 'Event 3',
        position: { lat: 30.28, lng: -97.76 },
      },
    ];

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <APIProvider apiKey={'AIzaSyA2VFJ0asBxip0AAndV846lgJLJzLyzvto'}>
        <Map
          defaultCenter={position}
          defaultZoom={9.5}
          mapId="AUS-K12-Outreach-Event-Map"
          style={{ flex: 1 }}
          onClick={handleMapClick}
          disableDefaultUI={true}
        >
          {events.map((event, index) => (
            <Marker
              key={index}
              title={event.title}
              position={event.position}
              showInfo={openInfoIdx === index}
              onClickMarker={() => handleMarkerClick(index)}
              onCloseInfo={handleCloseInfo}
            />
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
}
