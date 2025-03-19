# Power Outages Real-Time Notifications

## 📌 Project Description
This project provides real-time notifications for power outages. It helps users stay informed about power disruptions in their area. The system leverages Firebase Cloud Functions and Google Cloud Scheduler to process and send notifications, while Supabase serves as the backend database. The frontend is built using Ionic for a smooth cross-platform experience.

## 🛠 Technologies Used
- **Ionic** - Frontend framework for building cross-platform mobile and web applications.
- **Supabase** - For authentication and database management.
- **Firebase Cloud Functions** - Serverless functions for handling notifications and real-time updates.
- **Google Cloud Scheduler** - Task scheduler to trigger background processes at scheduled intervals.

## 🚀 Build & Run Commands
### Install Dependencies
```sh
npm install
```

### Run the Ionic App
```sh
npm run dev
```

### Build the Ionic App
```sh
npm run build
```

### Deploy Firebase Functions
```sh
npm run build
npm run serve
npm run deploy
```

```

## 📌 How It Works
1. Users subscribe to receive power outage notifications.
2. Power outage data is stored and updated in Supabase.
3. Firebase Cloud Functions process the data and send notifications.
4. Google Cloud Scheduler triggers updates at predefined intervals.
