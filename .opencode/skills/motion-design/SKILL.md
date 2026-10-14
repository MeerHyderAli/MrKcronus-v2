\---

name: motion-design

description: Design and implement premium cinematic motion, scroll choreography, depth, transitions, and reduced-motion behavior for MR.KCRONUS.

\---



\# Cinematic Motion



Motion is part of the storytelling system.



\## Motion Character



Motion should feel:



\- slow

\- weighted

\- precise

\- intentional

\- cinematic



Avoid:



\- bounce

\- playful springs

\- random floating

\- constant animation

\- rapid transitions

\- excessive blur

\- glitch

\- neon effects



\## Scroll



Prefer scroll-position-driven choreography for major cinematic sequences.



Scroll progress should control meaningful stages rather than triggering disconnected animations.



\## Depth



Prefer:



\- CSS perspective

\- transform-style: preserve-3d

\- layered 2.5D

\- parallax

\- image planes

\- scale

\- opacity

\- masks

\- clip-path



\## Motion Technology



Use CSS for simple deterministic motion.



Use Motion when:



\- interpolation is complex

\- scroll progress mapping is required

\- coordinated animation is required

\- gesture/state animation is required



Do not add an animation library when CSS is sufficient.



\## Performance



Prefer transform and opacity.



Avoid continuous layout-triggering properties.



Avoid large numbers of animated DOM elements.



Avoid expensive filters and blur.



\## Reduced Motion



Respect prefers-reduced-motion.



Replace cinematic movement with:



\- fades

\- simple reveals

\- static compositions

\- minimal transitions



Do not leave important information inaccessible when motion is disabled.



\## Principle



Animation should communicate:



\- emergence

\- tension

\- activation

\- rupture

\- analysis

\- reconstruction

\- discovery



Never animate merely to make the page look busy.

