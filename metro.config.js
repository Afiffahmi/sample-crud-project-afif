const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the default Metro configuration
const config = getDefaultConfig(__dirname);

// Apply NativeWind and Reanimated configurations
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, { input: './global.css' })
);
