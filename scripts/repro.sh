adb shell wm size 1080x2400; adb shell am start -n com.reproducerapp/.MainActivity; sleep 8
for i in $(seq 8); do adb shell input swipe 540 1800 540 600 80; sleep 0.12; done   # deep, fast
adb shell wm size 1768x2400; sleep 3                                                # "unfold"
for i in $(seq 6); do adb shell input swipe 884 1800 884 600 80; sleep 0.25; done
adb shell wm size 1080x2400; sleep 3                                                # "fold"
adb shell input swipe 540 1800 540 600 80                                           # one fling, then hands off
adb logcat -s ReactNativeJS | grep contentSize
