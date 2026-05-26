import { getFeedback, getTrades, getUsers } from './data';
export function reputationFor(username:string){
 const user = getUsers().find(u => u.username === username || u.id === username);
 const feedback = getFeedback().filter(f => f.to === username || f.to === user?.id);
 const trades = getTrades().filter(t => t.buyer === username || t.seller === username);
 const positive = feedback.filter(f=>f.rating>0).length + (user?.positive || 0);
 const negative = feedback.filter(f=>f.rating<0).length + (user?.negative || 0);
 const total = Math.max(positive + negative, 1);
 return { user, trades: trades.length + (user?.trades || 0), positive, negative, feedback, score: Math.round((positive / total) * 100), disputeRate: user?.disputeRate || 0, avgReleaseMinutes: user?.avgReleaseMinutes || 0 };
}
