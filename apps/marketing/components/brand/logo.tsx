export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caribbean Azure"
    >
      {/* Icon - Neural network node with connections */}
      <g>
        {/* Central node */}
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="url(#brandGradient)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="none"
          stroke="url(#brandGradient)"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Outer nodes */}
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="12" cy="36" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.7" />

        {/* Connection lines */}
        <line x1="24" y1="24" x2="12" y2="12" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="36" y2="12" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="12" y2="36" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="36" y2="36" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Brand text */}
      <text
        x="56"
        y="30"
        className="fill-current text-xl font-bold tracking-tight"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        Caribbean Azure
      </text>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caribbean Azure Mark"
    >
      {/* Central node */}
      <circle
        cx="24"
        cy="24"
        r="8"
        fill="url(#markGradient)"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      <circle
        cx="24"
        cy="24"
        r="8"
        fill="none"
        stroke="url(#markGradient)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Outer nodes */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="36" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.7" />

      {/* Connection lines */}
      <line x1="24" y1="24" x2="12" y2="12" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="36" y2="12" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="12" y2="36" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="36" y2="36" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
