\---

name: accessibility

description: Ensure MR.KCRONUS interfaces remain keyboard accessible, semantic, readable, and usable with reduced motion.

\---



\# Accessibility



Premium visual design does not override accessibility.



\## Structure



Use semantic HTML:



\- header

\- nav

\- main

\- section

\- footer

\- button

\- a



Do not use clickable divs when semantic controls exist.



\## Keyboard



All interactive elements must be keyboard accessible.



Focus states must remain visible.



Do not remove outlines without providing an equivalent visible focus treatment.



\## Images



Provide meaningful alt text when imagery communicates content.



Decorative imagery may use empty alt text.



\## Motion



Respect:



prefers-reduced-motion: reduce



Provide an intentional reduced-motion experience.



\## Contrast



Maintain readable text contrast.



Antique gold should not be used as small body text when contrast is insufficient.



\## Navigation



Mobile navigation must be keyboard and screen-reader usable.



Interactive controls must have accessible names.



\## Validation



When changing major UI:



\- inspect semantic structure

\- test keyboard navigation

\- inspect focus states

\- verify reduced-motion behavior

