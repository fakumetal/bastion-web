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
          token: process.env.NEXT_PUBLIC_BOTSONIC_TOKEN, // Usa la variable de entorno aquí
        });
      }
    };

    loadBotsonic();

    // Al cargar el script y widget, intentamos aplicar estilos al widget
    const applyStyles = () => {
      const chatbotElement = document.querySelector('.botsonic-widget'); // La clase del widget Botsonic
      if (chatbotElement) {
        chatbotElement.setAttribute('style', 'position: fixed !important; bottom: 20px !important; right: 20px !important; z-index: 9999 !important;');
      }
    };

    // Escuchar hasta que el widget se haya cargado e insertar los estilos
    window.addEventListener('load', applyStyles);
    return () => {
      window.removeEventListener('load', applyStyles);
    };
  }, []);

  return null;  
};

export default Chatbot;
