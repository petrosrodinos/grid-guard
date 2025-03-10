import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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
  logOut,
  globe,
  person,
  call,
  lockClosed,
  notifications,
  chevronForwardOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import supabase from "../../utils/supabase";
import { useTranslation } from "react-i18next";
import { useColorMode } from "../../hooks/colorMode";
import { useIonRouter } from "@ionic/react";
import "./style.css";
import Header from "../../components/Header";

const Profile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const { i18n } = useTranslation();
  const { darkMode, toggleColorMode } = useColorMode();
  const router = useIonRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      return;
    }
    history.push("/login");
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <IonPage>
      <Header title="Profile" />
      <IonContent fullscreen>
        <IonList style={{ maxWidth: "500px", margin: "0 auto" }}>
          <IonItem button onClick={() => history.push("/profile/details")}>
            <IonIcon icon={person} slot="start" />
            <IonLabel>Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => router.push("/profile/phone")}>
            <IonIcon icon={call} slot="start" />
            <IonLabel>Phone Number</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => history.push("/profile/password")}>
            <IonIcon icon={lockClosed} slot="start" />
            <IonLabel>Password</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => history.push("/profile/notifications")}>
            <IonIcon icon={notifications} slot="start" />
            <IonLabel>Notifications</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

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
              onIonChange={(e) => handleChangeLanguage(e.detail.value)}
              slot="end"
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="gr">Greek</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem button onClick={handleLogout}>
            <IonIcon icon={logOut} slot="start" />
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
