(function () {
  const supportedLangs = ["pt-br", "en", "es"];
  const basePath = "/Documentation";

  function detectLanguage() {
    const lang = navigator.language || navigator.userLanguage || "pt-BR";
    const normalized = lang.toLowerCase();

    if (normalized.startsWith("pt")) return "pt-br";
    if (normalized.startsWith("es")) return "es";
    return "en";
  }

  const detectedLang = detectLanguage();

  if (supportedLangs.includes(detectedLang)) {
    window.location.replace(`${basePath}/${detectedLang}/`);
  } else {
    window.location.replace(`${basePath}/en/`);
  }
})();
