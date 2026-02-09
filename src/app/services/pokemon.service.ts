import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Pokemon, PokemonType } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  private savedPokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }

  getRandomPokemons(count: number = 30): Observable<Pokemon[]> {
    if (this.savedPokemons.length > 0) {
      return of(this.savedPokemons);
    }

    const ids = this.generateRandomIds(count);
    const requests = ids.map(id => this.getPokemonById(id));
    return forkJoin(requests).pipe(
      tap(pokemons => this.savedPokemons = pokemons)
    );
  }

  reloadPokemons(count: number = 30): Observable<Pokemon[]> {
    this.savedPokemons = [];
    const ids = this.generateRandomIds(count);
    const requests = ids.map(id => this.getPokemonById(id));
    return forkJoin(requests).pipe(
      tap(pokemons => this.savedPokemons = pokemons)
    );
  }

  getOptimizedPokemons(count: number = 30): Observable<Pokemon[]> {
    this.savedPokemons = [];
    const randomOffset = Math.floor(Math.random() * 1000);
    const query = `
      query GetPokemons($offset: Int!, $limit: Int!) {
        pokemon_v2_pokemon(offset: $offset, limit: $limit) {
          id
          name
          pokemon_v2_pokemontypes {
            slot
            pokemon_v2_type { name }
          }
        }
      }
    `;
    return this.http.post<any>('https://beta.pokeapi.co/graphql/v1beta', {
      query,
      variables: { offset: randomOffset, limit: count }
    }).pipe(
      map(response => response.data.pokemon_v2_pokemon.map((p: any) => {
        const types: PokemonType[] = p.pokemon_v2_pokemontypes.map((t: any) => ({
          slot: t.slot,
          type: { name: t.pokemon_v2_type.name, url: '' }
        }));
        return this.buildMinimalPokemon(p.id, p.name, types);
      })),
      tap(pokemons => this.savedPokemons = pokemons)
    );
  }

  private buildMinimalPokemon(id: number, name: string, types: PokemonType[]): Pokemon {
    return {
      id,
      name,
      height: 0,
      weight: 0,
      types,
      abilities: [],
      stats: [],
      sprites: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        other: {
          'official-artwork': {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          }
        }
      }
    };
  }

  private generateRandomIds(count: number): number[] {
    const ids: number[] = [];
    while (ids.length < count) {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }
    return ids;
  }
}
