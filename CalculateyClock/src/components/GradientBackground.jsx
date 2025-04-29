import { useEffect } from 'react';
import Granim from 'granim';

export default function GradientBackground( {children} ) {
  useEffect(() => {
    new Granim({
      element: '#canvas-basic',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#3C3D37', '#235061'],
            ['#4E6958', '#304539'],
            ['#575649', '#4F4E3E']
          ]
        }
      }
    });
  }, []);

  // canvas needs to accept "children" in order to be able to render anything
  // canvas needs to ALSO be wrapped in a div
  return (
    <div>
    <canvas id="canvas-basic" className="absolute top-0 left-0 w-full h-full -z-10"></canvas>
        <div>
            {children}
        </div>
    </div>
  );
}