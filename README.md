📢 Notification Management System (Backend Only)

The Notification Management System is a backend service that facilitates notification delivery to users. It ensures critical and non-critical notifications are delivered based on the recipient's availability.

🚀 Features

🔹 Admin Capabilities

Send notifications to one or multiple users.

Classify notifications as:

Critical Notifications → Delivered immediately, regardless of recipient availability.

Non-Critical Notifications → Delivered only when the recipient is available.

🔹 User Capabilities

Send notifications to one or multiple users.

Notifications are sent based on user availability:

✅ Available → Instant delivery.

❌ Unavailable → Queued and sent once the user becomes available.



🛠 Technologies Used
Technology	Description
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
Authentication	JSON Web Tokens (JWT)
Scheduling	Node-Cron

📂 Project Structure
notification-management-system/
├── config/
│   └── database.js
├── controllers/
│   ├── ProfileController.js
│   ├── SendNotification.js
│   ├── UserAuthController.js
├── middleware/
│   └── Authentication.js
├── models/
│   ├── db.js
│   ├── Notification.js
│   ├── UserAdmin.js
│   ├── UserProfile.js
├── routes/
│   ├── AuthRouter.js
│   ├── NotificationRouter.js
├── utils/
│   ├── notificationScheduler.js
│   ├── checkAvailability.js
├── .gitignore
├── index.js
├── package.json
└── README.md


✅ Register a New User

Endpoint: POST /auth/signup

Request Body:

{ 
    "name":"saurav",
    "email":"saurav@gmail.com",
    "password":"1234",
    "role":"Admin"
}
Response:

{
  {
    "message": "account is created",
    "success": true
 }
}

✅ User Login
Endpoint: POST /uauth/login

Request Body:
{
  "email": "novneet300@gmail.com",
  "password": "asd"
}
Response:
{
   "message": "login sucess",
    "success": true,
    "email": "saurav@gmail.com",
    "name": "saurav"
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

🔧 Profile Management (Protected Route - Requires Token)
✅ Update Profile
Endpoint: PUT /profile/updateProfile

Request Body:
{
      "availabilityTime":[
        {
           "start": "13:00", 
           "end": "14:00"
        }
    ]
}


📢 Notification Management (Protected Route - Requires Token)
✅ Create Notifications
Endpoint: POST /notification/sendNotification

Request Body:

{
  "recipientIds":[  
            "679f7de93eeba7d3d64726f6" ,
            "679eac17a2b2f7d4df33de6f"
    ],
    "message":"Admin send data to all the users",
    "type":"Non-Critical"
}

⏳ Notification Scheduler
Runs every 30 seconds to check pending notifications.
Critical Notifications → Printed immediately on the console.
Non-Critical Notifications → Delivered based on the recipient's availability.

I have already created an admin
{
  "name":"saurav",
    "email":"saurav@gmail.com",
    "password":"1234",
    "role":"Admin"
}#   U s e r - M a n a g e m e n t - S y s t e m 
 
 
