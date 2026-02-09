import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, capitalizeName } from '../../models/pokemon.model';
import { TypeBadgeComponent } from '../type-badge/type-badge';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, TypeBadgeComponent],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  @Output() viewDetail = new EventEmitter<number>();

  getName(): string {
    return capitalizeName(this.pokemon.name);
  }

  getImage(): string {
    return this.pokemon.sprites.other['official-artwork'].front_default
      || this.pokemon.sprites.front_default;
  }

  getAbilities(): string {
    return this.pokemon.abilities
      .slice(0, 2)
      .map(a => capitalizeName(a.ability.name))
      .join(', ');
  }

  onViewDetail(): void {
    this.viewDetail.emit(this.pokemon.id);
  }
}
