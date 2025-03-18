import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import {
  moon,
  logOut as logOutIcon,
  globe,
  person,
  call,
  lockClosed,
  notifications,
  chevronForwardOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useColorMode } from "../../hooks/colorMode";
import { useIonRouter } from "@ionic/react";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import "./style.css";

const Profile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const { i18n } = useTranslation();
  const { darkMode, toggleColorMode } = useColorMode();
  const router = useIonRouter();
  const { logOut } = useAuth();

  return (
    <IonPage>
      <Header title="Profile" />
      <IonContent fullscreen>
        <IonList style={{ margin: "0 auto" }}>
          <IonItem button onClick={() => history.push("/user/details")}>
            <IonIcon icon={person} slot="start" />
            <IonLabel>Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => router.push("/user/phone")}>
            <IonIcon icon={call} slot="start" />
            <IonLabel>Phone Number</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => history.push("/user/password")}>
            <IonIcon icon={lockClosed} slot="start" />
            <IonLabel>Password</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          {/* <IonItem button onClick={() => history.push("/user/notifications")}>
            <IonIcon icon={notifications} slot="start" />
            <IonLabel>Notifications</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem> */}

          <IonItem>
            <IonIcon icon={moon} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onIonChange={toggleColorMode} slot="end" />
          </IonItem>

          <IonItem>
            <IonIcon icon={globe} slot="start" />
            <IonLabel>Language</IonLabel>
            <IonSelect
              value={i18n.language || "en"}
              placeholder="Select Language"
              onIonChange={(e) => i18n.changeLanguage(e.detail.value)}
              slot="end"
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="gr">Greek</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem button onClick={logOut}>
            <IonIcon icon={logOutIcon} slot="start" />
            <IonLabel>Log Out</IonLabel>
          </IonItem>
        </IonList>
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

export default Profile;
