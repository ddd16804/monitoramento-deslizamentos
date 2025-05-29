const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurações específicas para resolver o erro
config.resolver = {
  ...config.resolver,
  // Bloqueia o pacote problemático
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    '@lottiefiles/dotlottie-react': false
  },
  // Garante suporte a arquivos .json
  sourceExts: [...config.resolver.sourceExts, 'json'],
  // Ignora a resolução do módulo no web
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === '@lottiefiles/dotlottie-react') {
      return {
        filePath: '',
        type: 'empty'
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = config;