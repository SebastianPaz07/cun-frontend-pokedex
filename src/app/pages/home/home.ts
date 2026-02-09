import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonModalComponent } from '../../components/pokemon-modal/pokemon-modal';
import { FeaturedPokemonComponent } from '../../components/featured-pokemon/featured-pokemon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, PokemonModalComponent, FeaturedPokemonComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  featuredPokemon: Pokemon | null = null;
  selectedPokemon: Pokemon | null = null;

  loading = true;
  error = '';

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPokemons();

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.openModalById(Number(id));
      } else {
        this.selectedPokemon = null;
      }
    });
  }

  loadPokemons(): void {
    this.loading = true;
    this.error = '';

    this.pokemonService.getRandomPokemons(30).subscribe({
      next: (pokemons) => {
        this.featuredPokemon = pokemons[0];
        this.pokemons = pokemons.slice(1);
        this.loading = false;

        const id = this.route.snapshot.params['id'];
        if (id) {
          this.openModalById(Number(id));
        }
      },
      error: (err) => {
        this.error = 'Error al cargar Pokémon. Intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  openModalById(id: number): void {
    const pokemon = this.pokemons.find(p => p.id === id);

    if (pokemon) {
      this.selectedPokemon = pokemon;
    } else {
      this.pokemonService.getPokemonById(id).subscribe({
        next: (pokemon) => {
          this.selectedPokemon = pokemon;
        },
        error: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }

  onViewDetail(pokemonId: number): void {
    this.router.navigate(['/pokemon', pokemonId]);
  }

  closeModal(): void {
    this.selectedPokemon = null;
    this.router.navigate(['/']);
  }

  reload(): void {
    this.pokemons = [];
    this.featuredPokemon = null;
    this.loading = true;
    this.error = '';

    this.pokemonService.reloadPokemons(30).subscribe({
      next: (pokemons) => {
        this.featuredPokemon = pokemons[0];
        this.pokemons = pokemons.slice(1);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar Pokémon.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  reloadOptimized(): void {
    this.pokemons = [];
    this.featuredPokemon = null;
    this.loading = true;
    this.error = '';

    this.pokemonService.getOptimizedPokemons(30).subscribe({
      next: (pokemons) => {
        this.featuredPokemon = pokemons[0];
        this.pokemons = pokemons.slice(1);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar Pokémon.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
}
