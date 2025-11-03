// Auto-redirect para idioma do navegador - Versão corrigida
document.addEventListener("DOMContentLoaded", function () {
    console.log("Auto-redirect script carregado!");
    
    // Configurações
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? '' : '/Documentation';
    const supportedLangs = ["pt-br", "en", "es"];
    const defaultLang = "en";

    // Detecta idioma
    const userLang = navigator.language || navigator.userLanguage || defaultLang;
    let detectedLang = defaultLang;
    
    if (userLang.toLowerCase().startsWith('pt')) {
        detectedLang = 'pt-br';
    } else if (userLang.toLowerCase().startsWith('es')) {
        detectedLang = 'es';
    } else if (userLang.toLowerCase().startsWith('en')) {
        detectedLang = 'en';
    }

    console.log("Idioma detectado:", detectedLang);
    console.log("URL atual:", window.location.pathname);

    // Só redireciona da página raiz
    const currentPath = window.location.pathname;
    const targetPath = `${baseUrl}/${detectedLang}/`;
    
    if (currentPath === '/' || currentPath === `${baseUrl}/` || currentPath === '') {
        console.log("Redirecionando para:", targetPath);
        window.location.replace(targetPath);
    } else {
        console.log("Não é página raiz, mantém onde está");
    }
});
