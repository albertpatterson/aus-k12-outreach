// function transformEmailsToMarkdown(text) {
//   return text.replace(
//     /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
//     (match) => {
//       return `[${match}](mailto:${match})`;
//     }
//   );
// }

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

export function parseEvent(row) {
  const [
    name,
    description,
    start,
    end,
    location,
    signUpLink,
    signUpByEmailInstruction,
  ] = row;

  const signUp = signUpLink || signUpByEmailInstruction;

  if (!(name && description && start && end && location && signUp)) {
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
  };
}
