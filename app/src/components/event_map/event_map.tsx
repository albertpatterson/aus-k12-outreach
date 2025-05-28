import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
  MapCameraProps,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useState, useCallback } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useBuildUrl } from '../../util/url';
import { sortEventsByStart } from '../../util/events';
import { useNavigate } from 'react-router';
import { Event } from '../../types/types';
import { getUpcomingEvents, getRecentEvents } from '../../util/events';
import { useSearchParams } from 'react-router-dom';

const upcomingEvents: Event[] = getUpcomingEvents();
const recentEvents: Event[] = getRecentEvents();
const DEFAULT_POSITION = { lat: 30.266375800188623, lng: -97.7491266114782 };

interface MarkerProps {
  title: string;
  position: google.maps.LatLngLiteral;
  showInfo?: boolean;
  onClickMarker?: () => void;
  onCloseInfo?: () => void;
  eventId: string;
  past?: boolean;
  zIndex?: number;
}

function getCenter(
  upcomingEvents: Event[],
  recentEvents: Event[],
  includePast: boolean
) {
  if (!includePast && upcomingEvents.length === 0) {
    return DEFAULT_POSITION;
  }

  if (upcomingEvents.length === 0 && recentEvents.length === 0) {
    return DEFAULT_POSITION;
  }

  const allEvents = includePast
    ? [...upcomingEvents, ...recentEvents]
    : upcomingEvents;

  const avgLatLng = allEvents.reduce(
    (acc, event) => {
      acc.lat += event.latitude;
      acc.lng += event.longitude;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  const avgLat = avgLatLng.lat / allEvents.length;
  const avgLng = avgLatLng.lng / allEvents.length;

  if (isNaN(avgLat) || isNaN(avgLng)) {
    return DEFAULT_POSITION;
  }
  if (avgLat < -90 || avgLat > 90 || avgLng < -180 || avgLng > 180) {
    return DEFAULT_POSITION;
  }

  return { lat: avgLat, lng: avgLng };
}

function getCameraProps(
  upcomingEvents: Event[],
  recentEvents: Event[],
  includePast: boolean
): MapCameraProps {
  const center = getCenter(upcomingEvents, recentEvents, includePast);
  return {
    center,
    zoom: 9.5,
  };
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
        zIndex={props.zIndex}
      >
        {props.past && (
          <Pin
            background={'#9E9E9E'}
            borderColor={'#616161'}
            glyphColor={'#dadada'}
          />
        )}
        {!props.past && <Pin />}
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

  const initialCamera = getCameraProps(
    upcomingEvents,
    recentEvents,
    includePast
  );
  const [cameraProps, setCameraProps] = useState<MapCameraProps>(initialCamera);
  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    []
  );

  const handleTogglePastEventsClick = useCallback(() => {
    setOpenInfoIdx(null);
    const newIncludePast = !includePast;
    const link = buildUrl('event-map', {
      includePast: `${newIncludePast}`,
    });
    const cameraProps = getCameraProps(
      upcomingEvents,
      recentEvents,
      newIncludePast
    );
    setCameraProps(cameraProps);
    navigate('/' + link);
  }, [buildUrl, includePast, navigate]);

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
      zIndex={index}
    />
  );

  const allEvents = includePast
    ? sortEventsByStart(recentEvents, false).map((event) => ({
        event,
        past: true,
      }))
    : [];
  allEvents.push(
    ...sortEventsByStart(upcomingEvents, true).map((event) => ({
      event,
      past: false,
    }))
  );

  const markers = allEvents.map((eventData, index) =>
    makeMarker(eventData.event, index, eventData.past)
  );

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <APIProvider apiKey={'AIzaSyA2VFJ0asBxip0AAndV846lgJLJzLyzvto'}>
        <Map
          {...cameraProps}
          onCameraChanged={handleCameraChange}
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
            onClick={handleTogglePastEventsClick}
          >
            {includePast ? 'Hide Past Events' : 'Show Past Events'}
          </Button>
          {markers}
        </Map>
      </APIProvider>
    </Box>
  );
}
