import { IonContent, IonPage } from "@ionic/react";
import { FC } from "react";
import Header from "../../../components/Header";

const Password: FC = () => {
  return (
    <IonPage>
      <Header title="Password" />
      <IonContent>
        <h1>password</h1>
      </IonContent>
    </IonPage>
  );
};

export default Password;
