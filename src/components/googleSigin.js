import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { callApi } from '../utils/callApi'
export default function GoogleSignIn() {
  let history = useHistory();

  const responseGoogle = async (response) => {
    console.log(response);
    if (response.profileObj) {
      let checkEmail = await callApi("sign-in/google/?email=" + response.profileObj.email).then(async (response) => {
        let data = await response.data
        return data
      })

      let infoUserGoogle = response.profileObj
      let userSignByGoogle = {
        "_id": checkEmail,
        "email": infoUserGoogle.email,
        "fullName": infoUserGoogle.email,
        "roles": [
          "user"
        ],
        "verify": true
      }

      localStorage.setItem("userShopsale", JSON.stringify(userSignByGoogle));
      history.push({
        pathname: '/',
      })
    }

  }

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: 10, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}>
      <GoogleLogin
        clientId="1079345342714-8q3900edhd8glu594i1kbgovile1bgio.apps.googleusercontent.com"
        render={renderProps => (
          <Button variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled}
            className="btn-sign-in-gg"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg " style={{ height: 20, marginRight: 10 }} />
             Sign in with Google</Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}