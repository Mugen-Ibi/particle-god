# PARTICLE GOD
### Shape a universe from a million points of light.

> **Model / agent:** GPT-6.1 Sol in Codex. Start at Medium reasoning; move to High for a specific technical bottleneck, shader issue, or architectural decision. No Astra handoff is required.
>
> **Operating mode:** Autonomous implementation. Work in the current repository, inspect it before modifying, build the working application, test it, and fix defects. Do not stop after writing a plan or a visual mockup. If the repository is empty, initialize a minimal Vite + TypeScript project.

## Your mission

You are simultaneously a creative technologist, senior Three.js/WebGL engineer, interaction designer, technical artist, and rigorous QA reviewer. Your deliverable is an **actually runnable, art-directed interactive experience**, not a slide deck, conceptual pitch, static landing page, or collection of unrelated effects.

Build to a quality bar where a silent 10–20-second screen recording makes a stranger immediately understand the visual hook. Prioritize one extraordinary, coherent interaction over ten unfinished gimmicks. Invent creative details rather than asking for aesthetic preferences.

## Creative thesis

The screen begins with darkness and a barely visible dust cloud. At the user's gesture, hundreds of thousands of points respond as though they are a living material. They condense into a face, disperse into a galaxy, and reassemble into impossibly detailed typographic or sculptural structures. The work must feel like **touching a living constellation**, not playing back particle-system presets.

The signature is a deeply responsive **morphing particle field** with convincing inertia, attractors, turbulence, and legible target forms.

## Experience structure

1. **THE VOID.** Begin with particles in a suspended, low-motion volumetric cloud. A small invitation (`MOVE TO DISTURB`) encourages pointer motion. The pointer deflects particles locally even before the first click.
2. **THE FIRST FORM.** Press/hold or click `FORM` to pull the dust into a human-like face or hands, preferably a generated reference mesh whose surface has been sampled into consistent particle targets. As the user orbits the camera, the shape reads in 3D rather than flattening into a sprite.
3. **GALACTIC RELEASE.** A decisive gesture or key causes the figure to dissolve and spiral into a galaxy. Global motion becomes rotational, while a local pointer field still scatters nearby particles.
4. **THE WORD.** The galaxy condenses into large, deeply sculpted editorial lettering (e.g., `WE ARE DUST`). Typography must be legible, not a random soup of points.
5. **YOUR CREATION.** The user can write a short word or choose a prebuilt silhouette; particles regroup into the new target. A `REPLAY` control returns to the void and repeats reliably.

## Visual direction

- Palette: black with restrained warm-white particles, subtle gold/blue depth shifts, and deliberate bloom.
- Particles should exhibit spatial depth and velocity-linked behavior, but remain distinct. Avoid oversized glowing blobs that obscure form readability.
- Use cinematic framing, micro-particle layers, depth fog and nuanced slow motion at key reveals.
- UI is tiny, typography is architectural, and the 3D formation occupies most of the viewport.

## Technical architecture

- Set an **aspirational target of 500k–1M GPU-driven particles on capable desktop hardware**, and implement adaptive budgets rather than making a false universal performance claim. Show a truthful active particle count in an optional diagnostics view.
- Prefer WebGL2 GPU simulation via ping-pong floating-point textures / render targets (or an equivalently supported Three.js GPU approach). Encode position/velocity in textures and update with shader passes. Drive points or instanced quads by sampling simulation textures in vertex shaders.
- Implement attractors, repulsion, curl-like noise, damping, and target-seeking as distinct weighted forces. Clamp timestep; avoid exploding velocities and NaN states. Preserve stable particle IDs across morphs for coherent motion.
- Construct morph targets from procedural 3D geometry and generated text surfaces, sampling or packing them into consistent target position buffers/textures. If reference meshes are unavailable, generate a stylized bust/hand abstractly rather than shipping a broken asset dependency.
- For a fallback path, use significantly fewer particles and CPU updates, or a simplified non-simulated rendering mode; communicate the limitation.
- Avoid copying GPU textures back to the CPU each frame. Preallocate buffers and render targets and dispose of them on teardown.

## Interaction design

