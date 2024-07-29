// utils/detectDevice.js
export function detectDevice() {
    const userAgent = navigator.userAgent || (window as any).opera;
  
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return "iOS";
    }
  
    // Android detection
    if (/android/i.test(userAgent)) {
      return "Android";
    }
  
    // Windows Phone detection
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }
  
    // Other mobile devices
    if (/mobile/i.test(userAgent)) {
      return "Mobile";
    }
  
    return "Desktop";
  }