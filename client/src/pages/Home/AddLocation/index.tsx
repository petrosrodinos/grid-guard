import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { FC, useState } from "react";
import { useLocation } from "../../../hooks/location";
import { municipalities, prefectures } from "../../../constants/locations";
import "./style.css";

interface AddLocationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddLocation?: () => void;
}

const AddLocation: FC<AddLocationProps> = ({ isOpen, setIsOpen, onAddLocation }) => {
  const [prefecture, setPrefecture] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [selectedMunicipalities, setMunicipalities] = useState<any[]>([]);
  const { addLocation, error, setError } = useLocation();
  const [present] = useIonToast();

  const handleAddLocation = async () => {
    if (!prefecture || !municipality || !address || !name) {
      setError("Please fill all the fields.");
      return;
    }
    const data = await addLocation({
      prefecture,
      municipality,
      address,
      name,
    });
    if (data) {
      present({
        message: "Location added successfully",
        duration: 1500,
        position: "top",
        cssClass: "toast-success",
      });
      onAddLocation?.();
    }
  };

  const handlePrefectureChange = (e: any) => {
    const id = e.detail.value.toString();
    setPrefecture(id);
    const values = municipalities.find((value: any) => value.id == id)?.municipalities || [];
    setMunicipalities(values);
  };

  const handleMunicipalityChange = (e: any) => {
    setMunicipality(e.detail.value);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Location</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="info-card">
          <IonCardContent>
            <p>
              You can add a location to keep track for notifications. Please fill the following
              fields to add a location.
            </p>
          </IonCardContent>
        </IonCard>
        <IonItem className="input-item">
          <IonLabel position="stacked">Location Name</IonLabel>
          <IonInput
            value={address}
            onIonChange={(e) => setName(e.detail.value!)}
            placeholder="Give a name to this location (home)"
            required
          />
        </IonItem>
        <IonItem className="input-item">
          <IonSelect
            onIonChange={handlePrefectureChange}
            label="Select Prefecture"
            placeholder="Prefectures"
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
            value={address}
            onIonChange={(e) => setAddress(e.detail.value!)}
            placeholder="Enter Address"
            required
          />
        </IonItem>

        <IonButton
          onClick={handleAddLocation}
          expand="block"
          color="success"
          className="add-location-button"
        >
          Add Location
        </IonButton>
      </IonContent>
      <IonAlert
        isOpen={!!error}
        header="Error"
        message={error || ""}
        buttons={["OK"]}
        onDidDismiss={() => setError(null)}
      ></IonAlert>
    </IonModal>
  );
};

export default AddLocation;
