import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FAQSection, contactFAQData } from '@/components/faq-section';

describe('FAQSection', () => {
  it('renders FAQ section with title', () => {
    render(<FAQSection items={contactFAQData} />);

    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
  });

  it('renders all FAQ items', () => {
    render(<FAQSection items={contactFAQData} />);

    contactFAQData.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it('expands FAQ item when clicked', () => {
    render(<FAQSection items={contactFAQData} />);

    const firstQuestion = screen.getByText(contactFAQData[0].question);
    fireEvent.click(firstQuestion);

    expect(screen.getByText(contactFAQData[0].answer)).toBeInTheDocument();
  });

  it('collapses FAQ item when clicked again', () => {
    render(<FAQSection items={contactFAQData} />);

    const firstQuestion = screen.getByText(contactFAQData[0].question);

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(screen.getByText(contactFAQData[0].answer)).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(firstQuestion);
    expect(
      screen.queryByText(contactFAQData[0].answer)
    ).not.toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(<FAQSection items={contactFAQData.slice(0, 2)} variant="compact" />);

    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
    expect(screen.getByText(contactFAQData[0].question)).toBeInTheDocument();
  });
});
