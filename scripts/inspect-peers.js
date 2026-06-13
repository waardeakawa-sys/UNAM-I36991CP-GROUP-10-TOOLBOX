const { execSync } = require('child_process');
const pkgs = [
  ['expo', '54.0.0'],
  ['expo-router', '3.5.24'],
  ['@expo/vector-icons', '14.0.0'],
  ['expo-font', '10.0.5'],
  ['@react-navigation/drawer', '6.5.8'],
  ['react-native-gesture-handler', '2.4.2'],
  ['react-native-reanimated', '2.14.4'],
  ['react-native-screens', '3.18.2'],
  ['react-native-safe-area-context', '4.5.0'],
  ['react-native-web', '0.18.11'],
];
for (const [pkg, ver] of pkgs) {
  try {
    const out = execSync(`npm view ${pkg}@${ver} peerDependencies --json`, {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
    });
    console.log(`${pkg}@${ver}:`, out.trim());
  } catch (e) {
    console.error(`ERR ${pkg}@${ver}:`, e.message);
  }
}
