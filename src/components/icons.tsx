import { BookOpen, CircleHelp, FileText, KeyRound, Laptop, List, LockKeyhole, Printer, ShieldCheck, Ticket, Users, Wifi } from "lucide-react";

const icons = {
  book: BookOpen, help: CircleHelp, file: FileText, key: KeyRound, laptop: Laptop,
  list: List, lock: LockKeyhole, printer: Printer, shield: ShieldCheck,
  ticket: Ticket, users: Users, wifi: Wifi,
};

export function Icon({ name, size = 22 }: { name: keyof typeof icons | "microsoft"; size?: number }) {
  if (name === "microsoft") {
    return <span aria-hidden="true" className="grid size-5 grid-cols-2 grid-rows-2 gap-[2px]">
      <span className="bg-[#f25022]" /><span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" /><span className="bg-[#ffb900]" />
    </span>;
  }
  const Component = icons[name];
  return <Component size={size} aria-hidden="true" />;
}
