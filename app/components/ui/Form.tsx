import { FormEvent } from 'react';
import Button from './Button';
import Input from './Input';

interface FormField {
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'hidden';
  placeholder?: string;
  required?: boolean;
  value?: string;
  icon?: React.ReactNode;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  submitButton: {
    text: string;
    icon?: React.ReactNode;
    loading?: boolean;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function Form({
  fields,
  onSubmit,
  submitButton,
  className = '',
  children
}: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        field.type === 'hidden' ? (
          <input
            key={field.name}
            type="hidden"
            name={field.name}
            value={field.value}
          />
        ) : (
          <Input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            icon={field.icon}
          />
        )
      ))}

      {children}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        icon={submitButton.icon}
        disabled={submitButton.loading}
      >
        {submitButton.loading ? 'Chargement...' : submitButton.text}
      </Button>
    </form>
  );
}