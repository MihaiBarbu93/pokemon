# 🧠 Pokédex Angular App

Aceasta este o aplicație Pokédex modernă construită cu **Angular standalone components** și **Angular Material**, care consumă date din [PokeAPI](https://pokeapi.co/). Proiectul include funcționalități de căutare, detalii pentru fiecare Pokémon, wishlist, listă de Pokemoni prinși, animații și interfață responsive.

🔗 Live Demo: [https://mihaibarbu93.github.io/pokemon/](https://mihaibarbu93.github.io/pokemon/)


## 🔧 Funcționalități

- 🔍 Căutare în timp real după numele Pokémonului
- 📄 Vizualizare detalii Pokémon (statistici, abilități, sprite-uri, apariții)
- ❤️ Wishlist (listă de dorințe)
- ✅ Caught list (Pokémoni prinși)
- 🎞️ Animație la prinderea Pokémonului
- 🎨 Interfață modernă cu Angular Material și animații
- 🧪 Teste unitare pentru componente cheie
- 📦 Persistence cu `localStorage`

## 🧱 Tech Stack

- [Angular 19.2.14]
- Standalone components (fără `NgModules`)
- Angular Material
- RxJS & `forkJoin` pentru încărcarea datelor
- PokeAPI REST client
- LocalStorage pentru wishlist și caught list
- Unit Testing: Jasmine & Karma

## 🚀 Instalare & rulare locală

git clone https://github.com/MihaiBarbu93/pokemon.git
npm install
npm start
