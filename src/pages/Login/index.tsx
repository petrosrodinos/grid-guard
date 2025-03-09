import { useState } from "react";
import "./style.css";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/auth";

const Register = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error, setError } = useAuth();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Please fill all the fields");
      return;
    }
    const data = await loginUser({ phone, password });
    if (data) {
      history.push("/");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="register-container">
          <h2>Login</h2>
          <p>Login to be able to access our services.</p>

          <IonItem className="input-item">
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput
              type="tel"
              value={phone}
              onIonChange={(e) => setPhone(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem className="input-item">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>

          <IonText className="forgot-password" onClick={() => history.push("/forgot-password")}>
            Forgot Password?
          </IonText>

          <IonButton expand="block" onClick={handleLogin} className="register-button">
            Login
          </IonButton>

          <p className="login-link">
            Dont have an account? <span onClick={() => history.push("/register")}>Sign Up</span>
          </p>
        </div>
        <IonAlert
          isOpen={!!error}
          header="Error"
          message={error || ""}
          buttons={["OK"]}
          onDidDismiss={() => setError(null)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Register;
