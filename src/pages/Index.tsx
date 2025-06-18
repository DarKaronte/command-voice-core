
import { useEffect } from 'react';
import JarvisBrain from '../components/JarvisBrain';

const Index = () => {
  useEffect(() => {
    // Cargar el script de ElevenLabs dinámicamente
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="dark min-h-screen bg-background relative overflow-hidden">
      {/* Fondo futurista con efectos de luz */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Efectos de luz circular */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-neon-blue/20 via-neon-cyan/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-neon-purple/20 via-neon-pink/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-neon-cyan/15 to-transparent rounded-full blur-2xl animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        
        {/* Grid futurista */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({length: 144}).map((_, i) => (
              <div key={i} className="border border-neon-blue/20 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Header futurista */}
      <div className="relative z-10 glass-effect border-b border-white/10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Logo/Avatar de Jarvis más pequeño */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan animate-pulse"></div>
                </div>
              </div>
              {/* Anillos orbitales */}
              <div className="absolute inset-0 rounded-full border border-neon-blue/30 animate-spin" style={{animationDuration: '10s'}}></div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gradient animate-text-shimmer">
                JARVIS
              </h1>
              <p className="text-muted-foreground text-xs tracking-wide">
                Neural Interface v2.1
              </p>
            </div>
          </div>
          
          {/* Indicadores de estado */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">SISTEMA ACTIVO</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse"></div>
              <span className="text-sm text-muted-foreground">AUDIO READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 min-h-[calc(100vh-200px)]">
        {/* Cerebro digital de Jarvis */}
        <div className="mb-12 animate-fade-in-up">
          <JarvisBrain />
        </div>

        {/* Título principal */}
        <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-5xl font-light text-gradient mb-4 tracking-wide">
            Interfaz Neural Conversacional
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Mantén una conversación natural con Jarvis usando tu voz
          </p>
        </div>

        {/* Contenedor del widget de ElevenLabs */}
        <div className="relative max-w-4xl w-full animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          {/* Marco futurista para el widget */}
          <div className="glass-effect rounded-3xl p-8 border-2 border-transparent neon-border relative overflow-hidden">
            {/* Efectos de esquina */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-neon-cyan rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-neon-cyan rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-neon-cyan rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-neon-cyan rounded-br-lg"></div>
            
            {/* Widget de ElevenLabs */}
            <div className="min-h-[400px] flex items-center justify-center">
              <elevenlabs-convai agent-id="agent_01jy00t7gmf38smmscjd008rg0"></elevenlabs-convai>
            </div>
          </div>

          {/* Líneas de conexión decorativas */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-neon-cyan"></div>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-neon-cyan"></div>
        </div>

        {/* Panel de información inferior */}
        <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <div className="text-neon-blue text-2xl font-bold mb-2">🎤</div>
              <p className="text-sm text-muted-foreground">Reconocimiento de Voz</p>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <div className="text-neon-cyan text-2xl font-bold mb-2">🧠</div>
              <p className="text-sm text-muted-foreground">Procesamiento IA</p>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-white/10">
              <div className="text-neon-purple text-2xl font-bold mb-2">🔊</div>
              <p className="text-sm text-muted-foreground">Síntesis de Voz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimalista */}
      <div className="relative z-10 glass-effect border-t border-white/10 p-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Powered by ElevenLabs Neural Voice Technology • Jarvis v2.1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
