import { Card, CardContent, Typography } from '@mui/material';
import { getContacts } from '../../util/contacts';
import { Contact } from '../../types/types';

function ContactCard(contact: Contact) {
  return (
    <Card style={{ margin: '16px auto', maxWidth: '400px', textAlign: 'left' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {contact.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {contact.description}
        </Typography>
        {contact.linkedin && (
          <Typography variant="body1" color="text.secondary">
            <strong>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </strong>
          </Typography>
        )}
        {contact.email && (
          <Typography variant="body1" color="text.secondary">
            <strong>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </strong>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

const contacts: Contact[] = getContacts();

export default function EventMap() {
  return contacts.map((contact, index) => (
    <ContactCard key={index} {...contact} />
  ));
}
