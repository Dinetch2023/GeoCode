import { useState } from "react";
import { SearchProvider, useSearch } from "../contexts/SearchContext";
import HeaderSearchbar from "../components/HeaderSearchbar";

import helpData from "../services/helpData";

function Aides() {
  const items = helpData; // Récupération des items via le fichier de services

  return (
    // Import du provider ICI car on fait remonter les items dans le Contexte
    <SearchProvider items={items}>
      <Content />
    </SearchProvider>
  );
}
function Content() {
  const { filteredItems } = useSearch();
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswerVisibility = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section>
      <HeaderSearchbar>
        {{
          title: "Les ressources",
          label:
            "Vous avez des questions ? Pour trouvez ce qu'il vous faut, parcourez nos ",
        }}
      </HeaderSearchbar>

      <p>
        {filteredItems.length === 0
          ? "Aucun résultat correspondant à la recherche"
          : `${filteredItems.length} résultat${filteredItems.length === 1 ? "" : "s"}`}
      </p>

      <ul className="aide-List">
        {filteredItems.map((aide) => (
          <li className="aide-List-Items" key={`aide ${aide.id}`}>
            <div className="aide-List-Header">
              <h3>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 15v-3h1.247c.882 0 1.235.297 1.828.909.452.465 1.925 2.091 1.925 2.091h-5zm-1-3h-2.243c-.688 0-1.051.222-1.377.581-.316.348-.895.948-1.506 1.671 1.719.644 4.055.748 5.126.748v-3zm14 5.161c0-2.823-2.03-3.41-2.794-3.631-1.142-.331-1.654-.475-3.031-.794-.549-.545-2.051-2.035-2.389-2.375l-.089-.091c-.666-.68-1.421-1.27-3.172-1.27h-7.64c-.547 0-.791.456-.254.944-.534.462-1.945 1.705-2.341 2.107-1.383 1.403-2.29 2.481-2.29 4.604 0 2.461 1.361 4.258 3.179 4.332.41 1.169 1.512 2.013 2.821 2.013 1.304 0 2.403-.838 2.816-2h6.367c.413 1.162 1.512 2 2.816 2 1.308 0 2.409-.843 2.82-2.01 1.934-.056 3.181-1.505 3.181-3.829zm-18 4.039c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm12 0c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm2.832-2.15c-.399-1.188-1.509-2.05-2.832-2.05-1.327 0-2.44.868-2.836 2.062h-6.328c-.396-1.194-1.509-2.062-2.836-2.062-1.319 0-2.426.857-2.829 2.04-.586-.114-1.171-1.037-1.171-2.385 0-1.335.47-1.938 1.714-3.199.725-.735 1.309-1.209 2.263-2.025.34-.291.774-.432 1.222-.43h5.173c1.22 0 1.577.385 2.116.892.419.393 2.682 2.665 2.682 2.665s2.303.554 3.48.895c.84.243 1.35.479 1.35 1.71 0 1.195-.396 1.825-1.168 1.887zm-6.457-13.55c0 .276-.224.5-.5.5h-1.875v1h-1.889c-.843 0-1.588-.417-2.041-1.057-.418-.59-1.099-.943-1.822-.943h-.019c-4.017 0-5.255 3.215-3.502 5.254l-.735.677c-2.341-2.679-.663-6.931 4.237-6.931h.019c.724 0 1.404-.352 1.822-.943.453-.64 1.198-1.057 2.041-1.057h1.889v1h1.875c.276 0 .5.224.5.5s-.224.5-.5.5h-1.875v1h1.875c.276 0 .5.224.5.5z" />
                </svg>
                {" | "}
                {aide.title}
              </h3>
              <button
                type="button"
                onClick={() => toggleAnswerVisibility(aide.id)}
              >
                {visibleAnswers[aide.id] ? (
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
                  </svg>
                )}
              </button>
            </div>
            {visibleAnswers[aide.id] && <p>{aide.content}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Aides;
