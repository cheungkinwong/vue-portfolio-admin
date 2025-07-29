# Vue Portfolio Admin

A secure admin panel for managing portfolio data with role-based access. Built using Vue 3 and Vuetify, this app allows administrators to log in, manage portfolio content (CRUD), and redirects users with read-only access to the reader-facing client.

---

## ✨ Features

- 🔐 **JWT Authentication**
- 👤 **Role-based Authorization**  
  - **Admin**: Full CRUD access  
  - **Reader**: Redirected to public portfolio
- ⚙️ **CRUD Operations** for portfolio entities (Work Experience, Education, Skills, Projects, etc.)
- 🎨 **Vuetify UI with Material Design Icons**
- 📦 Built with **Vue 3 + Vite + TypeScript**
- 🌱 State management with **Pinia**
- 🌐 API communication via **Axios**

---

## 🚀 Tech Stack

| Layer      | Tech                             |
|------------|----------------------------------|
| Frontend   | Vue 3, Vuetify, TypeScript, Vite |
| State      | Pinia                            |
| API Calls  | Axios                            |
| Auth       | JWT                              |
| UI Icons   | Material Design Icons            |

---

## 🔐 Authentication & Routing Logic

* On login, the app receives a JWT token and stores it.
* User role is decoded from the token.
* If role is:

  * **Admin** → allowed into the dashboard.
  * **Reader** → automatically redirected to the public portfolio site (`/reader` or external link).

---

## 📂 Project Structure

```
src/
├── assets/            # Static assets
├── components/        # Shared UI components
├── plugins/           # auth axios and vuetify
├── pages/             # Page views
├── stores/            # Pinia stores for managing entity state
├── router/            # Vue Router configuration
├── types/             # Typescript interface 
├── utils/             # Utility functions and helpers
└── main.ts            # App entry point
```


---

## 📦 Getting Started

npm install
npm run dev

---

## 🪪 License

MIT License

---

## 🙏 Acknowledgements

* [Vuetify](https://vuetifyjs.com/)
* [Material Design Icons](https://pictogrammers.com/library/mdi/)
* [Vue 3](https://vuejs.org/)
* [Pinia](https://pinia.vuejs.org/)



