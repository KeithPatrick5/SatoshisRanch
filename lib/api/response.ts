export function ok(data: unknown = {}, init?: ResponseInit) { return Response.json({ ok: true, data }, init); }
export function fail(message: string, status = 400) { return Response.json({ ok: false, error: message }, { status }); }
export async function safeJson<T>(fn: () => Promise<T>) { try { return ok(await fn()); } catch (err) { return fail(err instanceof Error ? err.message : 'Request failed', 400); } }
