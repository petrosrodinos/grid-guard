import { IonContent, IonPage } from "@ionic/react";
import { FC } from "react";
import Header from "../../../components/Header";

const Details: FC = () => {
  return (
    <IonPage>
      <Header title="Details" />
      <IonContent>
        <h1>details</h1>
      </IonContent>
    </IonPage>
  );
};

export default Details;
