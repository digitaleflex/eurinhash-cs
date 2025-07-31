import Section from './ui/Section';
import Card from './ui/Card';

interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <Section background="dark">
      <h2 className="section-title text-center mb-4">Ce que disent nos clients</h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Plus de 200 entreprises nous font confiance pour leur sécurité digitale
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} hover glow>
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">⭐</span>
              ))}
            </div>
            
            <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
              "{testimonial.content}"
            </blockquote>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#007CF0] to-[#00C48C] rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
                <div className="text-sm text-[#007CF0]">{testimonial.company}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-[#00C48C]/10 px-6 py-3 rounded-full">
          <span className="text-[#00C48C]">✓</span>
          <span className="text-gray-300">Note moyenne : <strong className="text-[#00C48C]">4.9/5</strong> sur 200+ avis</span>
        </div>
      </div>
    </Section>
  );
}