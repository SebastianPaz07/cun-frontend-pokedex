import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TYPE_COLORS, capitalizeName } from '../../models/pokemon.model';

@Component({
  selector: 'app-type-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-badge.html',
  styleUrl: './type-badge.css'
})
export class TypeBadgeComponent {
  @Input() type: string = '';

  getColor(): string {
    return TYPE_COLORS[this.type] || '#777';
  }

  getName(): string {
    return capitalizeName(this.type);
  }
}
