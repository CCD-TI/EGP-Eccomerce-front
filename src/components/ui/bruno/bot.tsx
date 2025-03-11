import { useEffect, useState } from 'react';

declare global {
  interface Window {
    crmPlugin: any;
  }
}

const KommoChat = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.crmPlugin) {
      const script = document.createElement('script');
      script.src = 'https://gso.kommo.com/js/button.js';
      script.async = true;
      script.onload = () => {
        window.crmPlugin?.init({
          id: '1027653',
          hash: '8bd968458cff72ccb4028dfdb991dc397e160155ae95d086d970c2e73bdfbbb5',
          locale: 'es',
        });
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, []);

  const showChat = () => {
    if (isLoaded && window.crmPlugin?.showChatWindow) {
      window.crmPlugin.showChatWindow();
    } else {
      console.warn("crmPlugin no está listo.");
    }
  };

  const hideChat = () => {
    if (isLoaded && window.crmPlugin?.hideChatWindow) {
      window.crmPlugin.hideChatWindow();
    } else {
      console.warn("crmPlugin no está listo.");
    }
  };

  return (
    <div>
      <button onClick={showChat}>Mostrar Chat</button>
      <button onClick={hideChat}>Ocultar Chat</button>
    </div>
  );
};

export default KommoChat;
