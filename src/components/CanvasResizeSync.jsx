import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

export const useElementSize = () => {
  const elementRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return undefined;
    }

    const updateSize = () => {
      const nextWidth = node.clientWidth;
      const nextHeight = node.clientHeight;

      setSize((current) => {
        if (current.width === nextWidth && current.height === nextHeight) {
          return current;
        }

        return { width: nextWidth, height: nextHeight };
      });
    };

    updateSize();

    const frameId = window.requestAnimationFrame(updateSize);
    const timeoutId = window.setTimeout(updateSize, 250);
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSize) : null;

    observer?.observe(node);
    window.addEventListener('resize', updateSize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      observer?.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return [elementRef, size];
};

const CanvasResizeSync = ({ width, height }) => {
  const { camera, gl } = useThree();

  useLayoutEffect(() => {
    if (!width || !height) {
      return undefined;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

    const applySize = () => {
      gl.setPixelRatio(pixelRatio);
      gl.setSize(width, height, false);
      gl.domElement.style.width = `${width}px`;
      gl.domElement.style.height = `${height}px`;
      gl.domElement.width = Math.floor(width * pixelRatio);
      gl.domElement.height = Math.floor(height * pixelRatio);

      if ('aspect' in camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    applySize();

    const frameId = window.requestAnimationFrame(applySize);
    const timeoutId = window.setTimeout(applySize, 180);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [camera, gl, height, width]);

  return null;
};

export default CanvasResizeSync;
