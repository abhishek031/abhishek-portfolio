import Container from "./ui/Container";

function Footer() {
  return (
    <footer className="py-10">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-faint">© 2026 Abhishek Sharma</p>
        <p className="font-mono text-xs text-text-faint">
          Java · Spring Boot · React · PostgreSQL · Kafka · WebSocket
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
