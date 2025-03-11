import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { timeOutline, locationOutline, alertCircleOutline } from "ionicons/icons";
import { FC } from "react";
import "./style.css";
import { Location } from "../../interfaces/location";

interface LocationCardProps {
  location: Location;
}

const outageData = [
  {
    from: "2025-03-11 10:00",
    to: "2025-03-11 14:00",
    area: "Main Street & 5th Ave",
    reason: "Scheduled maintenance",
  },
  {
    from: "2025-03-12 08:00",
    to: "2025-03-12 12:00",
    area: "Downtown District",
    reason: "Emergency repair",
  },
];

const LocationOutageCard: FC<LocationCardProps> = ({ location }) => {
  const { prefecture, municipality, address } = location;
  return (
    <div>
      <div className="location-card">
        <IonCardHeader>
          <IonCardTitle>{address}</IonCardTitle>
          <IonCardSubtitle className="small-grey-text">
            {prefecture} - {municipality}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {outageData.map((outage, idx) => (
              <IonCard key={idx} className="outage-card">
                <IonCardHeader>
                  <IonCardTitle>Outage Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel>
                      <strong>From:</strong> {outage.from}
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel>
                      <strong>To:</strong> {outage.to}
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={locationOutline} slot="start" />
                    <IonLabel>
                      <strong>Area:</strong> {outage.area}
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={alertCircleOutline} slot="start" />
                    <IonLabel>
                      <strong>Reason:</strong> {outage.reason}
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </IonCardContent>
      </div>
    </div>
  );
};

export default LocationOutageCard;
