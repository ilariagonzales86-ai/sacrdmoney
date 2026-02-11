import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: string;
    secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, icon, secondary, className = "", ...props }) => {
    const baseClasses = "group relative w-full flex justify-center items-center py-3.5 px-4 border text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] btn-glow uppercase tracking-widest transition-all duration-300";
    
    const primaryClasses = "border-transparent text-white bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600";
    const secondaryClasses = "border-purple-500/30 text-purple-100 bg-purple-900/20 hover:bg-purple-800/40";

    return (
        <button 
            className={`${baseClasses} ${secondary ? secondaryClasses : primaryClasses} ${className}`}
            {...props}
        >
            {icon && (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <span className="material-icons text-purple-200 group-hover:text-white transition-colors text-lg">{icon}</span>
                </span>
            )}
            {children}
        </button>
    );
};

export default Button;