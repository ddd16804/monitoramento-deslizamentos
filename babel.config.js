module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // Solução para o erro do dotlottie
            '@lottiefiles/dotlottie-react': false,
            // Redirecionamento seguro do LottieView
            'lottie-react-native/LottieView': 'lottie-react-native/src/LottieView',
            // Aliases para seus paths (opcional)
            '@components': './src/components',
            '@assets': './assets'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        }
      ],
      // Plugin do Reanimated (mantenha se estiver usando)
      'react-native-reanimated/plugin',
      // Adicione outros plugins que você já usa abaixo
    ]
  };
};