# GitHub Explorer SPA 🚀

[![React](https://img.shields.io/badge/React-18-blue?logo=react\&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A **single-page application** (SPA) to explore GitHub users, their repositories, and followers. Searched users can be saved, and their details can be edited. You can also navigate from a user’s follower list to search their profile and repositories.

---

## Features

* Search GitHub users by username.
* View a user’s **repositories** and **followers**.
* Click a follower to explore their profile and repositories.
* Save searched users for future reference.
* Edit saved user details: **name**, **bio**, **location**.
* Responsive and clean UI built with CSS.

---

## Tech Stack

* **Frontend:** React + TypeScript + CSS
* **Backend:** Node.js + Express + TypeScript
* **Data Fetching:** GitHub REST API
* **State Management:** React state hooks & custom hooks

---

## Screenshots

<p float="left">
  <img src="https://github.com/user-attachments/assets/34271fac-20b3-4908-882d-f448814f816f" width="400" />
  <img src="https://github.com/user-attachments/assets/cafc635f-25f8-4ba2-924e-fe1e4b4977bc" width="400" />
  <img src="https://github.com/user-attachments/assets/130f215c-3bf3-464b-9ea7-0a53b0b67b6f" width="400" />
</p>

## 📦 Installation

### Steps

1. Clone the repository:

```bash
git clone https://github.com/Athul-krishna03/Git-Explorer.git
```

2. Install backend dependencies:

```bash
cd api
npm install
```

3. Install frontend dependencies:

```bash
cd client
npm install
```

4. Run the backend server:

```bash
cd api
npm run dev
```

5. Run the frontend:

```bash
cd client
npm start
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
/api
  ├─ src/
      ├─ config/
      ├─ models/
      ├─ routes/
      ├─ controllers/
      ├─ services/
      └─ app.ts

/frontend
  ├─ src/
      ├─ components/
      ├─ hooks/
      ├─ api/
      ├─ style/
      └─ App.tsx
```

---

## 🛠 Usage

1. Enter a GitHub username and click **Search**.
2. Toggle between **Repositories** and **Followers**.
3. Click a follower to search their profile.
4. Click **Show Saved Users** to view saved users.
5. Edit a saved user’s details (name, bio, location).
6.search from the follower list of a user


---

