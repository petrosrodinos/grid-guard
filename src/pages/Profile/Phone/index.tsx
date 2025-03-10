import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FC } from "react";

const Phone: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Phone</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Phone</h1>
      </IonContent>
    </IonPage>
  );
};

export default Phone;
