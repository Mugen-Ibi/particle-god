# PARTICLE GOD

A living constellation: suspended dust becomes an original procedural three-dimensional bust, opens into a spiral galaxy, then settles into extruded lettering. Pointer forces are local; displaced particles seek their original targets again.

## Run

Use Node 22.12+ (verified with Linux Node 24.21.0).

```sh
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## Controls

Move over the scene to disturb particles; hold to attract. Shift + hold or two fingers repel. Scroll and left/right arrows orbit; Space advances the sequence; 1 / 2 / 3 select the human, galaxy and word. The stage buttons provide gesture-free alternatives. Enter a word (up to 14 characters) and press FORM to rebuild its real particle target positions. Replay resets the simulation. The information button opens quality, gentle motion and live diagnostics. Mobile uses low quality initially. Reduced-motion preference enables gentle mode.

## Implementation and honesty

Three.js GPUComputationRenderer runs two coupled ping-pong floating-point textures for position and velocity. A damped spring, bounded local field and curl-like trigonometric turbulence generate motion; this is an artistic force field, not physically accurate fluid simulation. Timestep is clamped to 33 ms. Stable texture indices are particle identities. Procedural face targets have a tapered jaw, nose bridge/tip/nostrils, eye sockets, brow/cheek relief, mouth/chin, ears, neck and fully sampled shoulders. Unit surface normals are derived from finite differences of the original procedural surface. Face-only alpha blending, view-facing attenuation and directional/surface-feature shading suppress back-surface overlap so the facial relief remains visible; dust/galaxy/word retain additive halos. Text is sampled from a locally generated canvas alpha mask and extruded into a 0.65-unit-deep point volume; the bitmap never replaces the rendered scene.

GPU quality budgets are 16,384 / 65,536 / 589,824 particles. The high tier meets the 500k aspiration, but hardware throughput and 60 fps are not universally claimed. After sustained slow frames, the app steps down quality. CPU fallback budgets are 4,096 / 8,192 / 16,384; add `?cpu=1` to exercise it. WebGL itself is required. CPU fallback keeps the same stages and pointer mechanics. No network assets, audio, microphone, paid services or credentials are required.

`window.__experience` exposes actual count, stage, mode, quality, FPS, word, target checksum, gentle mode, frame count, context-loss state and renderer resource counts. Repeated target changes reuse buffers/textures; quality changes and replay dispose the previous render graph. Context restoration rebuilds simulation from the void positions into the current target. Visibility pauses computation. Rendering uses restrained additive point halos, not a full-screen postprocessing bloom chain.

## Verified and limits

Typecheck, production build and deterministic numerical tests are run in WSL. Parent agent performs browser/visual QA separately; see docs/ACCEPTANCE.md for its current status. High-tier native GPU throughput, physical touch devices and long-duration resource behavior need measurement on hardware. The bust is intentionally stylized; the font uses system Arial with sans-serif fallback, so exact glyph shape is platform-dependent. Morph time is governed by spring convergence rather than a fixed animation timeline. Touch drags disturb, two fingers repel and pinch changes camera distance. The information panel has accessible orbit/zoom buttons. Face interaction rays meet an analytic head sphere; other forms use camera-facing or galaxy ground planes. Empty glyph masks display a procedural question mark with an explicit status.

Future improvements: sample a richer original face mesh, add per-particle surface-normal shading, measure a longer stress sequence on several GPUs, and add an accessible pinch/orbit toggle on mobile.
