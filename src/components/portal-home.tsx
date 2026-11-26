"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  LockKeyhole,
  Search,
  Sparkles,
} from "lucide-react";
import { resources, tiles } from "@/lib/services";
import { Icon } from "./icons";

const tones = {
  pink: "bg-[#f8e6f1] text-[#8a1765] ring-[#f1cfe3]",
  lilac: "bg-[#eee8fb] text-[#56328a] ring-[#ded2f5]",
  blue: "bg-[#e2f1fa] text-[#075781] ring-[#cde5f4]",
};
const stats = [
  { title: "Service availability", value: "99.9%", icon: BarChart3 },
  { title: "Average response", value: "< 4 hours", icon: Clock3 },
  { title: "Knowledge articles", value: "200+", icon: BookOpen },
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
    <section className="hero relative isolate overflow-hidden text-white">
      <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-[#70c9ee]/15 blur-3xl" />
      <div className="wrap relative grid min-h-[300px] items-center gap-8 py-6 sm:min-h-[320px] sm:py-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="home-enter max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-50 backdrop-blur sm:mb-5">
            <Sparkles size={14} aria-hidden="true" /> REGENT COLLEGE LONDON · IT SUPPORT
          </span>
          <h1 className="max-w-xl text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] font-bold tracking-tight">
            The support you need, <span className="text-[#b9e8ff]">all in one place</span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-50 sm:mt-5 sm:text-lg">
            Find software, manage your account, and get help from the IT Service Desk.
          </p>
          <div role="search" className="mt-5 flex max-w-[660px] items-center gap-3 rounded-xl bg-white px-4 text-ink shadow-[0_16px_50px_#052b4570] sm:mt-7">
            <Search size={21} aria-hidden="true" className="shrink-0 text-[#45627c]" />
            <label className="sr-only" htmlFor="service-search">Search IT services</label>
            <input id="service-search" type="search" className="min-h-12 min-w-0 grow rounded-lg bg-transparent px-1 text-sm outline-none placeholder:text-muted sm:min-h-14 sm:text-base focus-visible:outline-none" placeholder="Search services, software or support…" value={search} onChange={event => setSearch(event.target.value)} />
            <span className="hidden rounded-md bg-[#f0f4f8] px-2 py-1 text-xs text-muted sm:inline">Search</span>
          </div>
          <a href="#services" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white sm:mt-5">
            Explore services <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="home-enter home-enter-delay hidden justify-self-end lg:block">
          <div className="w-[270px] rounded-2xl border border-white/20 bg-[#063750]/65 p-5 shadow-[0_20px_70px_#031e3566] backdrop-blur-md xl:w-[320px]">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/15 text-[#c5edff]">
              <Icon name="shield" size={25} />
            </div>
            <p className="text-sm font-medium text-blue-100">Here when you need us</p>
            <p className="mt-1 text-2xl font-bold">IT support, made simple.</p>
            <a href="/help" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#c5edff] hover:text-white">
              Visit the help centre <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section aria-label="IT service highlights" className="border-b border-[#dce8f1] bg-white">
      <div className="wrap grid gap-2 py-5 sm:grid-cols-3 lg:py-6">
        {stats.map(({ title, value, icon: StatIcon }, index) => <div key={title} className={`flex items-center gap-4 px-2 py-2 sm:px-5 ${index > 0 ? "sm:border-l sm:border-[#e1eaf1]" : ""}`}>
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e8f4fb] text-[#075781]"><StatIcon size={22} aria-hidden="true" /></span>
          <div><p className="text-xs font-medium text-muted">{title}</p><p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p></div>
        </div>)}
      </div>
    </section>

    <div className="wrap py-10 sm:py-14">
      <p role="status" className={terms.length ? "mb-5 text-sm font-medium text-muted" : "sr-only"}>{terms.length ? `${resultCount} ${resultCount === 1 ? "result" : "results"}` : ""}</p>
      {resultCount === 0 && <p className="panel p-5">No matching services. Try searching for password, software, or Wi-Fi.</p>}

      {visibleTiles.length > 0 && <section id="services" aria-label="Primary IT services">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">Get started</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular services</h2>
            <p className="mt-2 text-sm text-muted sm:text-base">Quick access to the things you use most.</p>
          </div>
          <a href="/help" className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">Need a hand? <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {visibleTiles.map((tile, index) => <article key={tile.title} className={`home-card group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-[0_8px_24px_#1236500a] transition duration-300 hover:-translate-y-1.5 hover:border-[#c4d9e8] hover:shadow-[0_18px_40px_#12365018] sm:p-6 ${index === 0 ? "home-card-enter" : index === 1 ? "home-card-enter home-card-delay-1" : "home-card-enter home-card-delay-2"}`}>
            <div className="absolute -right-12 -top-12 size-36 rounded-full bg-[#f5f8fb] transition-transform duration-500 group-hover:scale-125" />
            <div className="relative mb-5 flex items-start justify-between gap-3">
              <span className={`grid size-14 place-items-center rounded-2xl ring-1 transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 ${tones[tile.tone]}`}><Icon name={tile.icon} size={27} /></span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ${tile.public ? "bg-[#e7f5ee] text-[#08734f]" : "bg-[#f8e6f1] text-accent"}`}>
                {tile.public ? <CheckCircle2 size={13} aria-hidden="true" /> : <LockKeyhole size={13} aria-hidden="true" />}
                {tile.public ? "No sign-in required" : "College sign-in required"}
              </span>
            </div>
            <h3 className="relative text-xl font-bold tracking-tight sm:text-2xl">{tile.title}</h3>
            <p className="relative mt-2 mb-6 grow text-sm leading-relaxed text-muted">{tile.description}</p>
            <a className="relative inline-flex min-h-11 w-full items-center justify-between rounded-xl bg-[#f4f7fa] px-4 text-sm font-bold text-ink transition-colors group-hover:bg-accent group-hover:text-white" href={tile.href} target={tile.public ? "_blank" : undefined} rel={tile.public ? "noopener noreferrer" : undefined}>
              {tile.action}
              {tile.public ? <ExternalLink size={16} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
            </a>
          </article>)}
        </div>
      </section>}

      {visibleGroups.length > 0 && <section className="mt-14 sm:mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">More ways to get help</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore resources</h2>
            <p className="mt-2 text-sm text-muted sm:text-base">Guides and useful links to keep you moving.</p>
          </div>
          {terms.length > 0 && <button className="mb-1 cursor-pointer font-semibold text-accent hover:underline" type="button" onClick={() => setSearch("")}>Clear search</button>}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {visibleGroups.map((group, index) => <article key={group.title} className={`home-resource rounded-2xl border border-line bg-white p-4 shadow-[0_6px_20px_#12365008] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_#12365014] sm:p-5 ${index === 1 ? "home-card-delay-1" : index === 2 ? "home-card-delay-2" : ""}`}>
            <h3 className="flex items-center gap-3 pb-4 text-lg font-bold">
              <span className="grid size-10 place-items-center rounded-xl bg-[#edf4fa] text-[#075781]"><Icon name={group.icon} size={20} /></span>{group.title}
            </h3>
            <ul>{group.items.map(item => <li key={item.title} className="border-t border-[#edf1f5]">
              <a className="group flex items-center gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-[#f5f8fb]" href={item.href}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f2f6fa] text-[#45627c] transition-colors group-hover:bg-white"><Icon name={item.icon} size={18} /></span>
                <span className="grow"><span className="block text-sm font-semibold">{item.title}</span><span className="mt-0.5 block text-xs leading-relaxed text-muted">{item.description}</span></span>
                <ChevronRight size={17} aria-hidden="true" className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </li>)}</ul>
          </article>)}
        </div>
      </section>}
    </div>
  </>;
}
