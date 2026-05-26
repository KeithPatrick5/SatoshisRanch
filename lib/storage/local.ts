import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const uploadRoot = path.join(process.cwd(), 'uploads', 'local-evidence');

export function ensureLocalUploadDir() {
  fs.mkdirSync(uploadRoot, { recursive: true });
  return uploadRoot;
}

export function hashEvidenceBytes(bytes: Buffer) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

export function saveLocalEvidenceFile(tradeId: string, filename: string, bytes: Buffer) {
  ensureLocalUploadDir();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const hash = hashEvidenceBytes(bytes);
  const relativePath = path.join('uploads', 'local-evidence', `${tradeId}-${Date.now()}-${safeName}`);
  const fullPath = path.join(process.cwd(), relativePath);
  fs.writeFileSync(fullPath, bytes);
  return { fileUrl: `/${relativePath}`, fileHash: hash, sizeBytes: bytes.length };
}
