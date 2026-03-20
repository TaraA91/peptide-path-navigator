@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-white antialiased overflow-hidden m-0 p-0;
  }
}

.clip-path-reveal {
  clip-path: circle(0% at 50% 50%);
}
.clip-path-revealed {
  clip-path: circle(150% at 50% 50%);
  transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}