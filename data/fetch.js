import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

function contactsRowToJson(row) {
  const name = row[0];
}

/**
 * Gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @return {obj} spreadsheet information
 */
async function getValues(spreadsheetId, range) {
  const auth = new GoogleAuth({
    keyFile: '../secret/aus-k12-outreach-key.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const service = google.sheets({ version: 'v4', auth });
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return result.data.values;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}
export async function fetchContacts() {
  const spreadsheetId = '1jQ-Rou08NcR_7GLK1twpi4rGgp0L1DHTIOdJdI2nF-A';
  const range = 'Contacts!A2:D';
  return getValues(spreadsheetId, range);
}

export async function fetchEvents() {
  const spreadsheetId = '1jQ-Rou08NcR_7GLK1twpi4rGgp0L1DHTIOdJdI2nF-A';
  const range = 'Events!A2:H';
  return getValues(spreadsheetId, range);
}
