import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const STORAGE_KEY = 'loading_progress';
const PHASE_KEY = 'loading_phase';
const POLL_INTERVAL = 100;

export const ProgressSpinner = ({ onFinish }) => {
  const [progress, setProgress] = useState(null);
  const [phase, setPhase] = useState('');

  const checkProgress = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const val = parseInt(raw, 10);
      if (!isNaN(val) && val >= 0) {
        setProgress(Math.min(val, 100));
        if (val >= 100) {
          onFinish?.();
        }
      }
    } else {
      setProgress(0);
    }
    const phaseRaw = localStorage.getItem(PHASE_KEY);
    setPhase(phaseRaw || '');
  }, [onFinish]);

  useEffect(() => {
    checkProgress();
    const interval = setInterval(checkProgress, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [checkProgress]);

  return (
    <StyledWrapper>
        <div className="liquid-loader">
        <div className="loading-text">
          {phase || 'Loading'}<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
        <div className="loader-track">
          <div
            className={`liquid-fill${progress === null ? ' indeterminate' : ''}`}
            style={progress !== null ? { width: `calc(${Math.max(progress, 1)}% - 4px)` } : undefined}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .liquid-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    font-family: var(--font-geist-sans), system-ui, sans-serif;
  }

  .loader-track {
    position: relative;
    width: 100%;
    max-width: 280px;
    height: 6px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 999px;
    overflow: hidden;
  }

  .liquid-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #43c9a5, #7cf56a);
    box-shadow: 0 0 14px rgba(124, 245, 106, 0.35);
    transition: width 0.15s ease-out;
  }

  .liquid-fill.indeterminate {
    width: 34% !important;
    animation: indeterminate 1.4s ease-in-out infinite;
  }

  @keyframes indeterminate {
    0% {
      left: -34%;
      width: 34%;
    }
    50% {
      left: 30%;
      width: 48%;
    }
    100% {
      left: 100%;
      width: 34%;
    }
  }

  .loading-text {
    color: #9fadc3;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  .dot {
    margin-left: 2px;
    animation: blink 1.4s infinite;
  }

  .dot:nth-of-type(1) {
    animation-delay: 0s;
  }

  .dot:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%,
    45% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0.25;
    }
  }
`;
