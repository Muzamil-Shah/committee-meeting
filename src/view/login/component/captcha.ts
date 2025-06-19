export const generateCaptcha = () => {
    return Math.random().toString().slice(2, 8);
  };
  
export const generateCaptchaImage = async (captcha: string): Promise<string> => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '24px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(captcha, 10, 30);
    }
  
    return canvas.toDataURL();
  };