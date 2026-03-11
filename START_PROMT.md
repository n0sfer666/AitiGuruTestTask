read my test task:
https://docs.google.com/document/d/15Iq9gp4POgv7rw0-WFwSpIYmqS1IGBh0P0lYoNBwNbA/edit?usp=sharing
I need you to discuss how we will do it (tools, frameworks, versions, architecture, etc);
In the end, i want you to make a AGENTS.md for this project with this requirements:
 - README.md is in Russian Lang;
 - README.md is very laconic (how-to, main deps, architecture);
 - I want a high level of scalable in code (with DRY, KISS, SOLID);
 - I want to use scss as full as possible (design system with vars, mixins, and function), but without over engineering;
 - i want a module architecture with shared -> components -> module -> pages -> app folders (arrows mean security level. Example, every entity can use shared, even shared, but components can be used only by module and higher);
 - i want to use effector as a state manager but as less as possible;
 - I don't want to see files that bigger than 200 lines (it's a signal to decompose);
 - i want to use vite and aliases (@shared -> src/shared, @modules -> src/modules, etc;
 - if you need my answers (based on technical doc), feel free to ask with any doubt or suggestion;
