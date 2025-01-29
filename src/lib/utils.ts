import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CustomTextureMaterial extends THREE.Texture {
  dimensions: {
    width: number;
    height: number;
  };
}
interface state {
  animating: boolean;
  current: number;
}

export function switchTexture(
  state: state,
  shaderRef: THREE.ShaderMaterial,
  direction: number,
  texture: CustomTextureMaterial
) {
  let currentAmp = 0;
  gsap
    .timeline({
      onStart: () => {
        state.animating = true;
        if (shaderRef) {
          shaderRef.uniforms.uAnimating.value = true;
          shaderRef.uniforms.uProgDirection.value = direction;
          shaderRef.uniforms.uNextTex.value = texture;
        }
      },
      onComplete: () => {
        state.animating = false;
        if (shaderRef) {
          shaderRef.uniforms.uAnimating.value = false;
          shaderRef.uniforms.uCurrTex.value = texture;
        }
        currentAmp = 0;
      },
    })
    .fromTo(
      shaderRef.uniforms.uProg,
      {
        value: 0,
      },
      {
        value: 1,
        duration: 1,
        ease: "ease.out",
      },
      0
    )
    .fromTo(
      shaderRef.uniforms.uAmplitude,
      {
        value: 0,
      },
      {
        duration: 0.8,
        value: 1,
        repeat: 1,
        yoyo: true,
        yoyoEase: "sine.out",
        ease: "expo.out",
      },
      0
    );
}

export const downloadPDF = async (url: string, filename = "Resume.pdf") => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
