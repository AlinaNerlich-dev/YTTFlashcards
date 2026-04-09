import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@ytt_progress';

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { known: [], practicing: [] };
  } catch {
    return { known: [], practicing: [] };
  }
}

export async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {}
}

export async function markCard(cardId, isKnown, progress) {
  const updated = {
    known: isKnown
      ? [...new Set([...progress.known, cardId])]
      : progress.known.filter(id => id !== cardId),
    practicing: !isKnown
      ? [...new Set([...progress.practicing, cardId])]
      : progress.practicing.filter(id => id !== cardId),
  };
  await saveProgress(updated);
  return updated;
}

export async function resetProgress() {
  const empty = { known: [], practicing: [] };
  await saveProgress(empty);
  return empty;
}
