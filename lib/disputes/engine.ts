import { db } from '../db';
import { appendAudit, appendMessage } from '../local-store';
export function addDisputeNote(tradeId: string, actor: string, note: string) {
  return db.transaction((state) => {
    appendMessage(state, tradeId, actor, `[dispute note] ${note}`, false);
    appendAudit(state, actor, 'dispute.note', tradeId, note);
    return { tradeId, note };
  });
}
