import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, capitalizeName, TYPE_COLORS } from '../../models/pokemon.model';
import { TypeBadgeComponent } from '../type-badge/type-badge';

@Component({
  selector: 'app-featured-pokemon',
  standalone: true,
  imports: [CommonModule, TypeBadgeComponent],
  templateUrl: './featured-pokemon.html',
  styleUrl: './featured-pokemon.css'
})
export class FeaturedPokemonComponent {
  @Input() pokemon!: Pokemon;
  @Output() viewDetail = new EventEmitter<number>();

  getName(): string {
    return capitalizeName(this.pokemon.name);
  }

  getImage(): string {
    return this.pokemon.sprites.other['official-artwork'].front_default
      || this.pokemon.sprites.front_default;
  }

  getPrimaryColor(): string {
    const type = this.pokemon.types[0]?.type.name || 'normal';
    return TYPE_COLORS[type] || '#A8A878';
  }

  getSecondaryColor(): string {
    const color = this.getPrimaryColor();
    return color + '40';
  }

  onViewDetail(): void {
    this.viewDetail.emit(this.pokemon.id);
  }
}
