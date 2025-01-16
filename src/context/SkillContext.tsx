import React, { createContext, useState, useContext, ReactNode } from "react";

interface SkillContextProps {
  selectedSkill: number;
  selectSkill: (skillNumber: number) => void;
}

const SkillContext = createContext<SkillContextProps | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<number>(0);

  const selectSkill = (skillNumber: number) => {
    setSelectedSkill(skillNumber);
  };

  return (
    <SkillContext.Provider value={{ selectedSkill, selectSkill }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkill = (): SkillContextProps => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkill must be used within a SkillProvider");
  }
  return context;
};
