import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, informationCircleOutline, personOutline } from "ionicons/icons";
import Home from "./pages/Home";
import Tab2 from "./pages/Tab2";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./global.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// /* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";
import "@ionic/react/css/palettes/dark.class.css";
/* Theme variables */
import "./theme/variables.css";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValidatePhone from "./pages/ValidatePhone";
import Details from "./pages/Profile/Details";
import Phone from "./pages/Profile/Phone";
import Password from "./pages/Profile/Password";
import Notifications from "./pages/Profile/Notifications";
import { useEffect } from "react";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode") || "false");
    document.documentElement.classList.toggle("ion-palette-dark", savedDarkMode);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/tab2" component={Tab2} />
            <Route exact path="/profile" component={Profile} />

            {/* Profile Sub-Pages */}
            <Route exact path="/profile/details" component={Details} />
            <Route exact path="/profile/phone" component={Phone} />
            <Route exact path="/profile/password" component={Password} />
            <Route exact path="/profile/notifications" component={Notifications} />

            {/* Authentication Routes */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/validate-phone" component={ValidatePhone} />

            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="info" href="/tab2">
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>Info</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
