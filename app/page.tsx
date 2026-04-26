'use client';

import React from 'react';

export default function Page() {
  const logs = [
    { time: "14:02:01", type: "PROBING", url: "http://165.227.120.132/admin", status: "403 Forbidden", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:02", type: "PROBING", url: "http://165.227.120.132/.env", status: "200 OK (842 bytes)", statusColor: "text-green-400 font-bold underline", typeColor: "text-blue-400" },
    { time: "14:02:02", type: "ANALYZING", url: "Content of .env", status: "[!] Potential DB_PASSWORD found", statusColor: "text-orange-400 italic", typeColor: "text-orange-400" },
    { time: "14:02:03", type: "PROBING", url: "http://165.227.120.132/backup.sql", status: "404 Not Found", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:04", type: "PROBING", url: "http://165.227.120.132/graphql", status: "200 OK (42KB)", statusColor: "text-green-400", typeColor: "text-blue-400" },
    { time: "14:02:05", type: "LFI_TEST", url: "/index.php?file=../../etc/passwd", status: "500 Internal Error", statusColor: "text-yellow-400 font-bold", typeColor: "text-purple-400" },
    { time: "14:02:07", type: "PROBING", url: "http://165.227.120.132/.git/config", status: "403 Forbidden", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:08", type: "PROBING", url: "http://165.227.120.132/phpinfo.php", status: "404 Not Found", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:09", type: "PROBING", url: "http://165.227.120.132/metrics", status: "200 OK (112KB)", statusColor: "text-green-400", typeColor: "text-blue-400" },
    { time: "14:02:11", type: "PROBING", url: "http://165.227.120.132/actuator/env", status: "401 Unauthorized", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:12", type: "PROBING", url: "http://165.227.120.132/pma", status: "404 Not Found", statusColor: "text-red-400", typeColor: "text-blue-400" },
    { time: "14:02:13", type: "PROBING", url: "http://165.227.120.132/api/v1", status: "200 OK (1.2MB)", statusColor: "text-green-400", typeColor: "text-blue-400" }
  ];

  return (
    <div className="w-full min-h-screen h-screen bg-[#050507] text-[#e0e0e0] font-sans overflow-hidden flex flex-col">
      {/* Header Section */}
      <header className="h-18 border-b border-[#222226] bg-[#0a0a0e] flex flex-col sm:flex-row items-center justify-between px-8 py-4 shrink-0 gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 rounded bg-[#ff3e3e]/10 border border-[#ff3e3e]/30 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-[#ff3e3e] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-[0.2em] text-[#ff3e3e] uppercase">RuneHall Strike-Probe</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase">Active Reconnaissance Node // v2.4.1</p>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-8 text-left sm:text-right w-full sm:w-auto flex-wrap sm:flex-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Target IP</span>
            <span className="font-mono text-sm">165.227.120.132</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Target Host</span>
            <span className="font-mono text-sm uppercase">runehall.com</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Scan Status</span>
            <span className="font-mono text-sm text-green-400">RUNNING</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 sm:p-6 overflow-hidden">
        {/* Left Column: Probe Terminal */}
        <section className="flex-[2] bg-[#0a0a0e] border border-[#222226] rounded-lg flex flex-col overflow-hidden h-full">
          <div className="bg-[#14141a] px-4 py-2 border-b border-[#222226] flex justify-between items-center shrink-0">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400">LIVE_PROBE_LOG</span>
            <span className="text-[10px] text-zinc-600">48 REQS / MIN</span>
          </div>
          <div className="flex-1 p-4 font-mono text-[10px] sm:text-[12px] leading-relaxed overflow-y-auto text-zinc-400 space-y-2 lg:space-y-1 scrollbar-thin scrollbar-thumb-[#222226]">
            {logs.map((log, i) => (
              <p key={i} className="break-all sm:break-normal">
                <span className="text-zinc-600">[{log.time}]</span>{" "}
                <span className={log.typeColor}>{log.type}</span>{" "}
                <span className="break-words">{log.url}</span> ...{" "}
                <span className={log.statusColor}>{log.status}</span>
              </p>
            ))}
            <div className="pt-4 mt-4 border-t border-[#222226] text-[#ff3e3e]">
              <span className="inline-block px-1 bg-[#ff3e3e] text-black font-bold mr-2">CRIT</span>
              ATTACK SURFACE DETECTED: 8 Endpoints accessible.
            </div>
          </div>
        </section>

        {/* Right Column: Metrics & Findings */}
        <aside className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#222226]">
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="p-4 bg-[#0a0a0e] border border-[#222226] rounded-lg">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Probes Run</p>
              <p className="text-2xl font-mono">142<span className="text-sm text-zinc-600 italic">/420</span></p>
            </div>
            <div className="p-4 bg-[#0a0a0e] border border-[#222226] rounded-lg">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Success (200)</p>
              <p className="text-2xl font-mono text-green-400">12</p>
            </div>
            <div className="p-4 bg-[#0a0a0e] border border-[#222226] rounded-lg">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Forbidden (403)</p>
              <p className="text-2xl font-mono text-yellow-500">28</p>
            </div>
            <div className="p-4 bg-[#0a0a0e] border border-[#222226] rounded-lg">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Threats Found</p>
              <p className="text-2xl font-mono text-red-500">03</p>
            </div>
          </div>

          {/* High Priority Findings */}
          <div className="flex-1 bg-[#0a0a0e] border border-[#222226] rounded-lg flex flex-col min-h-[300px]">
            <div className="bg-[#14141a] px-4 py-2 border-b border-[#222226] shrink-0">
              <span className="text-[10px] font-bold tracking-widest text-[#ff3e3e]">HIGH_PRIORITY_ASSETS</span>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#222226]">
              <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-500/20 rounded">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></div>
                <div>
                  <p className="text-[11px] font-bold text-red-400 mb-1">EXPOSED CONFIG FILE</p>
                  <p className="text-[10px] font-mono text-zinc-400">/.env leaked. Contains DB_PASS, API_KEY, SMTP_HOST.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-900/10 border border-yellow-500/20 rounded">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 shrink-0"></div>
                <div>
                  <p className="text-[11px] font-bold text-yellow-400 mb-1">GRAPHQL INTROSPECTION</p>
                  <p className="text-[10px] font-mono text-zinc-400">/graphql endpoint allows schema querying.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-zinc-900/50 border border-zinc-700/30 rounded opacity-60">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-zinc-600 shrink-0"></div>
                <div>
                  <p className="text-[11px] font-bold text-zinc-400 mb-1">METRICS ENDPOINT</p>
                  <p className="text-[10px] font-mono text-zinc-500">Prometheus metrics accessible at /metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Toolbar */}
      <footer className="h-10 border-t border-[#222226] bg-[#07070a] flex items-center px-4 sm:px-6 gap-4 sm:gap-6 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-[10px] uppercase font-bold tracking-tighter">Uplink Stable</span>
        </div>
        <div className="h-4 w-px bg-zinc-800 shrink-0"></div>
        <div className="flex-1 flex gap-4 shrink-0">
          <span className="text-[10px] font-mono text-zinc-600 truncate">[SYS] Buffer: 4096kb</span>
          <span className="text-[10px] font-mono text-zinc-600 truncate hidden sm:inline">[RES] JSON_SAVED: strike_1698424211.json</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 shrink-0">
          THREAD_COUNT: 16 // TIMEOUT: 5000ms
        </div>
      </footer>
    </div>
  );
}
