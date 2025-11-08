import React from "react";

export default function Button({
  children,
  onClick,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}) {
  // base styles
  const base =
    "relative font-semibold rounded-2xl transition-all duration-300 ease-in-out focus:outline-none overflow-hidden shadow-sm hover:shadow-lg";

  // color variants
  const variants = {
    solid:
      "bg-[#A27B5C] text-[#2C3930] hover:bg-[#DCD7C9] hover:text-[#2C3930]",
    outline:
      "border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C] hover:text-[#2C3930]",
    ghost:
      "text-[#DCD7C9] hover:text-[#A27B5C] hover:bg-[#3F4F44]/60",
  };

  // size variants
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // combine class names manually
  const finalClass = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button onClick={onClick} className={finalClass} {...props}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-[#A27B5C33] opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-2xl"></span>
    </button>
  );
}
