'use client'
import { motion } from 'framer-motion'
import TextType from '@/components/effects/text-type'

type Props = {
  description: string
}

export function CinematicUI({ description }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 24px 64px',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          width: 'min(620px, 100%)',
          padding: '18px 22px 20px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(9, 15, 28, 0.82)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(12px)',
          textAlign: 'center',
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 8,
            color: '#7cf56a',
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#7cf56a',
              boxShadow: '0 0 0 3px rgba(124, 245, 106, 0.14)',
            }}
          />
          Course briefing
        </div>
        <div
          style={{
            color: '#dbe5f2',
            fontSize: 'clamp(13px, 1.35vw, 15px)',
            lineHeight: 1.65,
            letterSpacing: '-0.005em',
          }}
        >
          <TextType
            text={[description]}
            typingSpeed={38}
            pauseDuration={2800}
            showCursor
            cursorCharacter="_"
            deletingSpeed={0}
            variableSpeedEnabled={false}
            variableSpeedMin={40}
            variableSpeedMax={80}
            cursorBlinkDuration={0.5}
            variableSpeed={undefined}
            onSentenceComplete={undefined}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            color: '#526078',
            fontSize: 9.5,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Controls unlock when the countdown ends
        </div>
      </motion.div>
    </div>
  )
}
