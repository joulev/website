---
title: Handling SVG Icon Path Opacity Overlap with Masks
---

If you worked with colours whose alpha (opacity) value is not 0 or 1 before, you probably faced this nasty problem where paths with a non-1 opacity creates darker areas at intersection points. For example (left image)

```tsx
import { Atom } from "lucide-react";

<Atom style={{ width: 200, height: 200, color: "#ff000080" }} />;
```

The good solution to this is flattening, where you combine several `<path />` elements into one so there are no intersections between `<path />` elements. But for some icons, like `Atom` above, simple flattening doesn't work. Or at least I can't make it work from the tools I have and can find. In that case, SVG masks come to help.

In this approach, instead of rendering the icon directly, we use it as a SVG mask for which part of the SVG we want to render (black pixel in the mask &rarr; render, white pixel in the mask &rarr; don't render). Then we simply apply that mask on a rectangle filling the size of the icon. Naturally a rectangle can't intersect itself, so we won't see that opacity issue. Here is the SVG for the right image:

```xml
<svg width="24" height="24" viewBox="0 0 24 24">
  <mask id="a">
    <rect width="24" height="24" fill="black" />
    <!-- the SVG of the <Atom /> icon above -->
    <circle stroke="white" cx="12" cy="12" r="1" />
    <path
      stroke="white"
      d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
    />
    <path
      stroke="white"
      d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
    />
  </mask>
  <rect width="24" height="24" fill="currentColor" mask="url(#a)" />
</svg>
```

Of course, this step is more complicated and there's actually an existing Safari bug where it makes the quality of the SVG drop when you zoom in, but this is the only solution I can find that works with the unflattenable icons (once again, it might just be my skill issue that failed to find a good flattener for my icons).
