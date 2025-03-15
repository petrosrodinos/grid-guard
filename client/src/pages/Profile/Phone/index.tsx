import { IonContent, IonPage } from "@ionic/react";
import { FC } from "react";
import Header from "../../../components/Header";

const Phone: FC = () => {
  return (
    <IonPage>
      <Header title="Phone" />
      <IonContent>
        <h1>Phone</h1>
      </IonContent>
    </IonPage>
  );
};

export default Phone;
