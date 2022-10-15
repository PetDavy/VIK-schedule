import { useEffect } from "react";
import { useStore } from "../../state/storeHooks";

import { loginWithGoogle, getUser } from "../../api/api.user";
import { loadUser } from "../App/App.slice";
import { startGoogleLoggingIn, endLoggingIn } from "../../pages/Login/Login.slice";
import { setStudents, startLoad as startStudentLoad } from "../StudentsList/StudentsList.slice";
import { loadStudents } from "../../api/api.student";

declare global {
  interface Window {
    handleGoogleLogin: (accessToken: string) => void;
  }
}

function GoogleAuth() {
  const [{ googleLoggingIn }, dispatch] = useStore(({ login }) => login);

  useEffect(() => {
    getTokenFormUrl();
  }, [null]);


  function getTokenFormUrl() {
    const urlParam = new URLSearchParams(window.location.search);
    const token = urlParam.get("token");

    if (token) {
      window.opener.handleGoogleLogin(token);
    }
  }

  async function signIn() {
    if (googleLoggingIn) {
      return;
    }

    const { authUrl } = await loginWithGoogle();
    
    const popup = window.open(authUrl, "authWindow", getAuthWindowSizeParams());
    window.handleGoogleLogin = async (accessToken: string) => {
      dispatch(startGoogleLoggingIn());
      localStorage.setItem("token", accessToken);

      try {
        dispatch(loadUser(await getUser(accessToken)));
        loadUserStudents(accessToken);
      } catch (error) {
        localStorage.removeItem("token");
        console.error(error);
      } finally {
        popup?.close();
        dispatch(endLoggingIn());
      }
    };
  }

  async function loadUserStudents(token: string) {
    dispatch(startStudentLoad());
    dispatch(setStudents(await loadStudents(token)));
  }
  
  return (
    <div>
      <button style={{padding: '0'}} onClick={signIn} disabled={googleLoggingIn}>
        <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" />
      </button>
    </div>
  )
}

function getAuthWindowSizeParams(): string {
  const popupWidth = 600;
  const popupHeight = 600;
  const popupLeft = window.screen.width / 2 - popupWidth / 2;
  const popupTop = window.screen.height / 2 - popupHeight / 2; 

  return `width=${popupWidth},height=${popupHeight},top=${popupTop},left=${popupLeft}`;
}

export default GoogleAuth