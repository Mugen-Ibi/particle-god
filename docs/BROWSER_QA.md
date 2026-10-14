# Browser verification

Date: 2026-10-14. Source, dependencies and builds are in Ubuntu WSL2. Native checks use isolated headless Edge, WebGL2, ANGLE / AMD Radeon 780M / D3D11. WSL Chromium fallback checks use ANGLE SwiftShader; hardware and software measurements are kept distinct.

Native Edge / AMD Radeon 780M: frontal and ~55° profile views establish a volumetric head, neck and shoulders, rather than a flat face sprite. Drag disturbs a local surface patch. Medium 65,536 points warmed to about 144 fps. Earlier Chromium GPU-path checks exercised face→galaxy→typed DUST, low 16,384 and high 589,824 points, eight replay/form cycles with five textures/two geometries, and portrait layout. Additional isolated CPU fallback/context/mobile evidence is recorded below. Screenshots were inspected; early pre-fix face captures are intentionally excluded.

## Latest targeted verification

Latest native HIGH: 589,824 active points at ~143.85 fps, clean context restoration without warnings. Twenty-four aggressive actual drags left WebGL error=0, five textures/two geometries. Separate SwiftShader CPU path: 8,192 points, face/galaxy/DUST, unsupported zero-width glyph fallback and finite targets; observed CPU samples ~57–59 fps. Fresh 390×844 reduced-motion touch initialization and typing LIGHT, quality changes and settled typography were exercised. Ten additional resets retained five textures/two geometries.

All nine projects were additionally opened in a 390×844 mobile context with hasTouch=true and reducedMotion=reduce. Real CDP swipe/pinch/tap input and the relevant controls were exercised. These are device-emulation results, not physical-device certification.

## Evidence

- [Screenshot particle-face-revised.png](screenshots/particle-face-revised.png)
- [Screenshot particle-side-revised.png](screenshots/particle-side-revised.png)
- [Screenshot particle-word.png](screenshots/particle-word.png)
- [Screenshot particle-native-final.png](screenshots/particle-native-final.png)
- [Screenshot mobile-light-settled.png](screenshots/mobile-light-settled.png)
- [Screenshot particle-aggressive.png](screenshots/particle-aggressive.png)

Author automation and raw CLI results: Windows task `.qa/` folder. Screenshots are real application captures, not generated illustrations.

## Limits

Desktop mouse/keyboard and emulated touch/portrait layout were exercised. Physical touch devices, screen readers, Safari/Firefox and a long hardware thermal endurance run were not tested. No public hosting was deployed. The original specification is preserved in SPEC.md; ACCEPTANCE.md distinguishes code/unit evidence from browser observations.
