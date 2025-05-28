import { Card, CardContent, Typography } from '@mui/material';
import { getContacts } from '../../util/contacts';
import { Contact } from '../../types/types';

function ContactCard(contact: Contact) {
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
          {contact.name}
        </Typography>
        {contact.description && (
          <Typography variant="body2" color="text.secondary">
            {contact.description}
          </Typography>
        )}
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

export default function Contacts() {
  return contacts.map((contact, index) => (
    <ContactCard key={index} {...contact} />
  ));
}
