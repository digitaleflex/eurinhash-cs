import Container from '../ui/Container';
import Navigation from '../Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  withNavigation?: boolean;
}

export default function PageLayout({ 
  children, 
  className = '',
  containerSize = 'lg',
  withNavigation = false
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] text-white ${className}`}>
      {withNavigation && <Navigation />}
      <main className={withNavigation ? 'pt-20' : ''}>
        <Container size={containerSize}>
          {children}
        </Container>
      </main>
    </div>
  );
}