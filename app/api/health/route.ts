export const dynamic = 'force-dynamic';
export async function GET(){return Response.json({ok:true, mode:'local-fake', mainnet:false});}