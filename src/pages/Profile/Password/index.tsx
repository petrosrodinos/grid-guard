import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FC } from "react";

const Password: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>password</h1>
      </IonContent>
    </IonPage>
  );
};

export default Password;
