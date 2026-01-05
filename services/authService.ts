
export const setVisualAccess = () => {
  // Use localStorage for immediate reliable client-side persistence
  localStorage.setItem('station_visual_access', 'true');
  
  // Set cookie for potential server-side logic or expiration management
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
  document.cookie = "visual_access=true; expires=" + date.toUTCString() + "; path=/";
};

export const hasVisualAccess = () => {
  // Check localStorage first
  const local = localStorage.getItem('station_visual_access');
  if (local === 'true') return true;

  // Fallback to cookie check
  return document.cookie.split(';').some((item) => item.trim().startsWith('visual_access='));
};
