import { useLoaderData, Form, Link } from "react-router-dom";
import { SearchProvider, useSearch } from "../../contexts/SearchContext";
import HeaderSearchbar from "../../components/HeaderSearchbar";

function AdminUtilisateur() {
  const items = useLoaderData(); // Récupération des items via le loader dans main.jsx

  return (
    // Import du provider ICI car on fait remonter les items dans le Contexte
    <SearchProvider items={items}>
      <Content />
    </SearchProvider>
  );
}

// Déclaration d'un composant Content CAR, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function Content() {
  const { filteredItems } = useSearch();
  return (
    <section>
      <Link to="/administrateur">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <Form method="post">
        <label htmlFor="firstname">Prénom</label>{" "}
        <input
          type="text"
          id="firstname"
          name="firstname"
          defaultValue="John"
        />
        <label htmlFor="lastname">Nom</label>{" "}
        <input type="text" id="lastname" name="lastname" defaultValue="Doe" />
        <button type="submit">Ajouter</button>
      </Form>
      <HeaderSearchbar>
        {{
          title: `Mes utilisateurs`,
          label: "Trouvez ci-dessous la liste de vos ",
        }}
      </HeaderSearchbar>

      <p>
        {filteredItems.length === 0
          ? "Aucun résultat correspondant à la recherche"
          : `${filteredItems.length} résultat${filteredItems.length === 1 ? "" : "s"}`}
      </p>

      <ul className="admin-users-list">
        {filteredItems.map((user) => (
          <Link to={`/administrateur/utilisateurs/${user.id}`} key={user.id}>
            <li className="admin-users-item">
              <img
                src={user.image}
                alt={`${user.firstname} ${user.lastname}`}
              />
              <div className="admin-users-infos">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                height={20}
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" />
              </svg>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default AdminUtilisateur;
