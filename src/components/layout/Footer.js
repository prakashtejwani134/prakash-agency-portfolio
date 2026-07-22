import { Mail, ArrowUpRight } from "lucide-react";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55v-2.03c-3.16.69-3.83-1.36-3.83-1.36-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.74.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.59.23 2.76.11 3.05.73.79 1.17 1.79 1.17 3.03 0 4.35-2.65 5.31-5.18 5.59.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55A11.11 11.11 0 0 0 23.1 11.6C23.1 5.33 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@prakashtejwani.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/[0.06] pb-12 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald/80">
              Let&apos;s build the system
            </p>
            <h3 className="mt-4 max-w-md font-serif text-3xl italic leading-tight text-alabaster md:text-4xl">
              Stop renting a website.
              <br /> Own a growth engine.
            </h3>
          </div>
          <a
            href="#contact"
            className="cursor-pointer-target group flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 font-mono text-xs uppercase tracking-wider text-alabaster transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            Start a project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pt-8 md:flex-row md:items-center">
          <div className="font-serif text-xl italic text-alabaster">
            Prakash Tejwani<span className="text-emerald">.</span>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="cursor-pointer-target flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-alabaster/70 transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="font-mono text-[11px] text-alabaster/40">
            © {year} · AI Web Architect &amp; Growth Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
