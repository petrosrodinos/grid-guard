import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import AddLocation from "./AddLocation";
import { useTranslation } from "react-i18next";
import LocationOutageCard from "../../components/LocationOutageCard";
import { useNotifications } from "../../hooks/notifications";
import { useQuery } from "@tanstack/react-query";
import { getUserOutages } from "../../services/location";
import { useAuthStore } from "../../stores/auth";
import "./style.css";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { initPushNotifications } = useNotifications();
  const { user } = useAuthStore();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["outages"],
    enabled: !!user?.id,
    queryFn: () => getUserOutages(user?.id),
  });

  useEffect(() => {
    initPushNotifications();
  }, []);

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

          {(data?.length == 0 || !data?.locations || data?.locations?.length === 0) &&
          !isLoading ? (
            <IonCard className="info-card">
              <IonCardContent>
                <p>
                  There are no outages in your location.Or you have not added any location. Please
                  add a location to get notifications.
                </p>
              </IonCardContent>
            </IonCard>
          ) : (
            data?.locations &&
            data?.locations?.map((location: any, index: number) => (
              <LocationOutageCard key={index} location={location} />
            ))
          )}
          {error && (
            <IonCard className="info-card">
              <IonCardContent>
                <p>There was an error fetching the data. Please try again later.</p>
              </IonCardContent>
            </IonCard>
          )}
          {isLoading && (
            <IonSpinner
              color="success"
              style={{ margin: "0 auto", width: "100%", marginTop: "20px" }}
            ></IonSpinner>
          )}
        </div>

        <AddLocation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onAddLocation={() => {
            refetch();
            setIsOpen(false);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
