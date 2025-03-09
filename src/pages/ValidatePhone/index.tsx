import { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonText,
  IonLabel,
  IonItem,
  IonAlert,
} from "@ionic/react";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";

const ValidatePhone = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get("phone");
  const { verifyOtp, loading, resendOtp, error, setError } = useAuth();

  const handleSendOtp = () => {
    resendOtp({ phone: phoneNumber });
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    verifyOtp({ phone: phoneNumber, otp });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText color="primary">
          <h2>Phone Number Validation</h2>
        </IonText>

        <IonText color="secondary">
          <p>An OTP has been sent to your phone number.</p>
        </IonText>

        <IonItem>
          <IonLabel position="stacked">Phone Number</IonLabel>
          <IonInput value={phoneNumber} placeholder="Enter your phone number" type="tel" disabled />
        </IonItem>

        <IonItem style={{ marginTop: "20px" }}>
          <IonLabel position="stacked">Enter OTP</IonLabel>
          <IonInput
            value={otp}
            onIonInput={(e: any) => setOtp(e.detail.value)}
            placeholder="Enter the OTP"
            type="number"
          />
        </IonItem>

        <IonButton style={{ marginTop: "20px" }} expand="block" onClick={handleVerifyOtp}>
          Verify OTP
        </IonButton>

        <IonButton
          fill="outline"
          color="secondary"
          expand="block"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP Again"}
        </IonButton>
      </IonContent>
      <IonAlert
        isOpen={!!error}
        header="Error"
        message={error || ""}
        buttons={["OK"]}
        onDidDismiss={() => setError(null)}
      ></IonAlert>
    </IonPage>
  );
};

export default ValidatePhone;
