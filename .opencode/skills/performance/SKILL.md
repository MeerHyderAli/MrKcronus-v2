\---

name: performance

description: Audit and optimize MR.KCRONUS for loading performance, runtime animation performance, responsive assets, and Core Web Vitals.

\---



\# Performance



Performance is part of the design.



\## Priorities



Protect:



\- LCP

\- INP

\- CLS

\- initial JavaScript

\- image loading

\- scroll performance



Targets:



LCP < 2.5s

INP < 200ms

CLS < 0.1



\## Images



Inspect image dimensions and formats.



Use appropriate responsive image sizes.



Avoid loading large assets before they are needed.



Do not unnecessarily preload every visual asset.



\## Animation



Prefer:



\- transform

\- opacity



Be cautious with:



\- filter

\- blur

\- large clip-path animations

\- layout properties

\- expensive shadows



\## Scroll



Do not cause React state updates on every scroll event unless necessary.



Prefer:



\- Motion scroll primitives

\- requestAnimationFrame where appropriate

\- CSS

\- IntersectionObserver



\## 3D



Do not introduce WebGL merely for visual novelty.



CSS 3D and 2.5D should be preferred where visually sufficient.



\## Mobile



Mobile should have an intentionally lighter visual experience where necessary.



Do not simply scale the desktop experience down.



\## Verification



When performance changes are made, explain what changed and why it should improve runtime or loading behavior.

