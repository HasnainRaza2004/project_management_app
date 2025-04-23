📱 Project Management App
A cross-platform mobile application built with Expo and React Native to streamline project management tasks.

🚀 Features
Task creation and assignment

Real-time project updates

Team collaboration tools

Notifications and reminders

🛠️ Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (LTS version recommended)

Expo CLI:
Install globally using:

bash
Copy
Edit
npm install -g expo-cli
Git

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/HasnainRaza2004/project_management_app.git
cd project-management-app
Install dependencies:

bash
Copy
Edit
npm install
or

bash
Copy
Edit
yarn install
📱 Running the App
Using Expo Go (Recommended for Development)
Start the development server:

bash
Copy
Edit
expo start
This will open a browser window with a QR code.

Open the app on your device:

Install the Expo Go app from the Google Play Store or Apple App Store.

Scan the QR code displayed in the browser or terminal using Expo Go.

Using a Development Build
If your project uses custom native modules or requires a development build:

Create a development build:

bash
Copy
Edit
eas build -p android --profile development
Ensure your eas.json has a development profile configured.

Install the APK on your device:

Once the build is complete, download the APK from the Expo dashboard.

Transfer and install the APK on your Android device.

Start the development server:

bash
Copy
Edit
expo start --dev-client
📤 Sharing the App
To share the APK with others:

Build the APK for internal distribution:

bash
Copy
Edit
eas build -p android --profile internal
Ensure your eas.json has an internal profile configured.

Share the download link:

Once the build is complete, Expo will provide a public URL to the APK.

Share this URL with anyone; they can download and install the app directly.

🧪 Running Tests
To run the test suite:

bash
Copy
Edit
npm test
or

bash
Copy
Edit
yarn test
📄 Configuration
Key configuration files:

app.json: Expo app configuration.

eas.json: EAS build profiles.

Ensure these files are properly set up before building or deploying the app.

🧰 Built With
React Native

Expo

EAS Build

📬 Contact
For questions or support, please contact hasnainraza.dev26.com.