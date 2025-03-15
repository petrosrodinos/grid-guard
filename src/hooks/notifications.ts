import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { useUser } from "./user";
import { useHistory } from "react-router-dom";

export const useNotifications = () => {
    const { updateUser } = useUser();
    const history = useHistory();

    const initPushNotifications = async () => {
        if (Capacitor.getPlatform() !== 'web') {
            registerNotifications();
            addListeners();
        }
    }

    const addListeners = async () => {
        await PushNotifications.addListener('registration', token => {
            console.info('Registration token: ', token.value);
            updateUser({ pushNotificationsToken: token.value }, { loading: false });
        });

        await PushNotifications.addListener('registrationError', err => {
            console.error('Registration error: ', err.error);
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push notification received: ', notification);
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push notification action performed', notification.actionId, notification.inputValue);
            history.push("/home");
        });
    }

    const registerNotifications = async () => {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            throw new Error('User denied permissions!');
        }

        await PushNotifications.register();
    }

    const getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
        console.log('delivered notifications', notificationList);
    }


    return {
        getDeliveredNotifications, registerNotifications, addListeners, initPushNotifications
    };
}