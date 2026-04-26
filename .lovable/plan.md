Plan to upgrade the hero while keeping the same structure:

1. Preserve the current layout exactly
   - Keep the three-column hero arrangement:
     - Left: circular Vastu plan + compass image
     - Center: heading, subtext, buttons
     - Right: vertical capsule palm-reading image
   - Do not add icons except the single minimal sacred symbol above the heading.
   - Do not introduce extra decorative elements or restructure the hero content.

2. Remove remaining heavy/dirty effects
   - Remove the current central radial glow from the hero.
   - Ensure there is no background video, plan/drawing texture, heavy geometry, or clutter behind the hero.

3. Add a barely visible premium background motion layer
   - Add a very soft animated background using CSS only, such as a slow warm gradient/light-ray shift.
   - Keep it extremely subtle and low contrast.
   - Place a solid cream overlay above it using #FDF6EE at approximately 85–90% opacity, so the hero still reads as a clean cream background.
   - Add a very soft vignette at the edges, only 2–3% darker.

4. Add the minimal sacred symbol above the heading
   - Add a thin line-style sacred symbol centered above the eyebrow/heading area.
   - Use a small, elegant SVG/CSS line mark in warm orange/brown tones.
   - Animate it with a slow fade and slight vertical float only.

5. Add refined entrance animations
   - Heading: smooth fade up.
   - Subtext: fade up with slight delay.
   - Buttons: fade up last.
   - Left image: gentle slide in from left.
   - Right image: gentle slide in from right.
   - Keep all animation slow, soft, and luxury-brand calm, not flashy.

6. Add premium image interaction
   - Keep images sharp and clean, no blur and no dramatic lighting.
   - Add a very soft hover zoom on the image itself, around 1.02–1.03.
   - Keep the existing subtle shadow under both images.

Technical details:
- Edit `src/routes/index.tsx` only for hero class names and the small sacred symbol markup.
- Edit `src/styles.css` to add the background motion, cream overlay, vignette, entrance animations, sacred symbol float, and hover zoom classes.
- Respect `prefers-reduced-motion` by keeping the existing reduced-motion behavior.
- Run a build check after implementation to confirm the page compiles.