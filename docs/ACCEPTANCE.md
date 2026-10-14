# Acceptance evidence

- [x] Full local primary sequence: void, procedural bust, galaxy, typed word, replay.
- [x] Stable particle IDs and 3D targets; text changes target geometry.
- [x] GPU position/velocity ping-pong and honest CPU fallback.
- [x] Meaningfully distinct actual budgets exposed through `window.__experience`.
- [x] Local pointer fields, bounded velocities and damping; numeric stress unit test.
- [x] Keyboard/buttons/touch input and reduced-motion path implemented.
- [x] No microphone permission, external assets or required accounts.
- [x] Resource disposal, visibility pause, resize and WebGL context recovery implemented.
- [x] Numerical tests: deterministic bounded target sampling; aggressive-force stability/reconstruction; sequence replay; empty-glyph finite fallback; full shoulder coverage; facial relief and unit normals.
- [ ] Parent sequential browser QA: all controls, text checksum, actual GPU rendering and screenshots.
- [ ] Native GPU high-tier frame budget benchmark and prolonged stress/resource measurement.
- [ ] Physical mobile/touch and context-loss restoration visual checks.

Code implementation checks above do not substitute for unchecked runtime/visual verification. Test commands and results are reported to the parent after execution.

Parent browser evidence before visual revision: GPU low/high actual counts, all stage/typed-DUST flow, 8 morph/reset cycles with stable 5 textures / 2 geometries, 390×844 no overflow. Parent identified an unreadable egg-like head and incomplete shoulders; revised surface sampling/shading/composition is awaiting front/side screenshot confirmation.


## Independent browser verification — 2026-10-14

Isolated Playwright CLI session `particle-fallback-qa`, Vite port 5187. Parent browser sessions untouched. Chromium renderer reported ANGLE Vulkan SwiftShader (software), WebGL2; these samples are not native GPU performance claims.

- CPU query path: mode CPU, medium 8,192 points, 0 textures / 1 geometry. Face → galaxy → typed DUST completed. Observed diagnostics samples ~57–59 fps. DUST target checksum 81,558.552966; zero-width-glyph fallback checksum 95,897.076647 stayed finite and displayed its explicit fallback status.
- GPU path: medium 65,536 points with 5 textures / 2 geometries. Actual WEBGL_lose_context loss froze rendering and displayed paused status; restoration resumed frames. An initial restoration produced cross-context deletion warnings, corrected by disposing resources during loss. Recheck on word LIGHT preserved word/stage/checksum 92,952.830157 and restored 5 textures / 2 geometries; 0 console errors / 0 warnings after the fix.
- Ten full face → galaxy → word → replay cycles after restoration each retained exactly 5 textures / 2 geometries and GPU low 16,384 points.
- Fresh 390×844 reduced-motion initialization selected gentle=true, GPU low 16,384. scrollWidth=390. Typed LIGHT and switched to medium 65,536 then low 16,384 successfully. Software medium sample ~52.5 fps, low samples ~58–60 fps; no universal frame-rate promise.
- Screenshots: `output/playwright/cpu-face.png`, `cpu-dust.png`, `cpu-empty-glyph.png`, `gpu-restored.png`, `mobile-reduced-void.png`, `mobile-reduced-light-medium.png`, `mobile-word-restored.png`, `mobile-reset-final.png`, `mobile-light-settled.png`. Copies are in the host workspace `.qa/particle-independent/`.

Physical touchscreen gestures and native high-tier long-duration benchmarking remain unverified by this session. Parent separately approved revised front/profile face screenshots on AMD 780M hardware.
