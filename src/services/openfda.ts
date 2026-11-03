import type { DrugLabel, OpenFdaResponse } from '@/types/drug';

const API_URL = 'https://api.fda.gov/drug/label.json';
const labelCache = new Map<string, DrugLabel>();

function getFirstValue(values?: string[]) {
  return values?.find((value) => value.trim())?.trim() ?? '';
}

export function getDrugName(label: DrugLabel) {
  return getFirstValue(label.openfda?.brand_name) || getFirstValue(label.openfda?.generic_name) || 'Unnamed medicine';
}

export function getDrugId(label: DrugLabel, index: number) {
  const id = label.id ?? `${getDrugName(label)}-${getFirstValue(label.openfda?.manufacturer_name)}-${index}`;
  labelCache.set(id, label);
  return id;
}

function buildUrl(search: string, limit = 25) {
  const params = new URLSearchParams({ search, limit: String(limit) });
  return `${API_URL}?${params.toString()}`;
}

async function request(url: string): Promise<DrugLabel[]> {
  const response = await fetch(url);
  const payload = (await response.json()) as OpenFdaResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'The FDA label service could not complete the request.');
  }

  return payload.results ?? [];
}

export async function searchDrugs(query: string) {
  const normalizedQuery = query.trim().replace(/[^a-zA-Z0-9\s-]/g, ' ');
  const search = `(openfda.brand_name:${normalizedQuery} OR openfda.generic_name:${normalizedQuery})`;
  return request(buildUrl(search));
}

export async function getDrugById(id: string, fallbackSearch?: string, fallbackIndex = 0) {
  const cachedLabel = labelCache.get(id);
  if (cachedLabel) return cachedLabel;

  if (!id.includes('-')) {
    try {
      const matches = await request(buildUrl(`id:"${id}"`, 1));
      if (matches[0]) {
        labelCache.set(id, matches[0]);
        return matches[0];
      }
    } catch {
      // The selected search result remains the reliable fallback when an API id lookup fails.
    }
  }

  if (!fallbackSearch) return undefined;
  const matches = await searchDrugs(fallbackSearch);
  const selectedLabel = matches[fallbackIndex];
  if (selectedLabel) labelCache.set(id, selectedLabel);
  return selectedLabel;
}

export function getSourceUrl(label: DrugLabel) {
  return label.id ? buildUrl(`id:"${label.id}"`, 1) : 'https://open.fda.gov/apis/drug/label/';
}
