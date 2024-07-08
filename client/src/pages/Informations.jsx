import { Link } from "react-router-dom";
import { SearchProvider, useSearch } from "../contexts/SearchContext";
import HeaderSearchbar from "../components/HeaderSearchbar";
import infoData from "../services/infoData";

function Informations() {
  const items = infoData; // Récupération des items via le fichier de services

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
      <HeaderSearchbar>
        {{
          title: "Les actualités",
          label: "Trouvez ci-dessous la liste des ",
        }}
      </HeaderSearchbar>

      <p>
        {filteredItems.length === 0
          ? "Aucun résultat correspondant à la recherche"
          : `${filteredItems.length} résultat${filteredItems.length === 1 ? "" : "s"}`}
      </p>

      <ul className="info-List">
        {filteredItems.map((info) => (
          <Link to={`/informations/${info.id}`} key={`info ${info.id}`}>
            <li className="info-List-Items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M3.222 4.124l.997.796.432.345.432.345c-.506.635-1.683.755-2.143.687-.207-.442-.406-1.166.282-2.173zm2.675-4.124c-.187 0-.373.082-.499.24l-1.493 1.87-.997-.797s-.739.876-1.207 1.501c-.625.834-1.082 1.979-.841 3.035.434 1.904-.86 2.422-.86 6.151 0 6.627 5.373 12 12 12 6.517 0 11.825-5.198 12-11.673h-2c-.175 5.362-4.597 9.673-10 9.673-5.514 0-10-4.486-10-10 0-1.466.287-3.698 1.797-3.844 1.522-.147 2.203-.484 2.878-1.335.485-.612 1.218-1.525 1.218-1.525l-.997-.797 1.494-1.869c.22-.275.175-.677-.1-.897-.118-.094-.258-.14-.398-.14-.187 0-.373.082-.499.24l-1.494 1.87-.997-.797 1.494-1.87c.22-.275.175-.677-.1-.897-.118-.093-.259-.139-.399-.139zm13.596 2.638l-1.298 1.535c.469.372.894.794 1.291 1.242l1.498-1.333c-.459-.519-.95-1.011-1.491-1.444zm2.417 2.629l-1.504 1.338c.279.432.514.893.725 1.366l1.873-.711c-.303-.702-.668-1.369-1.094-1.993zm1.601 3.405l-1.874.711c.129.47.236.949.294 1.444h2.001c-.072-.742-.219-1.459-.421-2.155zm-14.011 4.667c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm4.5.5c0-.138-.112-.25-.25-.25h-3.5c-.138 0-.25.112-.25.25s.112.25.25.25h3.5c.138 0 .25-.112.25-.25zm2-.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm-8.649-3.25h-1.101c-.138 0-.25.112-.25.25v.255c0 .397.463.495.808.495l.543-1zm9.659 1.584c-.435-.808-.866-1.612-1.342-2.406-.393-.656-.685-.969-1.375-1.093-.698-.125-1.341-.174-2.293-.174s-1.595.049-2.292.174c-.69.124-.982.438-1.375 1.093-.476.794-.906 1.598-1.342 2.406-.345.637-.491 1.206-.491 1.903 0 .659.21 1.207.5 1.909v1.104c0 .276.224.5.5.5h.75c.276 0 .5-.224.5-.5v-.5h6.5v.5c0 .276.224.5.5.5h.75c.276 0 .5-.224.5-.5v-1.104c.29-.701.5-1.25.5-1.909 0-.697-.146-1.266-.49-1.903zm-7.821-1.892c.335-.559.426-.575.695-.623.635-.114 1.228-.158 2.116-.158s1.481.044 2.116.158c.269.048.36.064.695.623.204.341.405.694.597 1.04-.728.11-2.01.268-3.408.268-1.524 0-2.759-.168-3.402-.277.19-.343.389-.694.591-1.031zm5.798 5.308h-5.974c-.836 0-1.513-.677-1.513-1.513 0-.821.253-1.211.592-1.839.52.103 1.984.352 3.908.352 1.74 0 3.28-.227 3.917-.336.332.615.583 1.005.583 1.823 0 .836-.677 1.513-1.513 1.513zm2.763-5c.138 0 .25.112.25.25v.255c0 .397-.463.495-.808.495l-.543-1h1.101z" />
              </svg>
              <h3>{info.title}</h3>
              <p>{info.subTitle}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Informations;
