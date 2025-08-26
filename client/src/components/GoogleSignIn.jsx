import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const GoogleSignIn = () => {
  const { signInWithGoogle } = useAuth();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '99848321491-m40hqndmatki1bm54shovatl3m8ui85j.apps.googleusercontent.com',
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      }
    };

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const result = await signInWithGoogle(response.credential);
      if (result.success) {
        console.log('Successfully signed in:', result.user);
      } else {
        console.error('Sign-in failed:', result.error);
        alert('Sign-in failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred during sign-in');
    }
  };

  return (
    <div className="flex justify-center">
      <div ref={googleButtonRef}></div>
    </div>
  );
};

export default GoogleSignIn;
