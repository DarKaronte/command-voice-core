
import JarvisInterface from '@/components/JarvisInterface';

const Index = () => {
  return (
    <div className="dark">
      <JarvisInterface 
        webhookUrl="https://your-webhook-url.com/jarvis"
        elevenLabsApiKey="" // Aquí pondrás tu API key de ElevenLabs
      />
    </div>
  );
};

export default Index;
