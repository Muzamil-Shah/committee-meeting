import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from './ui/button';

const ESignComponent: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
    
  const clear = (): void => {
    sigCanvas.current?.clear();
  };

  const save = (): void => {
    if (sigCanvas.current) {
      // Use getCanvas() instead of getTrimmedCanvas()
      const canvas = sigCanvas.current.getCanvas();
      const signatureDataUrl = canvas.toDataURL('image/png');
      console.log(signatureDataUrl);
    }
  };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 400, height: 100, className: 'sigCanvas ' }}
        ref={sigCanvas}
      />
      <div className='w-full flex justify-end items-center gap-2'>

      <Button variant={'outline'} onClick={clear}>Clear</Button>
      <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default ESignComponent;