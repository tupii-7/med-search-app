import type { DrugLabel } from '@/types/drug';

const favorites = new Map<string, DrugLabel>();
const listeners = new Set<() => void>();
let snapshot: [string, DrugLabel][] = [];

function notify() {
  snapshot = Array.from(favorites.entries());
  listeners.forEach((listener) => listener());
}

export function getFavorites() {
  return snapshot;
}

export function isFavorite(id: string) {
  return favorites.has(id);
}

export function toggleFavorite(id: string, drug: DrugLabel) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.set(id, drug);
  }
  notify();
}

export function subscribeToFavorites(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
