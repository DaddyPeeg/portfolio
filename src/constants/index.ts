export const sceneDefaults = {
  initialCameraPosition: {
    x: 0.6447430791581878,
    y: 1.7576303592285991,
    z: -2.2759118230815756,
  },
  modelRotation: {
    x: 0.2280000000000001,
    y: -0.3190000000000002,
    z: -0.024999999999999994,
  },
  modelPosition: {
    x: -0.8310000000000007,
    y: -0.35100000000000026,
    z: -0.8770000000000006,
  },
  sceneRotation: { x: 0.5520000000000004, y: 0, z: 0 },
  viewScene: { x: 0, y: 1.384999999999994, z: 0 },
  viewCamera: { x: 0, y: 3, z: 3 },
};

export const framerMotionConfig = {
  type: "spring",
  mass: 5,
  stiffness: 100,
  damping: 50,
  restDelta: 0.0001,
};
