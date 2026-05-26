import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
const uploadRoot = path.join(process.cwd(), 'uploads');
const allowed = new Set(['image/png','image/jpeg','image/webp','application/pdf','text/plain']);
export async function saveLocalEvidenceFile(file: File) {
  if (!allowed.has(file.type)) throw new Error('Unsupported evidence file type');
  if (file.size > 5_000_000) throw new Error('Evidence file too large');
  fs.mkdirSync(uploadRoot, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const ext = (file.name.split('.').pop() || 'bin').replace(/[^a-zA-Z0-9]/g,'').slice(0,8);
  const name = `${hash}.${ext}`;
  const target = path.join(uploadRoot, name);
  if (!target.startsWith(uploadRoot)) throw new Error('Invalid upload path');
  fs.writeFileSync(target, buf);
  return { url: `/uploads/${name}`, hash, mimeType: file.type, sizeBytes: file.size, originalName: file.name };
}
