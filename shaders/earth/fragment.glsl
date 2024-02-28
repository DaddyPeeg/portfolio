uniform sampler2D globeTexture;
varying vec2 vertexUV;

void main() {
  vec3 textureColor = texture2D(globeTexture, vertexUV).xyz;

  // Darken the texture by multiplying with a darkening factor
  vec3 darkenedColor = textureColor * 0.2; // Adjust the factor as needed

  gl_FragColor = vec4(darkenedColor, 1.0);
}

// uniform sampler2D globeTexture;
// varying vec2 vertexUV;

// void main() {
//     // Sample the texture color
//     vec3 textureColor = texture2D(globeTexture, vertexUV).xyz;

//     // Darken the texture by multiplying with a darkening factor
//     vec3 darkenedColor = textureColor * 0.2; // Adjust the factor as needed

//     // Add color variation based on UV coordinates
//     vec3 uvColor = vec3(vertexUV, 1.0 - length(vertexUV));

//     // Combine darkened color and UV-based color variation
//     vec3 coloredResult = darkenedColor + uvColor * 0.05;  // Adjust the factor for color intensity

//     // Apply a gradient effect based on the y-coordinate
//     vec3 gradientColor = vec3(0.5, 0.5, 1.0) * vertexUV.y;

//     // Combine the colored result with the gradient effect
//     vec3 finalColor = coloredResult + gradientColor * 0.04;  // Adjust the factor for gradient intensity

//     // Output the final color
//     gl_FragColor = vec4(finalColor, 1.0);
// }
