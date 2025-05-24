import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Event } from '../../types/types';
import { getUpcomingEvents, getRecentEvents } from '../../util/events';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSearchParams } from 'react-router-dom';
import { useBuildUrl } from '../../util/url';

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

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const displayEvents = upcomingEvents.map((event) => ({
    ...event,
    past: false,
  }));
  if (includePast) {
    displayEvents.push(
      ...recentEvents.map((event) => ({ ...event, past: true }))
    );
  }

  return displayEvents.map((event, index) => (
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
      past={event.past}
    />
  ));
}
