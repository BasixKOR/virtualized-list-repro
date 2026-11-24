# virtualized-list-repro

Reproducer for a `FlatList` that keeps firing `onContentSizeChange` after its width changes.

Upstream issue: TODO

## What it reproduces

On `@react-native/virtualized-lists` (main / `0.90.0-nightly-20261124-ad969b283`, first seen on 0.86.2), a `FlatList` with a 600dp `ListHeaderComponent` and width-dependent row heights keeps firing `onContentSizeChange` forever (roughly every 80-100 ms) with no touch input, after the list width changes while scrolled deep. Fold/unfold is emulated with `adb shell wm size`.

The list is in `App.tsx`. The rest of the project is the unmodified `npx @react-native-community/cli init --version nightly` template. `ReproducerApp/` is the original reproducer-template app and is not used.

## How to run

Android emulator, e.g. a Medium Phone AVD (1080x2400).

```sh
npm install
npx react-native start
npx react-native run-android
```

Preconditions for the script:

- the app is installed and Metro is running
- the app is not already open
- one device is attached (or `ANDROID_SERIAL` is set)

Then:

```sh
./scripts/repro.sh
```

The script scrolls deep, widens the screen to 1768x2400, scrolls more, narrows it back to 1080x2400, flings once and then stops touching the device. Watch the `VLREPRO contentSize #N` counter in the log output.

## Expected vs actual

- Expected: `onContentSizeChange` stops firing within 1-2 s after the last fling.
- Actual: the counter keeps climbing; 328-406 events in 30 s hands-off.
- With the 1768x2400 step removed from the script: 0 events in the same window.
