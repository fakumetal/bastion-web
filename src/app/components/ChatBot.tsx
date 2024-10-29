'use client';
import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const loadBotsonic = () => {
      (function (w: Window, d: Document, s: string, o: string, f: string) {
        //@ts-ignore
        w["botsonic_widget"] = o;
        //@ts-ignore
        w[o] = w[o] || function () {
          //@ts-ignore
          (w[o].q = w[o].q || []).push(arguments);
        };

        //@ts-ignore
        const js: HTMLScriptElement = d.createElement(s);
        //@ts-ignore
        const fjs: HTMLElement | null = d.getElementsByTagName(s)[0];

        js.id = o;
        js.src = f;
        js.async = true;

        if (fjs && fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs);
        }
      })(window, document, "script", "Botsonic", "https://widget.botsonic.com/CDN/botsonic.min.js");

      // Inicializa el chatbot
      //@ts-ignore
      if (window.Botsonic) {
        //@ts-ignore
        window.Botsonic("init", {
          serviceBaseUrl: "https://api-azure.botsonic.ai",
          token: process.env.BOTSONIC_TOKEN, // Usa la variable de entorno aquí
        });
      }
    };

    loadBotsonic();
  }, []);

  return null;  
};

export default Chatbot;
