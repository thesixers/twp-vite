import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../../requests/apicalls";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn({ setUser }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "222580688721-1rdmd4tadv6reuad2s2nsad5krm635kq.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCallbackResponse = async (response) => {
    let res = await axios.post(
      `${serverUrl}/twp/auth/google-auth`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${response.credential}`,
        },
      }
    );

    let { E, M } = res.data;

    console.log({ E, M });
    if(res.data.M) {
      setUser(res.data.user);
      navigate("/");
    }
  };

  return <div id="googleSignInDiv"></div>;
}
