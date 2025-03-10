import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useUser } from "../../../hooks/user";
import { useLocation } from "../../../hooks/location";
import LocationCard from "../../../components/LocationCard";

const Details: FC = () => {
  const [fullName, setFullName] = useState("");
  const { updateUser, error, setError, getUserData } = useUser();
  const { getLocations, updateLocation, deleteLocation } = useLocation();
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data: any = await getUserData();
      if (data) {
        setFullName(data.full_name);
      }
    };
    const fetchLocations = async () => {
      const locations: any = await getLocations();
      setLocations(locations);
    };
    fetchUser();
    fetchLocations();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit location with ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteLocation(id);
    if (res) {
      setLocations(locations.filter((location) => location.id !== id));
    } else {
      setError("Failed to delete location");
    }
  };

  const handleUpdate = async () => {
    if (!fullName) {
      setError("Please fill all the fields");
      return;
    }
    const data = await updateUser({ fullName });
  };
  return (
    <IonPage>
      <Header title="Details" />
      <IonContent className="ion-padding">
        <h2>Update your information</h2>
        <p>
          Below are the fields you can update. Please fill in the details and click on the update
          button to save the changes.
        </p>
        <IonItem className="input-item">
          <IonLabel position="stacked">Full Name</IonLabel>
          <IonInput
            type="text"
            value={fullName}
            onIonChange={(e) => setFullName(e.detail.value!)}
            required
          />
        </IonItem>
        <h3>Locations</h3>

        {locations?.length > 0 && (
          <IonList>
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </IonList>
        )}
        <IonButton expand="block" onClick={handleUpdate} className="register-button">
          Update
        </IonButton>
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

export default Details;
