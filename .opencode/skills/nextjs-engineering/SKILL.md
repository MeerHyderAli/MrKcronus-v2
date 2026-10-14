\---

name: nextjs-engineering

description: Build maintainable Next.js App Router interfaces for MR.KCRONUS using TypeScript, Server Components, Client Components, and minimal dependencies.

\---



\# Next.js Engineering



\## Architecture



Use Next.js App Router conventions.



Prefer Server Components.



Use Client Components only when required by:



\- browser APIs

\- interactivity

\- animation state

\- event handlers

\- client-side hooks



Keep client boundaries small.



\## TypeScript



Maintain strict typing.



Do not use any unless genuinely unavoidable.



Prefer explicit types for complex animation state and data structures.



\## Components



Components should have clear responsibilities.



Do not create abstractions solely because two components look similar.



Avoid premature design-system architecture.



\## Data



For the current brand-experience phase, do not introduce a database or ecommerce data model unless explicitly requested.



\## Images



Use appropriate Next.js image optimization where practical.



Do not sacrifice the supplied artwork's visual integrity for convenience.



\## Dependencies



Before adding a package:



1\. Determine whether existing APIs can solve the problem.

2\. Determine whether the dependency materially improves the implementation.

3\. Check bundle/performance implications.

4\. Add only when justified.



\## Verification



After meaningful implementation:



\- lint

\- typecheck

\- production build



Fix issues before claiming completion.

