import React from "react";

type AuthBackgroundProps = {
  children: React.ReactNode;
};

const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-l from-orange-100 to-orange-50 min-h-full py-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthBackground;
