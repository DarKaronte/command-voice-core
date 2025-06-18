import React, { useEffect, useState } from 'react';

const JarvisBrain = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeNeurons, setActiveNeurons] = useState<number[]>([]);

  // Simulamos actividad neuronal periódica
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      // Genera neuronas activas aleatorias
      const neurons = Array.from({length: Math.floor(Math.random() * 8) + 3}, () => 
        Math.floor(Math.random() * 20)
      );
      setActiveNeurons(neurons);
      
      setTimeout(() => {
        setIsProcessing(false);
        setActiveNeurons([]);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Genera posiciones aleatorias para las neuronas
  const neurons = Array.from({length: 20}, (_, i) => ({
    id: i,
    x: Math.random() * 300 + 50,
    y: Math.random() * 300 + 50,
    size: Math.random() * 4 + 2,
  }));

  // Genera conexiones entre neuronas
  const connections = Array.from({length: 35}, (_, i) => {
    const start = neurons[Math.floor(Math.random() * neurons.length)];
    const end = neurons[Math.floor(Math.random() * neurons.length)];
    return {
      id: i,
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    };
  });

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Contenedor principal del cerebro */}
      <div className="relative w-full h-full">
        {/* SVG para las conexiones neuronales */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 400 400"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))' }}
        >
          {/* Gradientes para las conexiones */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)" />
              <stop offset="50%" stopColor="rgba(0, 255, 255, 0.5)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
            </linearGradient>
            <linearGradient id="activeConnection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0.8)" />
              <stop offset="50%" stopColor="rgba(0, 255, 255, 1)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)" />
            </linearGradient>
          </defs>

          {/* Círculo exterior del cerebro */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            className={`transition-all duration-1000 ${
              isProcessing ? 'animate-pulse-glow' : ''
            }`}
          />

          {/* Círculo interior */}
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="1"
            className={`transition-all duration-1000 ${
              isProcessing ? 'animate-pulse' : ''
            }`}
          />

          {/* Conexiones neuronales */}
          {connections.map((connection, index) => (
            <line
              key={connection.id}
              x1={connection.x1}
              y1={connection.y1}
              x2={connection.x2}
              y2={connection.y2}
              stroke={
                isProcessing && activeNeurons.includes(index % 20) 
                  ? "url(#activeConnection)" 
                  : "url(#connectionGradient)"
              }
              strokeWidth={
                isProcessing && activeNeurons.includes(index % 20) ? "2" : "1"
              }
              className={`transition-all duration-300 ${
                isProcessing && activeNeurons.includes(index % 20) 
                  ? 'animate-pulse' 
                  : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}

          {/* Neuronas */}
          {neurons.map((neuron) => (
            <circle
              key={neuron.id}
              cx={neuron.x}
              cy={neuron.y}
              r={neuron.size}
              fill={
                isProcessing && activeNeurons.includes(neuron.id)
                  ? "#00ffff"
                  : "rgba(0, 212, 255, 0.6)"
              }
              className={`transition-all duration-300 ${
                isProcessing && activeNeurons.includes(neuron.id)
                  ? 'animate-pulse-glow'
                  : ''
              }`}
              style={{
                filter: isProcessing && activeNeurons.includes(neuron.id)
                  ? 'drop-shadow(0 0 15px #00ffff)'
                  : 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))',
                animationDelay: `${neuron.id * 0.1}s`,
              }}
            />
          ))}

          {/* Núcleo central */}
          <circle
            cx="200"
            cy="200"
            r="25"
            fill="url(#activeConnection)"
            className={`transition-all duration-1000 ${
              isProcessing ? 'animate-pulse-glow' : 'animate-pulse'
            }`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))',
            }}
          />
        </svg>

        {/* Logo JARVIS en el centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`text-4xl font-bold text-gradient mb-2 transition-all duration-1000 ${
              isProcessing ? 'animate-text-shimmer scale-110' : ''
            }`}>
              JARVIS
            </h1>
            <div className={`text-xs text-neon-cyan tracking-widest transition-all duration-1000 ${
              isProcessing ? 'animate-pulse' : ''
            }`}>
              {isProcessing ? 'PROCESANDO...' : 'NEURAL READY'}
            </div>
          </div>
        </div>

        {/* Anillos orbitales */}
        <div className="absolute inset-0">
          <div className={`absolute inset-8 rounded-full border border-neon-blue/20 transition-all duration-1000 ${
            isProcessing ? 'animate-spin border-neon-cyan/60' : 'animate-spin'
          }`} style={{animationDuration: '20s'}}></div>
          <div className={`absolute inset-16 rounded-full border border-neon-purple/20 transition-all duration-1000 ${
            isProcessing ? 'animate-spin border-neon-pink/60' : 'animate-spin'
          }`} style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
        </div>

        {/* Partículas flotantes */}
        {isProcessing && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({length: 12}).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JarvisBrain;
