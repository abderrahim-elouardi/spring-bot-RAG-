import Constants from 'expo-constants';

// Dynamically resolve the host from the Expo dev server address.
// When running via Expo Go on a real device, this is the LAN IP of your machine.
// Falls back to localhost for web/simulators.
function getApiBase(): string {
  const hostUri = Constants.expoConfig?.hostUri;       // e.g. "192.168.1.42:8081"
  const host = hostUri ? hostUri.split(':')[0] : 'localhost';
  return `http://${host}:8000`;
}

const API_BASE = getApiBase();

export async function sendMessage(question: string, k = 5): Promise<string> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, k }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  const data = await res.json();
  return data.answer as string;
}
