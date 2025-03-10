import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import "./style.css";
import Header from "../../components/Header";
import { useState } from "react";
import AddLocation from "./AddLocation";
import { useLocation } from "../../hooks/location";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getLocationNotifications, error, setError } = useLocation();
  const { t } = useTranslation();

  const handleAddLocation = () => {
    setIsOpen(true);
  };

  return (
    <IonPage>
      <Header title="Home" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="notifications-section">
          <h2>{t("notifications")}</h2>

          <IonCard className="info-card">
            <IonCardContent>
              <p>
                There are no added locations to keep track. Please add now by pressing the button
                below.
              </p>
            </IonCardContent>
          </IonCard>

          <IonButton
            onClick={handleAddLocation}
            expand="block"
            color="success"
            className="add-location-button"
          >
            <IonIcon slot="start" icon={locationOutline} />
            Add Location
          </IonButton>
        </div>
        <AddLocation isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
