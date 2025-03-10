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
import { call, notifications } from "ionicons/icons";
import Header from "../../../components/Header";

const Notifications: FC = () => {
  const [powerPhone, setPowerPhone] = useState(false);
  const [powerPush, setPowerPush] = useState(false);
  const [waterPhone, setWaterPhone] = useState(false);
  const [waterPush, setWaterPush] = useState(false);

  return (
    <IonPage>
      <Header title="Notifications" />

      <IonContent>
        {/* Power Outage Card */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Power Outage</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={call} slot="start" />
              <IonLabel>Phone Notifications</IonLabel>
              <IonToggle
                checked={powerPhone}
                onIonChange={(e) => setPowerPhone(e.detail.checked)}
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
          </IonCardContent>
        </IonCard>

        {/* Water Outage Card */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Water Outage</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={call} slot="start" />
              <IonLabel>Phone Notifications</IonLabel>
              <IonToggle
                checked={waterPhone}
                onIonChange={(e) => setWaterPhone(e.detail.checked)}
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
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
