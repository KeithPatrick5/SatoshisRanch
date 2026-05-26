import type { StorageProvider } from './index';
export const s3StorageProvider: StorageProvider = { async putEvidence(){ throw new Error('S3 storage is configured by env but not enabled in local build.'); } };
