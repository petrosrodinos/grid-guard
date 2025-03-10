import { FC, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { flash, water, call, notifications } from "ionicons/icons";

const Notifications: FC = () => {
  const [powerPhone, setPowerPhone] = useState(false);
  const [powerPush, setPowerPush] = useState(false);
  const [waterPhone, setWaterPhone] = useState(false);
  const [waterPush, setWaterPush] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {/* Power Outage Section */}
          <IonItem>
            <IonIcon icon={flash} slot="start" />
            <IonLabel>
              <strong>Power Outage</strong>
            </IonLabel>
          </IonItem>
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

          {/* Water Outage Section */}
          <IonItem>
            <IonIcon icon={water} slot="start" />
            <IonLabel>
              <strong>Water Outage</strong>
            </IonLabel>
          </IonItem>
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
