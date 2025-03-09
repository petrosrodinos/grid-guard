import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useState } from "react";
import "./style.css";

interface AddLocationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddLocation: FC<AddLocationProps> = ({ isOpen, setIsOpen }) => {
  const [prefecture, setPrefecture] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [address, setAddress] = useState("");

  const handleAddLocation = () => {
    if (!prefecture || !municipality || !address) {
      alert("Please fill all the fields");
      return;
    }
    alert("Location added successfully!");
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
          <IonLabel position="stacked">Prefecture</IonLabel>
          <IonInput
            value={prefecture}
            onIonChange={(e) => setPrefecture(e.detail.value!)}
            placeholder="Enter Prefecture"
            required
          />
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">Municipality</IonLabel>
          <IonInput
            value={municipality}
            onIonChange={(e) => setMunicipality(e.detail.value!)}
            placeholder="Enter Municipality"
            required
          />
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
      {/* <IonAlert
                isOpen={!!error}
                header="Error"
                message={error || ""}
                buttons={["OK"]}
                onDidDismiss={() => setError(null)}
              ></IonAlert> */}
    </IonModal>
  );
};

export default AddLocation;
