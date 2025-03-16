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
import { FC, useMemo } from "react";
import { Location } from "../../interfaces/location";
import "./style.css";
import { municipalities, prefectures } from "../../constants/locations";

interface LocationCardProps {
  location: Location;
}

const LocationOutageCard: FC<LocationCardProps> = ({ location }) => {
  const { prefecture, municipality, address, name, outages } = location;

  const prefectureName = useMemo(() => {
    return prefectures.find((pref) => pref.id === prefecture)?.value;
  }, [prefecture]);

  const municipalityName = useMemo(() => {
    return municipalities
      .find((m) => m.id == prefecture)
      ?.municipalities.find((muni) => muni.id == municipality)?.value;
  }, [prefectureName]);

  return (
    <div className="location-card">
      <IonCardHeader>
        <IonCardTitle>
          {name} - {address}
        </IonCardTitle>
        <IonCardSubtitle className="small-grey-text">
          {prefectureName} - {municipalityName}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {outages?.map((outage, idx) => (
            <IonCard key={idx} className="outage-card">
              <IonCardHeader>
                <IonCardTitle>Outage Information</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonIcon icon={timeOutline} slot="start" />
                  <IonLabel>
                    <strong>From:</strong> {outage.from.date} - {outage.from.time}
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={timeOutline} slot="start" />
                  <IonLabel>
                    <strong>To:</strong> {outage.to.date} - {outage.to.time}
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={locationOutline} slot="start" />
                  <IonLabel>
                    <strong>Area:</strong> {outage.areaDescription}
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
  );
};

export default LocationOutageCard;
