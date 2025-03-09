import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./style.css";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>profile name</h1>
        <h1>profile email</h1>
        <h1>profile phone number</h1>
        <h1>addresses</h1>
        <h1>language</h1>
        <h1>notifications</h1>
        <h1>dark mode</h1>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
