import { Card, CardContent, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Event } from '../../types/types';
import { getUpcomingEvents } from '../../util/events';

const upcomingEvents: Event[] = getUpcomingEvents();

const StyledMarkdown = (props: { markdown: string }) => (
  <ReactMarkdown
    components={{
      a: ({ node, ...props }) => (
        <a
          {...props}
          style={{
            lineBreak: 'anywhere',
          }}
        />
      ),
    }}
  >
    {props.markdown}
  </ReactMarkdown>
);

function EventCard(event: Event) {
  return (
    <Card
      style={{
        margin: '16px auto',
        maxWidth: '400px',
        textAlign: 'left',
        width: 'calc(100% - 32px)',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Start:</strong> {event.start.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>End:</strong> {event.end.toLocaleString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ margin: '8px 0' }}
        >
          <strong>Location:</strong> {event.location}
        </Typography>
        <StyledMarkdown markdown={'**Sign Up:** ' + event.signUpMarkdown} />
      </CardContent>
    </Card>
  );
}

export default function EventMap() {
  return upcomingEvents.map((event, index) => (
    <EventCard
      key={index}
      name={event.name}
      description={event.description}
      start={event.start}
      end={event.end}
      location={event.location}
      signUpMarkdown={event.signUpMarkdown}
    />
  ));
}
