interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success';
  icon?: React.ReactNode;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'default',
  icon
}: InputProps) {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const variants = {
    default: 'bg-[#0A0F2C]/50 border-[#007CF0]/30 focus:border-[#007CF0]',
    primary: 'bg-[#007CF0]/10 border-[#007CF0]/50 focus:border-[#007CF0]',
    success: 'bg-[#00C48C]/10 border-[#00C48C]/50 focus:border-[#00C48C]'
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full ${sizes[size]} ${variants[variant]} ${icon ? 'pl-10' : ''}
          border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007CF0]/20
          text-white placeholder-gray-400 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  );
}