import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

//types
interface WindowSize {
  width: number;
  height: number;
}

interface WindowSizeContextType {
  windowSize: WindowSize;
  isMobile: boolean;
}

//context
const WindowSizeContext = createContext<WindowSizeContextType | undefined>(undefined);

// Custom hook to use the context
export const useWindowSize = (): WindowSizeContextType => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider');
  }
  return context;
};

// Provider component
interface WindowSizeProviderProps {
  children: ReactNode;
}

export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // Checks if the width is less than or equal to 901px
      setIsMobile(window.innerWidth <= 901);
    };
    
   
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <WindowSizeContext.Provider value={{ windowSize, isMobile }}>
      {children}
    </WindowSizeContext.Provider>
  );
};