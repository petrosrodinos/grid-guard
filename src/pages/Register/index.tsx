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
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, error, setError } = useAuth();

  const handleRegister = async () => {
    if (!fullName || !phone || !password) {
      setError("Please fill all the fields");
      return;
    }
    const data = await registerUser({ phone, password, fullName });
    if (data) {
      // history.push("/validate-phone?phone=" + phone);
      history.replace("/");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="register-container">
          <h2>Register</h2>
          <p>Create an account to continue</p>

          <IonItem className="input-item">
            <IonLabel position="stacked">Full Name</IonLabel>
            <IonInput
              type="text"
              value={fullName}
              onIonChange={(e) => setFullName(e.detail.value!)}
              required
            />
          </IonItem>

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

          <IonButton expand="block" onClick={handleRegister} className="register-button">
            Register
          </IonButton>

          <p className="login-link">
            Already have an account? <span onClick={() => history.push("/login")}>Login</span>
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
