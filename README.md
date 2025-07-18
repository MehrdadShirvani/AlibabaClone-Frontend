
# Transportation Management App – Frontend

## 📝 About the Project

![home](https://github.com/user-attachments/assets/3b32e703-ad5f-40d0-9be9-349220580194)

Welcome to the frontend of the **Transportation Management System**, a modern web interface for managing transportations, tickets, passengers, and accounts. Built with **React** and powered by **Zustand**, **Axios**, and **`TailwindCSS`**, this app emphasizes a **clean, scalable architecture** and a delightful user experience.

 💡 This frontend is powered by APIs provided by the [Transportation Management Backend](https://github.com/mehrdadShirvani/AlibabaClone-Backend/), which follows Clean Architecture and exposes a secure REST interface.

---
## 🛠️ Tech Stack

| Purpose                              | Tool                                                                                                                                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component-based UI and static typing | ![React](https://img.shields.io/badge/React-Component--Based_UI-61DAFB?logo=react&logoColor=white), ![TypeScript](https://img.shields.io/badge/TypeScript-007acc?style=flat&logo=typescript&logoColor=white)<br> |
| Client-side routing                  | ![React Router](https://img.shields.io/badge/React_Router_DOM-Client--Side_Routing-CA4245?logo=react-router&logoColor=white)                                                                                     |
| HTTP client for API communication    | ![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?logo=axios&logoColor=white)                                                                                                                       |
| Lightweight global state management  | ![Zustand](https://img.shields.io/badge/Zustand-State_Management-000000?logo=react&logoColor=white)                                                                                                              |
| Utility-first styling                | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First_Styling-06B6D4?logo=tailwindcss&logoColor=white)                                                                                          |
| Build tooling                        | ![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)                                                                                                                           |

---

## 🧭 Architectural Overview

The application is designed with a focus on **clarity, modularity, and maintainability**. It applies modern frontend best practices to ensure that UI, state management, and data access remain cohesive yet decoupled.
### Core Principles
- **Predictable State Management**  
    State is managed using **Zustand**, with well-defined slices that promote separation of concerns and ease of composition.
- **Centralized API Communication**  
    All external API interactions are handled through a single, abstracted **Axios instance**, simplifying request handling and error interception.
- **Reusable UI Components**  
    The UI is built with **`TailwindCSS`** and follows a modular component approach, encouraging reuse and consistency across views.
- **Structured Routing Strategy**  
    Navigation is handled through **React Router DOM**, leveraging nested and dynamic routes for scalability and clear navigation flow.
- **Unidirectional Data Flow**  
    Data flows in a single direction, keeping the interaction between components, state, and services intuitive and traceable.
---
## 🗂️ Project Structure
The project uses a **feature-based folder structure** for better scalability and separation of concerns.
```
/src
 ┣ /components       # Reusable UI components
 ┣ /features         # Feature-based UI & logic
 ┃ ┣ /tickets
 ┃ ┣ /accounts
 ┃ ┣ /routes
 ┗ ┃ ┗ /vehicles
 ┣ /lib
 ┣ /shared
 ┃ ┣ /api              # Axios instance & endpoint modules
 ┃ ┣ /components
 ┃ ┣ /layout
 ┃ ┃ ┣ /App.tsx          # Root component
 ┃ ┃ /models
 ┣ /store            
 
```

---
## 🔗API Integration

All API calls are made through a **centralized Axios instance** with built-in support for:
- Interceptors (e.g., auth tokens)
- Base URL environment configuration
- Error handling & retry strategies

API access is **abstracted per domain**, for example:

```ts
const Auth = {
  register: (data: RegisterRequestDto) =>
    request.post<AuthResponseDto>('/auth/register', data),
  login: (data: LoginRequestDto) =>
    request.post<AuthResponseDto>('/auth/login', data),
};
```

---
## 🧾Strong Typing

The app uses **TypeScript DTOs** for API requests and responses, improving type safety and development speed.

Example:
```ts
export interface LoginRequestDto {
  phoneNumber: string;
  password: string;
}
```

## 🔄State Management

Using **Zustand** for simple, powerful, and testable global state:

```ts
import { AuthResponseDto } from '@/shared/models/authentication/AuthResponseDto';
import {create} from 'zustand';

interface User {
  phoneNumber: string;
  roles: string[];
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (response: AuthResponseDto) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	...
}));
```

---

## 🔐 Authentication & JWT Handling

- JWT token is **stored** in a Zustand store with `localStorage` persistence.
- **Axios interceptors** automatically attach the token to every request.
- Secure routes rely on the presence of a valid token in the store.

## 🎨 Styling

`TailwindCSS` is used to maintain a **consistent, responsive, and fast design workflow**.
- Custom theme & utility classes configured in `tailwind.config.js`
- Follows mobile-first and accessibility-friendly conventions
- Shared styles (e.g., button, input components) live in `/components/ui`

**Themes**

The app supports **built-in themes** with full dynamic switching capability using **CSS variables**.
-  **4 default themes** 
- Easy to switch themes across the app using a single toggle or dropdown.
- Theme styles are scoped via class names (e.g., `.theme-dark`) and applied to the root container.


**Example Theme Definition**

```css
.theme-dark {
  --background:           #121212;
  --surface:              #1E1E1E;
  --text-primary:         #ffffff;
  --text-secondary:       #3b3b3b;
  --border:               #2C2C2C;
  --ring:                 #3B82F6;

  --primary:              #3B82F6;
  --primary-foreground:   #ffffff;
  --primary-hover:        #2563EB;
  ...
}

```
![theme-02](https://github.com/user-attachments/assets/880a822e-60d4-4aaa-b1e4-4a4c480c7876)
![theme-03](https://github.com/user-attachments/assets/8faa84de-bd0e-4b35-b011-4405a75cc660)
![theme-04](https://github.com/user-attachments/assets/6d5176e2-1dfd-4940-863f-e8c678cff27e)



---
## 🛣️Routing

The app uses `react-router-dom@`to define routes in a centralized file:

```tsx
<Router>
      <Navbar /> {/* Navbar will show on all pages */}
      <div className="pt-16">
        {" "}
        {/* padding top if navbar is fixed */}
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route
            path="/:vehicleId/:fromCityId/:toCityId"
            element={<SearchResultsPage />}
          />
          <Route path="/reserve" element={<ReservationLayout />}>
            <Route path="travelers" element={<TravelerDetailsForm />} />
            <Route path="review" element={<ReviewAndConfirm />} />
            ...
          </Route>
          ...
        </Routes>
      </div>
    </Router>
```

Includes support for:
- Protected routes
- Nested layouts
- Route parameters

---

## 🚀Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/MehrdadShirvani/AlibabaClone-Frontend.git
    cd transportation-frontend
    ```
    
2. **Install dependencies**
    ```bash
    npm install
    ```
    
3. **Run the app**
    ```bash
    npm run dev
    ```

---
## 📸 Screenshots
![home](https://github.com/user-attachments/assets/7d494d96-ad46-496c-822e-c97ecc32f451)
![Screenshot 2025-06-29 135302](https://github.com/user-attachments/assets/3be04dfb-80ce-4fbe-b0a2-9011ca219bcc)
![Screenshot 2025-06-29 135329](https://github.com/user-attachments/assets/0689fbb1-20b9-451d-80e9-fe7773ce377c)
![traveler-selection](https://github.com/user-attachments/assets/b2b06eb8-bf8d-423b-94b1-1b75e9b9d0ca)
![review-confirm](https://github.com/user-attachments/assets/a05e0ca2-a766-4a6c-9a63-ad56f47ee230)
![download-ticket](https://github.com/user-attachments/assets/6e968329-a202-4fc9-b014-ad38d8d69a08)
![ticket-order-detail](https://github.com/user-attachments/assets/dd1dac8c-037a-4565-9e6c-1437ced57f2f)

---
## 📚 Resources

### React with TypeScript
- **Beginner Tutorial (Mosh)**  
    [Programming with Mosh – React Crash Course](https://www.youtube.com/watch?v=SqcY0GlETPk)  
- **Beginner Tutorial (freeCodeCamp)**  
    [React & TypeScript - Course for Beginners](https://www.youtube.com/watch?v=FJDVKeh7RJI&ab_channel=freeCodeCamp.org)
### Tailwind CSS
- **Documentation**
	  [Official v2 Documentation](https://v2.tailwindcss.com/docs)
### Axios
- **Documentation**  
    [Axios Official Docs](https://axios-http.com/docs/intro)
### Zustand
- **Zustand Tutorial (freeCodeCamp)**  
    [Zustand React State Management Course (Simple Redux Alternative)](https://www.youtube.com/watch?v=fZPgBnL2x-Q)
    
### React Router DOM
- **W3Schools Guide**  
    [react router](https://www.w3schools.com/react/react_router.asp)
    
---

## 🐦‍🔥 Order of the Phoenix
This project is part of the first initiative by **The Order of the Phoenix** — a student-led movement aimed at building a culture of self-driven learning, teamwork, and meaningful project development. What started as a grassroots .NET learning group evolved into a full-stack travel management system inspired by platforms like Alibaba.ir, built with clean architecture on the backend and a modern React frontend.

 🔗 For more information, and to explore the full documentation and creation process, visit: **[ASP.NET Project Documentation](https://theorderofphoenix.github.io/ASP.NET/)**  


I should specially thank:

[Amin Ghoorchian](https://github.com/AminGh05)

[Ali Taherzadeh](https://github.com/AliThz)

For their guidance, help and accompaniment.

---

## 📝 License

MIT License – see `LICENSE` file for details.


