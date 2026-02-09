# Pokédex Angular

Aplicación web que muestra una galería de 30 Pokémon aleatorios consumiendo la PokeAPI.

## Tecnologías

- **Angular 20** - Framework frontend
- **Bootstrap 5** - Estilos y diseño responsive
- **PokeAPI** - API de datos de Pokémon
- **TypeScript** - Lenguaje de programación

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Abrir en navegador
http://localhost:4567
```

## Build para producción

```bash
npm run build
```

Los archivos se generan en `dist/prueba-angular/browser`

## Estructura del proyecto

```
src/app/
├── models/
│   └── pokemon.model.ts       # Interfaces y utilidades
├── services/
│   └── pokemon.service.ts     # Llamadas a la API
├── components/
│   ├── featured-pokemon/      # Pokémon destacado con animaciones
│   ├── pokemon-card/          # Tarjeta de Pokémon
│   ├── pokemon-modal/         # Modal de detalle
│   └── type-badge/            # Badge de tipo
├── pages/
│   └── home/                  # Página principal
├── app.ts                     # Componente raíz
├── app.routes.ts              # Configuración de rutas
└── app.config.ts              # Configuración de la app
```

## Funcionalidades

- Pokémon destacado con animaciones especiales
- Galería de 30 Pokémon aleatorios
- Nombres normalizados (primera letra mayúscula)
- Modal con detalle completo del Pokémon
- URL sincronizada con el modal (`/pokemon/:id`)
- Diseño responsive (mobile, tablet, desktop)
- Botón para generar nuevos Pokémon aleatorios

## API Consumida

**Base URL:** `https://pokeapi.co/api/v2`

| Endpoint | Descripción |
|----------|-------------|
| `GET /pokemon/{id}` | Obtiene datos de un Pokémon |

**Datos utilizados:**
- `id` - Número del Pokémon
- `name` - Nombre
- `types` - Tipos (fire, water, etc.)
- `abilities` - Habilidades
- `stats` - Estadísticas base
- `height` / `weight` - Altura y peso
- `sprites` - Imágenes

## Componentes

### FeaturedPokemon
Componente destacado en la parte superior con:
- Animación de entrada
- Efecto de brillo/glow
- Animación flotante continua
- Diseño llamativo

### PokemonCard
Tarjeta individual que muestra:
- Imagen oficial del Pokémon
- Número y nombre
- Tipos con colores
- Habilidades (máximo 2)
- Botón "Ver detalles"

### PokemonModal
Modal con información completa:
- Imagen grande
- Tipos y habilidades como badges
- Características físicas (altura, peso)
- Barras de estadísticas

### TypeBadge
Badge reutilizable con el color correspondiente a cada tipo de Pokémon.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con galería |
| `/pokemon/:id` | Galería con modal abierto |

## Autor

Desarrollado por Juan Sebastian Paz como prueba técnica para CUN.

---

Hecho con Angular y PokeAPI
