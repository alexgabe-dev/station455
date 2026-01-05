import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import EchoSignals from '../components/EchoSignals';
import SpotlightGrid from '../components/SpotlightGrid';
import MustSeeMoments from '../components/MustSeeMoments';
import Newsletter from '../components/Newsletter';
import SystemTicker from '../components/SystemTicker';
import Seo from '../components/Seo';
import { 
    getLatestTransmission, 
    getEchoes, 
    getFrequencies, 
    getMustSeeMoments,
    getSiteConfig
} from '../services/stationService';
import { Transmission, EchoSignal, Frequency, BurstMoment, SiteConfig } from '../types';

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<Transmission | null>(null);
  const [echoes, setEchoes] = useState<EchoSignal[]>([]);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [moments, setMoments] = useState<BurstMoment[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const [featData, echoData, freqData, momentData, configData] = await Promise.all([
            getLatestTransmission(),
            getEchoes(),
            getFrequencies(),
            getMustSeeMoments(),
            getSiteConfig()
        ]);
        
        setFeatured(featData);
        setEchoes(echoData);
        setFrequencies(freqData);
        setMoments(momentData);
        setConfig(configData);
        setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="h-screen w-full bg-void flex items-center justify-center text-alert font-mono">INITIALIZING_UPLINK...</div>;

  return (
    <>
      <Seo 
        title={config?.siteTitle || "Cosmic Relay"} 
        description={config?.siteDescription || "Station445 broadcasts signals from the void."}
      />
      
      <Hero featuredData={featured} config={config} />
      <SystemTicker />
      <div className="relative z-10">
          <SpotlightGrid frequencies={frequencies} />
          <EchoSignals signals={echoes} />
          <MustSeeMoments moments={moments} />
          <Newsletter />
      </div>
    </>
  );
};

export default Home;