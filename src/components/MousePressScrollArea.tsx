import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface MousePressScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const MousePressScrollArea: React.FC<MousePressScrollAreaProps> = ({
  children,
  className,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    const ele = scrollAreaRef.current;
    if (!ele) {
      return;
    }
    const startPos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e: any) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
      ele.scrollLeft = startPos.left - dx;
      updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetCursor(ele);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    const ele = scrollAreaRef.current;
    if (!ele) {
      return;
    }
    const touch = e.touches[0];
    const startPos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: touch.clientX,
      y: touch.clientY,
    };

    const handleTouchMove = (e: any) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x;
      const dy = touch.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
      ele.scrollLeft = startPos.left - dx;
      updateCursor(ele);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      resetCursor(ele);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  }, []);

  const updateCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
  };

  const resetCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
  };

  return (
    <div
      className={cn("drag-container hide-scrollbar", className)}
      ref={scrollAreaRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

export default MousePressScrollArea;
