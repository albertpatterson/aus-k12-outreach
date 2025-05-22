export function parseContact(row) {
  const [name, description, email, linkedin] = row;

  if (!name || !description) {
    console.warn(`failed to parse contact: ${name}`);
    return null;
  }

  return {
    name,
    description,
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

export function parseEvent(row) {
  const [
    name,
    description,
    start,
    end,
    location,
    signUpLink,
    signUpByEmailInstruction,
    latlong,
  ] = row;

  const signUp = signUpLink || signUpByEmailInstruction;

  const { latitude, longitude } = parseLatLong(latlong);

  if (
    !(name && description && start && end && location && signUp,
    latitude,
    longitude)
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
    latitude,
    longitude,
  };
}
