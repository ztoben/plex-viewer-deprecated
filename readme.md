# plex-viewer

A simple electron app for viewing plex in it's own window.

<img width="624" alt="screenshot 1" src="https://user-images.githubusercontent.com/4007345/62778281-99748100-ba75-11e9-8357-386f1a2b5ec9.png">

## Features
* Keyboard shortcuts
* Sticks on top and remembers window location
* Toggle-able window chrome for a cleaner look
* Media controls for Play/Pause/Skip/Back
* Simple player mode for condensed playback windows
* Quick aspect ratio switching from context menu (4:3 and 16:9)
* Automatically pause content on minimize
* Lock window position
* Change window opacity
* [OSX only] Show across all workspaces

<img src="https://i.imgur.com/tlMJxaf.png" alt="simple player mode 1" height="500"/>

<img width="580" alt="simple player mode 2" src="https://user-images.githubusercontent.com/4007345/62778355-cb85e300-ba75-11e9-9618-c46e730a7323.png">

## Shortcuts
* Toggle minimize - `Shift + Ctrl + X`
* Toggle window frame (chrome) - `Shift + Ctrl + Z`
* Navigate back - `Shift + Ctrl + ←`
* Navigate forward - `Shift + Ctrl + →`
* Simple player mode - `Shift + Ctrl + M`

## Todo
* ~~Persistent settings~~
* Keyboard shortcut editor/viewer
* ~~Keyboard shortcut for pause/play/mute~~
* ~~Auto pause on minimize~~
* ~~Hide/show top navigation~~
* Custom background colors
* Headphone controls


## Releases
1. Update the version in the project's package.json file (e.g. 1.2.3)
2. Commit that change (git commit -am v1.2.3)
3. Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
4. Push your changes to GitHub (git push && git push --tags)
