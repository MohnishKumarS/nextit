"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, ChevronRight, Clock, ExternalLink, LockKeyhole, Search } from "lucide-react";
import { resources, tiles } from "@/lib/services";
import { Icon } from "./icons";

const tones = { pink: "bg-[#f7e4f0] text-accent", lilac: "bg-[#ece2fb] text-[#452278]", blue: "bg-[#d3eaf8] text-[#084e73]" };
const stats = [
  { title: "Service Availability", value: "99.9%", icon: BarChart3 },
  { title: "Average Response Time", value: "< 4 Hours", icon: Clock },
  { title: "Knowledge Articles", value: "200+", icon: BookOpen },
];

export function PortalHome() {
  const [search, setSearch] = useState("");
  const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (text: string) => terms.every(term => text.toLowerCase().includes(term));
  const visibleTiles = tiles.filter(tile => matches(`${tile.title} ${tile.description} ${tile.action}`));
  const visibleGroups = resources.map(group => ({
    ...group,
    items: group.items.filter(item => matches(`${group.title} ${item.title} ${item.description}`)),
  })).filter(group => group.items.length);
  const resultCount = visibleTiles.length + visibleGroups.reduce((total, group) => total + group.items.length, 0);

  return <>
    <section className="hero text-white">
      <div className="wrap py-8 sm:py-10">
        <p className="text-xl sm:text-2xl">Welcome to</p>
        <h1 className="mt-1 text-[clamp(2.55rem,6vw,4.1rem)] leading-tight font-bold tracking-tight">IT Self-Service</h1>
        <p className="mt-2 max-w-xl text-base text-blue-50 sm:text-lg">Access IT support, software, password management, and service resources through a single secure portal.</p>
        <div role="search" className="mt-6 flex max-w-[700px] items-center gap-3 rounded-md bg-white px-4 text-ink">
          <Search size={22} aria-hidden="true" className="shrink-0" />
          <label className="sr-only" htmlFor="service-search">Search IT services</label>
          <input id="service-search" type="search" className="min-h-12 min-w-0 grow rounded px-1 text-sm placeholder:text-muted sm:text-base" placeholder="Search for services, applications or support resources" value={search} onChange={event => setSearch(event.target.value)} />
        </div>
      </div>
    </section>
    <section aria-label="Service figures from the design sample" className="bg-[#e9f2f9]">
      <div className="wrap grid gap-3 py-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_.63fr]">
        {stats.map(({title, value, icon: StatIcon}) => <div key={title} className="flex items-center gap-3 sm:border-r sm:border-[#c5d7e7] lg:gap-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#d4eafa] sm:size-14"><StatIcon size={26} aria-hidden="true" /></span>
          <div><p className="text-sm font-medium">{title}</p><p className="text-2xl font-bold">{value}</p></div>
        </div>)}
        <p className="text-xs text-muted sm:col-span-3 lg:col-span-1 lg:self-center">Supporting a smarter, connected college community.</p>
      </div>
    </section>
    <div className="wrap py-4 sm:py-5">
      <p role="status" className={terms.length ? "mb-3 text-sm text-muted" : "sr-only"}>{terms.length ? `${resultCount} ${resultCount === 1 ? "result" : "results"}` : ""}</p>
      {resultCount === 0 && <p className="panel p-5">No matching services. Try searching for password, software, or Wi-Fi.</p>}
      {visibleTiles.length > 0 && <section aria-label="Primary IT services" className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {visibleTiles.map(tile => <article key={tile.title} className="panel flex flex-col p-5 shadow-[0_4px_16px_#0d2d5009]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className={`grid size-14 place-items-center rounded-full ${tones[tile.tone]}`}><Icon name={tile.icon} size={29} /></span>
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${tile.public ? "bg-[#e1f3eb] text-[#00694e]" : "bg-[#f8e6f1] text-accent"}`}>
              {tile.public ? <CheckCircle2 size={14} aria-hidden="true" /> : <LockKeyhole size={14} aria-hidden="true" />}
              {tile.public ? "No Sign-In Required" : "College Sign-In Required"}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{tile.title}</h2>
          <p className="mt-1 mb-4 grow text-sm leading-relaxed text-muted">{tile.description}</p>
          <a className="button w-full" href={tile.href} target={tile.public ? "_blank" : undefined} rel={tile.public ? "noopener noreferrer" : undefined}>
            {tile.action}{tile.public ? <><ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></> : <ArrowRight size={18} aria-hidden="true" />}
          </a>
        </article>)}
      </section>}
      {visibleGroups.length > 0 && <section id="services" className="mt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Additional Services</h2><p className="mt-0.5 text-sm text-muted">Explore more IT services and resources.</p></div>
          {terms.length > 0 && <button className="cursor-pointer font-semibold text-accent hover:underline" type="button" onClick={() => setSearch("")}>View all services</button>}
        </div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {visibleGroups.map(group => <article key={group.title} className="panel px-4 py-3">
            <h3 className="flex items-center gap-3 pb-2 text-lg font-bold"><Icon name={group.icon} />{group.title}</h3>
            <ul>{group.items.map(item => <li key={item.title} className="border-t border-line">
              <a className="flex items-center gap-3 rounded px-1 py-2.5 hover:bg-surface" href={item.href}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#e9f3fa] text-[#005882]"><Icon name={item.icon} size={19} /></span>
                <span className="grow"><span className="block text-sm font-semibold">{item.title}</span><span className="block text-xs text-muted">{item.description}</span></span>
                <ChevronRight size={17} aria-hidden="true" className="shrink-0 text-muted" />
              </a>
            </li>)}</ul>
          </article>)}
        </div>
      </section>}
    </div>
  </>;
}
