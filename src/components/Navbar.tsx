import { navLinks, profile } from "../data/profile";
import Container from "./ui/Container";
import CommandPalette from "./CommandPalette";

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4">
        <a
          href="#home"
          className="shrink-0 font-mono text-sm text-text transition hover:text-signal"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-6">
          <div className="flex gap-5 overflow-x-auto font-mono text-[13px] text-text-muted [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 transition hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </div>
          <CommandPalette />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
