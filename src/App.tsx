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
import { useAuth } from "./hooks/auth";
import { useColorMode } from "./hooks/colorMode";
import { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  useColorMode();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* {isLoggedIn && (
              <>
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/user/details" component={Details} />
                <Route exact path="/user/phone" component={Phone} />
                <Route exact path="/user/password" component={Password} />
                <Route exact path="/user/notifications" component={Notifications} />
              </>
            )} */}

            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user/details" component={Details} />
            <Route exact path="/user/phone" component={Phone} />
            <Route exact path="/user/password" component={Password} />
            <Route exact path="/user/notifications" component={Notifications} />

            {/* {!isLoggedIn && ( */}
            <>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/validate-phone" component={ValidatePhone} />
            </>
            {/* )} */}
            <Redirect exact from="/" to={isLoggedIn ? "/" : "/home"} />
          </IonRouterOutlet>

          {isLoggedIn && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
