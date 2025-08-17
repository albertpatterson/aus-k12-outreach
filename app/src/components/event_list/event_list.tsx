import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Event } from '../../types/types';
import {
  getUpcomingEvents,
  getRecentEvents,
  sortEventsByStart,
} from '../../util/events';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSearchParams } from 'react-router-dom';
import { useBuildUrl } from '../../util/url';
import { useNavigate } from 'react-router';

const upcomingEvents: Event[] = getUpcomingEvents();
const recentEvents: Event[] = getRecentEvents();

const StyledMarkdown = (props: { markdown: string }) => (
  <ReactMarkdown
    components={{
      a: (fullProps) => {
        const props = { ...fullProps };
        delete props.node;
        return (
          <a
            {...props}
            style={{
              lineBreak: 'anywhere',
            }}
          />
        );
      },
    }}
  >
    {props.markdown}
  </ReactMarkdown>
);

interface EventCardProps extends Event {
  past?: boolean;
}

function EventCard(props: EventCardProps) {
  const buildUrl = useBuildUrl();
  const link = buildUrl('event-list', {}, props.id, true);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Card
      style={{
        margin: '16px auto',
        maxWidth: '400px',
        textAlign: 'left',
        width: 'calc(100% - 32px)',
        backgroundColor: props.past ? '#9e9e9e69' : '#fff',
        position: 'relative',
      }}
      id={props.id}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Start:</strong> {props.start.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>End:</strong> {props.end.toLocaleString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ margin: '8px 0' }}
        >
          <strong>Location:</strong> {props.location}
        </Typography>
        <StyledMarkdown markdown={'**Sign Up:** ' + props.signUpMarkdown} />

        <Tooltip title="Copy link">
          <IconButton
            onClick={handleCopy}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            aria-label="copy link"
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default function EventList() {
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const includePast = searchParams.get('includePast') === 'true';
  const buildUrl = useBuildUrl();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const noUpcomingEvents = upcomingEvents.length === 0;

  const createEventCard = (event: Event, past: boolean, index: number) => (
    <EventCard
      key={event.id || index}
      name={event.name}
      description={event.description}
      start={event.start}
      end={event.end}
      location={event.location}
      signUpMarkdown={event.signUpMarkdown}
      latitude={event.latitude}
      longitude={event.longitude}
      id={event.id}
      past={past}
    />
  );

  return (
    <>
      {sortEventsByStart(upcomingEvents, false).map((event, index) =>
        createEventCard(event, false, index)
      )}

      {noUpcomingEvents && (
        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '16px' }}
        >
          No upcoming events found.
        </Typography>
      )}

      {!includePast && (
        <Button
          style={{ display: 'block', margin: '16px auto' }}
          color="primary"
          variant="contained"
          onClick={() => {
            const link = buildUrl('event-list', { includePast: 'true' });
            navigate('/' + link);
          }}
        >
          Show Past Events
        </Button>
      )}

      {includePast && (
        <>
          <Button
            style={{ display: 'block', margin: '16px auto' }}
            color="primary"
            variant="contained"
            onClick={() => {
              const link = buildUrl('event-list', { includePast: 'false' });
              navigate('/' + link);
            }}
          >
            Hide Past Events
          </Button>
          {sortEventsByStart(recentEvents, true).map((event, index) =>
            createEventCard(event, true, index + upcomingEvents.length)
          )}
        </>
      )}
    </>
  );
}
