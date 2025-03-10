import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FC } from "react";

const Details: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>details</h1>
      </IonContent>
    </IonPage>
  );
};

export default Details;
