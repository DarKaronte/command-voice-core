
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface JarvisInterfaceProps {
  webhookUrl?: string;
  elevenLabsApiKey?: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ 
  webhookUrl = "https://your-webhook-url.com/jarvis",
  elevenLabsApiKey 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Buenos días. Soy Jarvis, tu asistente de IA. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        processAudio();
      };

      setMediaRecorder(recorder);
      setAudioChunks([]);
      recorder.start();
      setIsRecording(true);
      
      toast({
        title: "Grabando...",
        description: "Habla ahora. Presiona el botón nuevamente para enviar.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono. Verifica los permisos.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async () => {
    if (audioChunks.length === 0) return;

    setIsProcessing(true);
    
    try {
      // Crear blob de audio
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      // Simular transcripción (aquí integrarías con un servicio de STT real)
      const transcribedText = await simulateTranscription(audioBlob);
      
      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: Date.now().toString(),
        content: transcribedText,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Enviar a webhook
      const response = await sendToWebhook(transcribedText);
      
      // Agregar respuesta de Jarvis
      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, jarvisMessage]);
      
      // Síntesis de voz (si tienes API key)
      if (elevenLabsApiKey) {
        await synthesizeVoice(response);
      }
      
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Hubo un problema procesando tu mensaje.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setAudioChunks([]);
    }
  };

  const simulateTranscription = async (audioBlob: Blob): Promise<string> => {
    // Simula el proceso de transcripción
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "Mensaje transcrito de ejemplo - aquí iría el texto real de tu voz";
  };

  const sendToWebhook = async (text: string): Promise<string> => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, timestamp: new Date().toISOString() }),
      });
      
      if (!response.ok) {
        throw new Error('Webhook request failed');
      }
      
      const data = await response.json();
      return data.response || "Lo siento, no pude procesar tu solicitud en este momento.";
    } catch (error) {
      console.error('Webhook error:', error);
      return "Conexión con el servidor temporalmente no disponible. Por favor, inténtalo de nuevo.";
    }
  };

  const synthesizeVoice = async (text: string) => {
    try {
      // Aquí implementarías la síntesis de voz con ElevenLabs
      console.log('Synthesizing voice for:', text);
      // La implementación real dependería de tu configuración específica
    } catch (error) {
      console.error('Voice synthesis error:', error);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-effect border-b border-white/10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient animate-text-shimmer">
                JARVIS
              </h1>
              <p className="text-muted-foreground text-sm">
                Asistente de IA Avanzado
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">En línea</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 border border-neon-blue/30 ml-12'
                    : 'glass-effect border border-white/10 mr-12'
                }`}
              >
                <p className="text-foreground leading-relaxed">{message.content}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="glass-effect border border-white/10 p-4 rounded-2xl mr-12">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Jarvis está procesando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Voice Input */}
      <div className="glass-effect border-t border-white/10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="relative">
            <Button
              onClick={handleMicClick}
              disabled={isProcessing}
              className={`w-20 h-20 rounded-full mic-button ${
                isRecording ? 'recording animate-recording-pulse' : 'animate-pulse-glow'
              }`}
              size="lg"
            >
              {isRecording ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Presiona para enviar' : 'Presiona para hablar'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarvisInterface;
