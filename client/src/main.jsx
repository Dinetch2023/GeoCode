import axios from "axios";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import "./styles/index.scss";

// Import des pages
import Accueil from "./pages/Accueil";
import Carte from "./pages/Carte";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Borne from "./pages/Borne";
import Admin from "./pages/Admin/Admin";
import AdminBornes from "./pages/Admin/AdminBornes";
import AdminUtilisateurs from "./pages/Admin/AdminUtilisateurs";
import AdminVehicules from "./pages/Admin/AdminVehicules";
import AdminReservations from "./pages/Admin/AdminReservations";
import Profil from "./pages/Profil/Profil";
import ProfilUtilisateur from "./pages/Profil/ProfilUtilisateur";
import ProfilVehicules from "./pages/Profil/ProfilVehicules";
import ProfilReservations from "./pages/Profil/ProfilReservations";
import Informations from "./pages/Informations";
import InformationId from "./pages/InformationId";
import Aides from "./pages/Aides";
import App from "./App";
import AdminUtilisateursEdit from "./pages/Admin/AdminUtilisateursEdit";
import AdminVehiculesEdit from "./pages/Admin/AdminVehiculesEdit";
import AdminBornesEdit from "./pages/Admin/AdminBornesEdit";
import AdminBornesAddCsv from "./pages/Admin/AdminBornesAddCsv";
import ProfilUtilisateurEdit from "./pages/Profil/ProfilUtilisateurEdit";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProfilVehiculesEdit from "./pages/Profil/ProfilVehiculesEdit";
import ProtectedRoute from "./utilitaires/ProtectedRoute";
import UserProtectedRoute from "./utilitaires/ProtectedUser";

// const withAuth = (Func) => async (Args) => {
//   const auth = useAuth();

//   await Func(Args, auth);
//   return true;
// };

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/carte",
        element: <Carte />,
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals`
          );
          return response.data;
        },
      },
      {
        path: "carte/bornes/:id",
        element: <Borne />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
          );

          return response.data;
        },
      },
      {
        path: "/inscription",
        element: <Inscription />,
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/brands/`
          );
          return response.data;
        },
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/profil/gestion/:id",
        element: (
          <UserProtectedRoute>
            <Profil />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/profil/gestion/:id/utilisateur",
        element: (
          <UserProtectedRoute>
            <ProfilUtilisateur />
          </UserProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/gestion/:id/utilisateur/edit/",
        element: (
          <UserProtectedRoute>
            <ProfilUtilisateurEdit />
          </UserProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                {
                  firstname: formData.get("firstname"),
                  lastname: formData.get("lastname"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  birthday: formData.get("birthday"),
                  address: formData.get("address"),
                  zip_code: formData.get("zipcode"),
                  city: formData.get("city"),
                  avatar: formData.get("avatar"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/profil/gestion/${params.id}/utilisateur/`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(`${import.meta.env.VITE_CLIENT_URL}`);
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/profil/gestion/:id/vehicules/",
        element: (
          <UserProtectedRoute>
            <ProfilVehicules />
          </UserProtectedRoute>
        ),

        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/gestion/:id/vehicules/edit",
        element: (
          <UserProtectedRoute>
            <ProfilVehiculesEdit />
          </UserProtectedRoute>
        ),
        loader: async ({ params }) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/profil/gestion/${params.id}/vehicules/`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/profil/gestion/:id/reservations/",
        element: (
          <UserProtectedRoute>
            <ProfilReservations />
          </UserProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/bookings/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/informations",
        element: <Informations />,
      },
      {
        path: "/informations/:id",
        element: <InformationId />,
      },
      {
        path: "/aides/",
        element: <Aides />,
        loader: async () => {
          const response = await axios.get("../assets/data/articles.json");
          return response.data;
        },
      },

      {
        path: "/administrateur",
        element: (
          <ProtectedRoute requiredRole="2">
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/administrateur/utilisateurs",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminUtilisateurs />
          </ProtectedRoute>
        ),

        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users`
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/utilisateurs/:id/edit",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminUtilisateursEdit />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                {
                  firstname: formData.get("firstname"),
                  lastname: formData.get("lastname"),
                  email: formData.get("email"),
                  address: formData.get("address"),
                  zip_code: formData.get("zip_code"),
                  city: formData.get("city"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/vehicules",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminVehicules />
          </ProtectedRoute>
        ),
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars`
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/vehicules/:id/edit",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminVehiculesEdit />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/bornes",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminBornes />
          </ProtectedRoute>
        ),
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals`
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/bornes/:id",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminBornesEdit />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`,
                {
                  name: formData.get("name"),
                  address: formData.get("address"),
                  cood: formData.get("cood"),
                  power: formData.get("power"),
                  plug_type: formData.get("plug_type"),
                  chain_name: formData.get("chain_name"),
                  accessibility: formData.get("accessibility"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/bornes/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/bornes/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/bornes/import",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminBornesAddCsv />
          </ProtectedRoute>
        ),
      },

      {
        path: "/administrateur/reservations",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminReservations />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
