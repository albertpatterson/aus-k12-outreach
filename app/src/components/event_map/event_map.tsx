import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useBuildUrl } from '../../util/url';
import { sortEventsByStart } from '../../util/events';
import { useNavigate } from 'react-router';
import { Event } from '../../types/types';
import { getUpcomingEvents, getRecentEvents } from '../../util/events';
import { useSearchParams } from 'react-router-dom';

const upcomingEvents: Event[] = getUpcomingEvents();
const recentEvents: Event[] = getRecentEvents();
interface MarkerProps {
  title: string;
  position: google.maps.LatLngLiteral;
  showInfo?: boolean;
  onClickMarker?: () => void;
  onCloseInfo?: () => void;
  eventId: string;
  past?: boolean;
}

function Marker(props: MarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const buildUrl = useBuildUrl();
  const link = buildUrl('event-list', {}, props.eventId);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={props.onClickMarker}
        position={props.position}
        title={props.title}
      >
        {props.past && (
          <Pin
            background={'#9E9E9E'}
            borderColor={'#616161'}
            glyphColor={'#dadada'}
          />
        )}
      </AdvancedMarker>

      {props.showInfo && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={props.onCloseInfo}
          headerDisabled={true}
        >
          <Box>
            <Typography variant="body2" component="div" color="text.primary">
              {props.title}
            </Typography>
            <Link href={link} variant="body2">
              More Info
            </Link>
          </Box>
        </InfoWindow>
      )}
    </>
  );
}

export default function EventMap() {
  const [searchParams] = useSearchParams();
  const includePast = searchParams.get('includePast') === 'true';
  const buildUrl = useBuildUrl();
  const navigate = useNavigate();

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

  const makeMarker = (event: Event, index: number, past: boolean) => (
    <Marker
      key={event.id || index}
      title={event.name}
      position={{ lat: event.latitude, lng: event.longitude }}
      showInfo={openInfoIdx === index}
      onClickMarker={() => handleMarkerClick(index)}
      onCloseInfo={handleCloseInfo}
      eventId={event.id}
      past={past}
    />
  );

  const recentEventMarkers = includePast
    ? sortEventsByStart(recentEvents, false).map((event, index) =>
        makeMarker(event, index + upcomingEvents.length, true)
      )
    : [];
  const upcomingEventMarkers = sortEventsByStart(upcomingEvents, true).map(
    (event, index) => makeMarker(event, index, false)
  );
  const markers = [...recentEventMarkers, ...upcomingEventMarkers];

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
          <Button
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              const link = buildUrl('event-map', {
                includePast: `${!includePast}`,
              });
              navigate('/' + link);
            }}
          >
            {includePast ? 'Hide Past Events' : 'Show Past Events'}
          </Button>
          {markers}
        </Map>
      </APIProvider>
    </Box>
  );
}
