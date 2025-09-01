export function parseContact(row) {
  const [name, description, email, linkedin] = row;

  if (!name) {
    console.warn(`failed to parse contact: ${name}`);
    return null;
  }

  return {
    name,
    description: description || '',
    email: email || '',
    linkedin: linkedin || '',
  };
}

function parseLatLong(latlong) {
  try {
    const [latitude, longitude] = latlong.split(',').map(Number);
    return { latitude, longitude };
  } catch (error) {
    console.warn(`failed to parse latlong: ${latlong}`);
    return { latitude: null, longitude: null };
  }
}

function parseLatLongs(latLongsStr){
  const latLongStrs = latLongsStr.split(';').map(ll=>ll.trim())
  return latLongStrs.map(parseLatLong)
}

export function parseEvent(row) {
  const [
    name,
    description,
    start,
    end,
    location,
    signUpLink,
    signUpByEmailInstruction,
    latlongsStr,
  ] = row;

  const signUp = signUpLink || signUpByEmailInstruction;

  const coordinatesList = parseLatLongs(latlongsStr);

  if (
    !(name && description && start && end && location && signUp,
    coordinatesList)
  ) {
    console.warn(`failed to parse event: ${name}`);
    return null;
  }

  return {
    name,
    description,
    start: new Date(start),
    end: new Date(end),
    location,
    signUpLink: signUpLink || '',
    signUpByEmailInstruction: signUpByEmailInstruction || '',
    coordinatesList
  };
}

function createBaseId(event) {
  const { name, start } = event;
  return `${name}-${start.toISOString()}`.replace(/[^a-zA-Z0-9]/g, '-');
}

export function parseEvents(rows) {
  const ids = new Set();
  return rows
    .map((row) => {
      const event = parseEvent(row);
      if (event) {
        let id = createBaseId(event);
        let suffixIdx = 0;
        while (ids.has(id)) {
          suffixIdx++;
          id = `${id}-${suffixIdx}`;
        }
        ids.add(id);
        return { ...event, id };
      }
      return null;
    })
    .filter(Boolean);
}
