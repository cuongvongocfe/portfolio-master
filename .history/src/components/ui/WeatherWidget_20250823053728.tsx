/**
 * Weather Widget Component
 * 
 * A creative weather display widget with beautiful animations and real-time data.
 * Features include:
 * - Real-time weather data from OpenWeatherMap API
 * - Animated weather icons and effects
 * - Temperature display with smooth transitions
 * - Location-based weather detection
 * - Dark/light theme support
 * - Hover effects and micro-interactions
 * 
 * @component
 * @returns {JSX.Element} Animated weather widget
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  CloudIcon, 
  BoltIcon,
  EyeDropperIcon
} from '@heroicons/react/24/outline';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  icon: string;
}

/**
 * Weather Widget Component
 * 
 * Displays current weather with creative animations and interactions.
 * 
 * @returns {JSX.Element} Interactive weather display
 */
export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch Weather Data
   * 
   * Gets current weather data for user's location or default to Ho Chi Minh City
   */
  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      
      // Try to get user's location
      let lat = 10.8231; // Default to Ho Chi Minh City
      let lon = 106.6297;
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        } catch (geoError) {
          console.log('Using default location (Ho Chi Minh City)');
        }
      }

      // Use a free weather service (you can replace with OpenWeatherMap API key)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=auto`
      );
      
      const data = await response.json();
      
      if (data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const weatherCode = data.current_weather.weathercode;
        
        // Map weather codes to conditions
        let condition = 'Clear';
        let icon = 'sun';
        
        if (weatherCode >= 51 && weatherCode <= 67) {
          condition = 'Rainy';
          icon = 'rain';
        } else if (weatherCode >= 71 && weatherCode <= 86) {
          condition = 'Snowy';
          icon = 'snow';
        } else if (weatherCode >= 95) {
          condition = 'Stormy';
          icon = 'storm';
        } else if (weatherCode >= 1 && weatherCode <= 3) {
          condition = 'Cloudy';
          icon = 'cloud';
        }

        setWeather({
          temperature: temp,
          condition,
          location: 'Vietnam',
          humidity: data.hourly?.relative_humidity_2m?.[0] || 65,
          icon
        });
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Weather unavailable');
      // Set mock data as fallback
      setWeather({
        temperature: 28,
        condition: 'Sunny',
        location: 'Ho Chi Minh City',
        humidity: 70,
        icon: 'sun'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Get Weather Icon Component
   * 
   * Returns appropriate animated icon based on weather condition
   */
  const getWeatherIcon = (iconType: string) => {
    const iconProps = {
      className: "w-5 h-5",
      strokeWidth: 2
    };

    switch (iconType) {
      case 'sun':
        return <SunIcon {...iconProps} className="w-5 h-5 text-yellow-500" />;
      case 'cloud':
        return <CloudIcon {...iconProps} className="w-5 h-5 text-gray-500" />;
      case 'rain':
        return <EyeDropperIcon {...iconProps} className="w-5 h-5 text-blue-500" />;
      case 'storm':
        return <BoltIcon {...iconProps} className="w-5 h-5 text-purple-500" />;
      default:
        return <SunIcon {...iconProps} className="w-5 h-5 text-yellow-500" />;
    }
  };

  /**
   * Get Background Gradient Based on Weather
   */
  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'from-yellow-400/20 to-orange-400/20';
      case 'cloudy':
        return 'from-gray-400/20 to-gray-600/20';
      case 'rainy':
        return 'from-blue-400/20 to-blue-600/20';
      case 'stormy':
        return 'from-purple-400/20 to-purple-600/20';
      default:
        return 'from-blue-400/20 to-purple-400/20';
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full"
        />
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm flex items-center justify-center border border-red-200/50 dark:border-red-700/50"
      >
        <span className="text-red-500 text-xs">!</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      {/* Main Weather Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${getWeatherGradient(weather.condition)} backdrop-blur-sm flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-300`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          animate={{ 
            rotate: weather.icon === 'sun' ? [0, 360] : 0,
            y: weather.icon === 'cloud' ? [0, -2, 0] : 0 
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {getWeatherIcon(weather.icon)}
        </motion.div>
      </motion.button>

      {/* Expanded Weather Info */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full right-0 mt-2 p-3 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 min-w-[200px] z-50"
          >
            {/* Temperature Display */}
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getWeatherIcon(weather.icon)}
              </motion.div>
              <div>
                <motion.div 
                  className="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {weather.temperature}°C
                </motion.div>
                <motion.div 
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {weather.condition}
                </motion.div>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div 
              className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/50 dark:border-neutral-700/50 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between">
                <span>Location:</span>
                <span>{weather.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span>{weather.humidity}%</span>
              </div>
            </motion.div>

            {/* Refresh Button */}
            <motion.button
              onClick={fetchWeather}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Refresh Weather
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
