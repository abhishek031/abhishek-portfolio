import { skills } from "../data/skills";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Tag from "./ui/Tag";
import Reveal from "./ui/Reveal";

function Skills() {
  return (
    <section id="skills" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Skills</SectionHeading>

          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {skills.map((group) => (
              <div
                key={group.category}
                className="border-t border-line pt-4"
              >
                <h3 className="mb-3 text-sm font-medium text-text">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Skills;
