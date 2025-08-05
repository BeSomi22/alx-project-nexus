import React, { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const variantClasses = {
    primary:
        "bg-gradient-to-tl from-[#FFC107] via-[#FF3D3D] to-[#E50914] text-white font-semibold shadow-md hover:shadow-lg transition",
    secondary:
        "bg-red-700 hover:bg-red-800 text-white font-semibold shadow-md hover:shadow-lg transition",
    outline:
        "border border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-black transition font-semibold",
    ghost:
        "bg-transparent text-[#FFC107] hover:text-[#FF3D3D] hover:bg-yellow-100 transition font-semibold",
};


const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
};

const Button: FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    className,
    disabled,
    children,
    ...rest
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx(
                "rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
