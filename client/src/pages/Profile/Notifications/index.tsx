import { FC, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { call, notifications, chatbubbles } from "ionicons/icons";
import Header from "../../../components/Header";

const Notifications: FC = () => {
  const [powerSMS, setPowerSMS] = useState(false);
  const [powerPush, setPowerPush] = useState(false);
  const [waterSMS, setWaterSMS] = useState(false);
  const [waterPush, setWaterPush] = useState(false);
  const [powerViber, setPowerViber] = useState(false);
  const [waterViber, setWaterViber] = useState(false);

  return (
    <IonPage>
      <Header title="Notifications" />

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Power Outage</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={chatbubbles} slot="start" />
              <IonLabel>SMS Notifications</IonLabel>
              <IonToggle
                checked={powerSMS}
                onIonChange={(e) => setPowerSMS(e.detail.checked)}
                slot="end"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={notifications} slot="start" />
              <IonLabel>Push Notifications</IonLabel>
              <IonToggle
                checked={powerPush}
                onIonChange={(e) => setPowerPush(e.detail.checked)}
                slot="end"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={call} slot="start" />
              <IonLabel>Viber Notifications</IonLabel>
              <IonToggle
                checked={powerViber}
                onIonChange={(e) => setPowerViber(e.detail.checked)}
                slot="end"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Water Outage</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={chatbubbles} slot="start" />
              <IonLabel>SMS Notifications</IonLabel>
              <IonToggle
                checked={waterSMS}
                onIonChange={(e) => setWaterSMS(e.detail.checked)}
                slot="end"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={notifications} slot="start" />
              <IonLabel>Push Notifications</IonLabel>
              <IonToggle
                checked={waterPush}
                onIonChange={(e) => setWaterPush(e.detail.checked)}
                slot="end"
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={call} slot="start" />
              <IonLabel>Viber Notifications</IonLabel>
              <IonToggle
                checked={waterViber}
                onIonChange={(e) => setWaterViber(e.detail.checked)}
                slot="end"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
