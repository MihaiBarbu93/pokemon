export interface Pokemon {
    id: number;
    name: string;
    sprites?: {
      front_default?: any;
      back_default?: any;
      front_shiny?: any;
      back_shiny?: any;
    };
    types?: { type: { name: string } }[];
    stats?: { base_stat: number; stat: { name: string } }[];
    abilities?: { ability: { name: string } }[];
    base_experience?: number;
    height?: number;
    weight?: number;
    moves?: { move: { name: string } }[];
    game_indices?: { version: { name: string } }[];
    url?: string;
    image?: any;
  }

  export interface PokemonListResponse {
    results: Pokemon[];
  }
  