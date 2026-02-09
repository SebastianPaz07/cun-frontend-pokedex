import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, capitalizeName } from '../../models/pokemon.model';
import { TypeBadgeComponent } from '../type-badge/type-badge';

@Component({
  selector: 'app-pokemon-modal',
  standalone: true,
  imports: [CommonModule, TypeBadgeComponent],
  templateUrl: './pokemon-modal.html',
  styleUrl: './pokemon-modal.css'
})
export class PokemonModalComponent {
  @Input() pokemon!: Pokemon;

  @Output() close = new EventEmitter<void>();

  getName(): string {
    return capitalizeName(this.pokemon.name);
  }

  getImage(): string {
    return this.pokemon.sprites.other['official-artwork'].front_default
      || this.pokemon.sprites.front_default;
  }

  getHeight(): string {
    return (this.pokemon.height / 10).toFixed(1) + ' m';
  }

  getWeight(): string {
    return (this.pokemon.weight / 10).toFixed(1) + ' kg';
  }

  onClose(): void {
    this.close.emit();
  }

  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}
