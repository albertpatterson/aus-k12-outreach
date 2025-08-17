export default function Home() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <p>
        Find a fun opportunity to engage with our local schools and support our
        young people around Austin!
      </p>
      <ul style={{ textAlign: 'left' }}>
        <li>
          <a href="/event-list">Event List</a> to see all upcoming events.
        </li>
        <li>
          <a href="/event-map">Event Map</a> for a goegraphic view of events.
        </li>
        <li>
          <a href="/contacts">Contacts</a> reach out for more information.
        </li>
      </ul>
      <br />
      <br />
      <p>
        Raw data available{' '}
        <a href="https://docs.google.com/spreadsheets/d/1jQ-Rou08NcR_7GLK1twpi4rGgp0L1DHTIOdJdI2nF-A/edit?gid=164710446#gid=164710446">
          here
        </a>
      </p>
    </div>
  );
}
