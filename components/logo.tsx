import Link from 'next/link'

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showText?: boolean
    variant?: 'default' | 'minimal' | 'full'
}

export function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12'
    }

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    }

    const LogoIcon = () => (
        <div className={`relative ${sizeClasses[size]} group-hover:scale-110 transition-all duration-300`}>
            {/* Fond avec gradient */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent via-accent/90 to-accent/80 shadow-lg group-hover:shadow-xl group-hover:shadow-accent/25 transition-all duration-300" />
            
            {/* Initiales EH */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold tracking-tight" style={{ fontSize: size === 'sm' ? '10px' : size === 'md' ? '12px' : size === 'lg' ? '14px' : '16px' }}>
                    EH
                </span>
            </div>
            
            {/* Effet de brillance */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    )

    if (variant === 'minimal') {
        return (
            <Link href="/" className="flex items-center group">
                <LogoIcon />
            </Link>
        )
    }

    if (variant === 'full') {
        return (
            <Link href="/" className="flex items-center gap-3 group">
                <LogoIcon />
                {showText && (
                    <div className="flex flex-col">
                        <span className={`font-bold tracking-tight text-foreground ${textSizes[size]}`}>
                            Eurin Hash
                        </span>
                        <span className="text-xs text-muted-foreground font-medium -mt-1">
                            Consultant IT
                        </span>
                    </div>
                )}
            </Link>
        )
    }

    // Variant default
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon />
            {showText && (
                <span className={`font-semibold tracking-tight text-foreground ${textSizes[size]}`}>
                    Eurin Hash
                </span>
            )}
        </Link>
    )
}