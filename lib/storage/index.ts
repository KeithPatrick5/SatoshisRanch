export type StoredEvidenceFile = { url: string; hash: string; size: number; mimeType: string };
export interface StorageProvider { putEvidence(name: string, bytes: Uint8Array, mimeType: string): Promise<StoredEvidenceFile>; }
export async function getStorageProvider(): Promise<StorageProvider> {
  const { localStorageProvider } = await import('./local');
  return localStorageProvider;
}
