interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className = "",
  icon,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#007CF0] to-[#0066CC] hover:from-[#0066CC] hover:to-[#005BB5] text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary:
      "bg-[#1A1F3C] border border-[#007CF0]/30 hover:border-[#007CF0] text-white hover:bg-[#007CF0]/10",
    ghost: "text-[#007CF0] hover:bg-[#007CF0]/10 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        sizes[size]
      } ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C48C] to-[#007CF0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
}
