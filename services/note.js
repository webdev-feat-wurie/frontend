import fetch from "isomorphic-unfetch";

const NOTES_SERVICE_URL =
  "http://localhost:21702" || process.env.NOTES_SERVICE_URL;

const fetchNotes = async jwtToken => {
  const authHeader = `Bearer ${jwtToken}`;
  const response = await fetch(`${NOTES_SERVICE_URL}/notes`, {
    headers: {
      Authorization: authHeader
    }
  });
  const json = await response.json();
  return json;
};

const postNote = async (jwtToken, note) => {
  const authHeader = `Bearer ${jwtToken}`;
  const response = await fetch(`${NOTES_SERVICE_URL}/notes`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note })
  });
  const json = await response.json();
  return json;
};

export default {
  fetchNotes,
  postNote
};
