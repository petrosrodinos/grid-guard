import { IonContent, IonPage, IonButton, IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import Header from "../../components/Header";
import { useState } from "react";
import AddLocation from "./AddLocation";
import { useLocation } from "../../hooks/location";
import { useTranslation } from "react-i18next";
import LocationOutageCard from "../../components/LocationOutageCard";
import "./style.css";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: locations, error, setError, getLocationsWithOutages } = useLocation();
  const { t } = useTranslation();

  const handleAddLocation = () => {
    setIsOpen(true);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header title="Home">
          <IonIcon icon={locationOutline} onClick={handleAddLocation} />
        </Header>

        <div className="notifications-section">
          <h2 style={{ textAlign: "left", marginLeft: "10px" }}>{t("notifications")}</h2>

          <IonButton
            onClick={handleAddLocation}
            expand="block"
            color="success"
            className="add-location-button"
          >
            <IonIcon slot="start" icon={locationOutline} />
            Add Location
          </IonButton>

          {locations.length === 0 ? (
            <IonCard className="info-card">
              <IonCardContent>
                <p>
                  There are no added locations to keep track. Please add now by pressing the button
                  below.
                </p>
              </IonCardContent>
            </IonCard>
          ) : (
            locations.map((location: any, index: number) => (
              <LocationOutageCard key={index} location={location} />
            ))
          )}
        </div>

        <AddLocation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onAddLocation={getLocationsWithOutages}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
