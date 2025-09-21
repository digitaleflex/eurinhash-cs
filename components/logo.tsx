import Link from 'next/link'

interface LogoProps {
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    }

    return (
        <Link href="/" className="flex items-center gap-2 group">
            <span className={`inline-block rounded-full bg-accent transition-transform duration-300 group-hover:rotate-6 ${sizeClasses[size]}`} />
            {showText && (
                <span className="font-semibold tracking-tight">Eurin Hash</span>
            )}
        </Link>
    )
}