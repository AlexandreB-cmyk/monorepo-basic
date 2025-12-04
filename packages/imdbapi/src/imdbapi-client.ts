/**
 * Client API pour PokeAPI - Package partagé du Monorepo
 *
 * Ce fichier définit un client HTTP pour interagir avec l'API REST publique PokeAPI.
 * Il est organisé comme un package réutilisable dans le monorepo (@workspace/pokeapi).
 *
 * Concepts clés pour les étudiants :
 * - Utilisation de l'API fetch native (Node.js 18+ / Next.js)
 * - Export de types TypeScript pour une meilleure DX
 * - Pattern "namespace object" pour organiser les méthodes API
 * - Gestion d'erreurs HTTP basique
 *
 * Avantages de l'organisation en package :
 * - Réutilisable dans plusieurs applications du monorepo
 * - Centralise la logique d'appel API
 * - Facilite les mises à jour et la maintenance
 */

// URL de base de l'API PokeAPI v2
const BASE = "https://api.imdbapi.dev/";

/**
 * Type générique pour les ressources nommées de l'API
 * Utilisé pour les listes de Pokémon, types, capacités, etc.
 */
export type NamedAPIResource = { name: string; url: string };

/**
 * Type générique pour les réponses paginées de l'API
 * @template T - Le type des éléments dans la liste results
 */
export type Paginated<T> = {
  count: number; // Nombre total d'éléments
  next: string | null; // URL de la page suivante (null si dernière page)
  previous: string | null; // URL de la page précédente (null si première page)
  results: T[]; // Liste des éléments de la page actuelle
};

/**
 * Fonction utilitaire générique pour les appels GET à l'API
 *
 * @template T - Le type de retour attendu
 * @param path - Le chemin relatif de l'endpoint (ex: "/pokemon/pikachu")
 * @returns Promise avec les données typées
 * @throws Error si la réponse HTTP n'est pas OK
 *
 * Note : Un délai de 300ms est simulé pour démontrer les états de chargement
 */
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  // Vérification du statut HTTP
  if (!res.ok)
    throw new Error(`imdbAPI error ${res.status}: ${res.statusText}`);
  // Parsing et typage de la réponse JSON
  return res.json() as Promise<T>;
}

/**
 * Client PokeAPI - Objet contenant toutes les méthodes d'accès à l'API
 *
 * Organisation par catégorie de ressources :
 * - Pokémon (pokemon, listPokemon, searchPokemonByName)
 * - Types (type, listTypes, getPokemonByType)
 * - Espèces (species)
 * - Capacités (ability, listAbilities)
 * - Attaques (move, listMoves)
 * - Baies (berry, listBerries)
 * - Objets (item)
 * - Localisations (location, locationArea)
 * - Versions de jeu (version, versionGroup, generation)
 */
export const FilmAPI = {
  /**
   * Récupère les données d'un Film par son nom ou son ID
   * @param nameOrId - Nom (ex: "pikachu") ou ID (ex: 25) du Pokémon
   */
  film(nameOrId: string | number) {
    return get(`/title/${nameOrId}`);
  },

  /**
   * Liste les Films avec pagination
   * @param limit - Nombre de résultats par page (défaut: 20)
   * @param offset - Point de départ dans la liste (défaut: 0)
   */
  listFilms(limit = 20, offset = 0) {
    return get<Paginated<NamedAPIResource>>(`titles`);
  },
};

/**
 * Type exporté pour le client PokeAPI
 * Utile pour typer des paramètres qui acceptent le client
 */
export type FilmAPIClient = typeof FilmAPI;