- Move pointer: local velocity-sensitive disturbance; hold: attract; shift/secondary gesture: repel; scroll/pinch: camera orbit or field scale. Provide obvious mobile tap/drag equivalents and a few explicit buttons.
- Optional microphone reactivity may be added **only as opt-in**, with a clear enable/disable control and local-only FFT analysis. The core experience must work beautifully without microphone access.
- Include a gentle-mode path for reduced motion and a simple low/medium/high quality selector.

## Special WOW moment

When the user drags a finger across the newly formed face, the face partially **disintegrates along the gesture path and reconstructs itself behind the motion**. The object should remain recognizable during the disturbance instead of collapsing as one uniform cloud.

## Acceptance tests specific to this project

- The active particle count can be inspected and changes meaningfully with quality settings.
- Interaction visibly perturbs trajectories in real time; physics remains stable after repeated aggressive gestures.
- Morphs are smooth and recognizable from several angles; the typed-word workflow really updates geometry.
- Mobile and non-microphone experiences work with no missing states or permission prompts.
- Repeated morphs and resets do not accumulate frame-time degradation or GPU resources.

## Engineering rules

- Default to **Vite + TypeScript + Three.js**, with custom GLSL shaders as needed. Use vanilla HTML/CSS for the minimal UI. Add a dependency (GSAP, Rapier, postprocessing, etc.) only where it clearly simplifies or improves the implementation. Do not add React, servers, paid services, accounts, or external AI APIs by default.
- Implement the signature illusion honestly: no prerecorded video standing in for an interactive scene; no dummy controls; no fake feature labels; no claimed scientific accuracy or performance not supported by evidence.
- Manage resize, device-pixel ratio (cap it), frame delta, WebGL resources, visibility changes, audio initialization, and teardown. Avoid unnecessary allocations in render loops. Account for touch as well as mouse/keyboard.
- Aim for **responsive 60 fps on a reasonably capable desktop**, with adaptive render scale / particle counts / detail levels for weaker devices. Measure rather than assert. Fall back gracefully if a shader feature or WebGL context is unsupported.
- Use generated geometry, procedural textures, openly licensed bundled assets, or assets created locally. Avoid opaque asset pipelines, hotlinked dependencies, proprietary assets, and credentials.
- Support **prefers-reduced-motion**, an accessible alternative to gesture-only input, visible loading/error/unsupported states, readable controls, sensible focus handling, and color contrast. Provide mute controls if audio exists; start sound only after a user gesture. Don't require microphone/camera permission unless the experience genuinely needs it, and never upload captured data without explicit consent.
- Design as a work of art: exceptional composition, lighting, material response, typography, transitions, pacing, and deliberate restraint. Default to an intentional non-generic art direction rather than rainbow neon, dashboard chrome, or standard demo UI.

## Build process — perform, don't merely describe

1. **Inspect** the repository and available commands. Write a short creative/technical plan (max ~20 lines) explaining the core illusion, scene/state architecture, hardest risk, and first vertical slice.
2. **Implement the vertical slice**: get the entire primary experience from its beginning to its signature reveal and usable reset/replay, with real input and rendering. It is better to have a beautiful, complete short piece than a large unfinished world.
3. **Polish deliberately**: add shaders, camera choreography, responsiveness, nuanced interactions and audio only after the loop works. Revisit the weakest visual moments.
4. **Verify** by installing dependencies and running available lint/type checks, build, and tests. If a browser runner or screenshot capture is available, actually open the experience, interact with every essential control, inspect screenshots, and fix visual defects. If one of these tools is unavailable, explicitly state what could not be verified.
5. **Deliver** the working source and concise run commands (`npm install`, `npm run dev`, `npm run build`), a short note on controls, measured/observed limitations, and 2–4 specific future improvements. Never claim checks you did not run.

## Definition of done

- The named signature effect is unmistakable and **interactive**, not merely asserted in copy.
- The main sequence has a beginning, an escalation, a memorable reveal, and a satisfying reset or replay.
- Inputs are intuitive; key transitions are smooth; the default camera framing is visually excellent.
- The app works on desktop and degrades gracefully on mobile; build succeeds; the experience does not leak resources across retries.
- Visual consistency, usability, and runtime quality are more important than check-box feature counts.

**Final instruction:** Surprise me with the execution, not with scope creep. Make the experience unforgettable and demonstrably functional.


---

<!-- 04_living_city.md -->

