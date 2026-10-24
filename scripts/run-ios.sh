#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f ios/Podfile ]]; then
	npx expo prebuild --platform ios --no-install
fi

# Expo's CocoaPods stub must use the SDK shipped with the selected Xcode.
MACOS_SDK="$(xcrun --sdk macosx --show-sdk-path)"
(
	cd ios
	SDKROOT="$MACOS_SDK" pod install
)

npx expo run:ios --no-install "$@"
