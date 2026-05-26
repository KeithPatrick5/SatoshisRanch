import Link from 'next/link';
export function Shell({children}:{children:React.ReactNode}){
 return <>
  <header className="topbar"><div className="brand"><Link href="/">Satoshi's Ranch</Link></div><nav><Link href="/buy-bitcoin">Buy Bitcoin</Link><Link href="/seller/apply">Apply</Link><Link href="/offers/manage">Sell/Offers</Link><Link href="/trades">Trades</Link><Link href="/wallet">Wallet</Link><Link href="/login">Login</Link><Link href="/register">Register</Link><Link href="/phases">30 Phases</Link><Link href="/admin">Ranch Office</Link></nav></header>
  <main className="page">{children}</main>
  <footer className="footer">Local fake build. Bitcoin-only. No mainnet custody. No fiat touched by the app.</footer>
 </>
}
export function PageTitle({title,subtitle}:{title:string;subtitle?:string}){ return <div className="page-title"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div> }
