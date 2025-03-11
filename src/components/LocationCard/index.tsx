import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { pencilOutline, trashOutline } from "ionicons/icons";
import { municipalities, prefectures } from "../../constants/locations";

interface LocationCardProps {
  location: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit, onDelete }) => {
  const { id, address, municipality, prefecture } = location;
  const [selectedMunicipalities, setMunicipalities] = useState<any[]>([]);

  const [values, setValues] = useState<any>({
    id,
    prefecture: prefecture || "",
    municipality: municipality || "",
    address: address || "",
  });

  useEffect(() => {
    const values =
      municipalities.find((value: any) => value.id == prefecture)?.municipalities || [];
    setMunicipalities(values);
    setValues({
      id,
      prefecture: prefecture,
      municipality: municipality,
      address: address,
    });
  }, [location]);

  const handlePrefectureChange = (e: any) => {
    const id = e.detail.value.toString();
    setValues({ ...values, prefecture: id });
    const vals =
      municipalities.find((prefecture: any) => prefecture.id == id)?.municipalities || [];
    setMunicipalities(vals);
  };

  const handleMunicipalityChange = (e: any) => {
    const id = e.detail.value.toString();
    setValues({ ...values, municipality: id });
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{address}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonItem className="input-item">
          <IonSelect
            onIonChange={handlePrefectureChange}
            label="Select Prefecture"
            placeholder="Prefectures"
            value={values.prefecture}
          >
            {prefectures.map((prefecture: any) => (
              <IonSelectOption key={prefecture.id} value={prefecture.id}>
                {prefecture.value}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem className="input-item">
          <IonSelect
            onIonChange={handleMunicipalityChange}
            label="Select Municipality"
            placeholder="Municipality"
            value={values.municipality}
          >
            {selectedMunicipalities.map((municipality: any) => (
              <IonSelectOption key={municipality.id} value={municipality.id}>
                {municipality.value}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">Address</IonLabel>
          <IonInput
            value={values.address}
            onIonChange={(e) => setValues({ ...values, address: e.detail.value! })}
            placeholder="Enter Address"
            required
          />
        </IonItem>

        <IonButton color="success" onClick={() => onEdit(values)}>
          <IonIcon icon={pencilOutline} slot="start" />
          Save
        </IonButton>
        <IonButton color="danger" onClick={() => onDelete(id)}>
          <IonIcon icon={trashOutline} slot="start" />
          Delete
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LocationCard;
