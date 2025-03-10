import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { FC } from "react";
import "./style.css";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ title, children }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <IonButtons className="header-buttons" slot="end">
          {children}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
