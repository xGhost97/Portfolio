// ============================================
// BASE DE DONNÉES DES BIENS
// ============================================

const biensData = {
    hebergements: [
        {
            id: 'h1',
            type: 'hebergement',
            nom: 'Villa Vue Mer - Guadeloupe',
            localisation: 'guadeloupe',
            localisationNom: 'Saint-François, Guadeloupe',
            prix: 150,
            image: 'antilles.jpg',
            description: 'Magnifique villa avec piscine privée et vue imprenable sur la mer des Caraïbes',
            chambres: 4,
            personnes: 8,
            sallesBain: 3,
            piscine: true,
            rating: 4.8,
            avis: 124,
            populaire: true
        },
        {
            id: 'h2',
            type: 'hebergement',
            nom: 'Bungalow Tropical - Martinique',
            localisation: 'martinique',
            localisationNom: 'Les Trois-Îlets, Martinique',
            prix: 85,
            image: 'antilles2.jpg',
            description: 'Charmant bungalow au cœur d\'un jardin tropical, proche des plages',
            chambres: 2,
            personnes: 4,
            sallesBain: 1,
            piscine: false,
            rating: 4.6,
            avis: 89,
            populaire: false
        },
        {
            id: 'h3',
            type: 'hebergement',
            nom: 'Appartement Paris Centre',
            localisation: 'martinique',
            localisationNom: 'Fort-de-France, Martinique',
            prix: 120,
            image: 'Louer-a-Paris-2-1030x687.jpg',
            description: 'Appartement moderne avec tout le confort, idéal pour les familles',
            chambres: 3,
            personnes: 6,
            sallesBain: 2,
            piscine: true,
            rating: 4.7,
            avis: 156,
            populaire: true
        },
        {
            id: 'h4',
            type: 'hebergement',
            nom: 'Maison de Campagne Luxe',
            localisation: 'guadeloupe',
            localisationNom: 'Deshaies, Guadeloupe',
            prix: 200,
            image: 'maison-campagne.png',
            description: 'Splendide maison de campagne entourée de nature, calme absolu',
            chambres: 5,
            personnes: 10,
            sallesBain: 4,
            piscine: true,
            rating: 4.9,
            avis: 203,
            populaire: true
        },
        {
            id: 'h5',
            type: 'hebergement',
            nom: 'Studio Plage Saint-Martin',
            localisation: 'saint-martin',
            localisationNom: 'Marigot, Saint-Martin',
            prix: 65,
            image: 'antilles.jpg',
            description: 'Studio cosy à deux pas de la plage, parfait pour un couple',
            chambres: 1,
            personnes: 2,
            sallesBain: 1,
            piscine: false,
            rating: 4.4,
            avis: 67,
            populaire: false
        },
        {
            id: 'h6',
            type: 'hebergement',
            nom: 'Villa de Luxe Saint-Barth',
            localisation: 'saint-barthelemy',
            localisationNom: 'Gustavia, Saint-Barthélemy',
            prix: 450,
            image: 'antilles2.jpg',
            description: 'Villa d\'exception avec service de conciergerie et vue panoramique',
            chambres: 6,
            personnes: 12,
            sallesBain: 5,
            piscine: true,
            rating: 5.0,
            avis: 87,
            populaire: true
        }
    ],
    voitures: [
        {
            id: 'v1',
            type: 'voiture',
            nom: 'Audi RS3 Sportback',
            localisation: 'guadeloupe',
            localisationNom: 'Pointe-à-Pitre, Guadeloupe',
            prix: 120,
            image: 'audi-rs3-sportback.jpg',
            description: 'Voiture de sport puissante pour des sensations fortes sur les routes antillaises',
            places: 5,
            transmission: 'Automatique',
            climatisation: true,
            rating: 4.9,
            avis: 45,
            populaire: true
        },
        {
            id: 'v2',
            type: 'voiture',
            nom: 'Renault Clio RS Trophy',
            localisation: 'martinique',
            localisationNom: 'Fort-de-France, Martinique',
            prix: 75,
            image: 'Clio-4-RS-Trophy-1.jpg',
            description: 'Citadine sportive idéale pour explorer l\'île en toute agilité',
            places: 5,
            transmission: 'Manuelle',
            climatisation: true,
            rating: 4.7,
            avis: 78,
            populaire: false
        },
        {
            id: 'v3',
            type: 'voiture',
            nom: 'SUV Familial 7 Places',
            localisation: 'saint-martin',
            localisationNom: 'Grand Case, Saint-Martin',
            prix: 95,
            image: 'audi-rs3-sportback.jpg',
            description: 'Grand SUV confortable pour toute la famille avec climatisation',
            places: 7,
            transmission: 'Automatique',
            climatisation: true,
            rating: 4.6,
            avis: 112,
            populaire: true
        },
        {
            id: 'v4',
            type: 'voiture',
            nom: 'Citadine Économique',
            localisation: 'guadeloupe',
            localisationNom: 'Le Gosier, Guadeloupe',
            prix: 45,
            image: 'Clio-4-RS-Trophy-1.jpg',
            description: 'Petite voiture économique parfaite pour se déplacer en ville',
            places: 4,
            transmission: 'Manuelle',
            climatisation: true,
            rating: 4.3,
            avis: 89,
            populaire: false
        }
    ],
    motos: [
        {
            id: 'm1',
            type: 'moto',
            nom: 'Yamaha MT-07',
            localisation: 'guadeloupe',
            localisationNom: 'Sainte-Anne, Guadeloupe',
            prix: 65,
            image: 'yamaha-mt-07-1.jpg',
            description: 'Moto roadster sportive pour des balades inoubliables en bord de mer',
            cylindree: '689cc',
            permis: 'A2',
            casques: 2,
            rating: 4.8,
            avis: 56,
            populaire: true
        },
        {
            id: 'm2',
            type: 'moto',
            nom: 'Yamaha TMAX 560',
            localisation: 'martinique',
            localisationNom: 'Le Diamant, Martinique',
            prix: 85,
            image: 'yamaha-tmax-560.jpg',
            description: 'Scooter GT haut de gamme pour un maximum de confort et de performances',
            cylindree: '560cc',
            permis: 'A',
            casques: 2,
            rating: 4.9,
            avis: 34,
            populaire: true
        },
        {
            id: 'm3',
            type: 'moto',
            nom: 'Scooter 125cc',
            localisation: 'saint-martin',
            localisationNom: 'Philipsburg, Saint-Martin',
            prix: 35,
            image: 'yamaha-mt-07-1.jpg',
            description: 'Scooter pratique pour se déplacer facilement sur l\'île',
            cylindree: '125cc',
            permis: 'B',
            casques: 2,
            rating: 4.5,
            avis: 92,
            populaire: false
        },
        {
            id: 'm4',
            type: 'moto',
            nom: 'Moto Sportive 600',
            localisation: 'guadeloupe',
            localisationNom: 'Basse-Terre, Guadeloupe',
            prix: 95,
            image: 'yamaha-tmax-560.jpg',
            description: 'Moto sportive pour les amateurs de vitesse et de sensations',
            cylindree: '600cc',
            permis: 'A',
            casques: 2,
            rating: 4.7,
            avis: 41,
            populaire: false
        }
    ]
};

const activitesData = [
    {
        id: 'a1',
        nom: 'Plongée sous-marine',
        localisation: 'Réserve Cousteau, Guadeloupe',
        image: 'antilles.jpg',
        description: 'Explorez les fonds marins exceptionnels de la réserve Cousteau'
    },
    {
        id: 'a2',
        nom: 'Randonnée Volcan',
        localisation: 'La Soufrière, Guadeloupe',
        image: 'antilles2.jpg',
        description: 'Ascension du volcan actif avec guide expérimenté'
    },
    {
        id: 'a3',
        nom: 'Kayak Mangrove',
        localisation: 'Baie de Fort-de-France, Martinique',
        image: 'maison-campagne.png',
        description: 'Découverte de la mangrove en kayak transparent'
    },
    {
        id: 'a4',
        nom: 'Snorkeling',
        localisation: 'Plage de l\'Anse Dufour, Martinique',
        image: 'Louer-a-Paris-2-1030x687.jpg',
        description: 'Nage avec les tortues marines dans une eau cristalline'
    }
];

// ============================================
// GESTION DE L'APPLICATION
// ============================================

class LocAntillesApp {
    constructor() {
        this.favoris = this.loadFavoris();
        this.filtresActifs = {
            type: 'tous',
            prixMin: 0,
            prixMax: 1000,
            localisation: 'toutes'
        };
        this.itemsAffiches = {
            hebergement: 6,
            voiture: 4,
            moto: 4
        };
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupEventListeners();
        this.renderAllListings();
        this.renderActivites();
        this.updateFavorisCount();
        this.renderFavoris();
    }

    setupLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 2000);
        });
    }

    setupEventListeners() {
        // Menu mobile
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const nav = document.querySelector('.main-nav');
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Recherche
        document.getElementById('searchBtn')?.addEventListener('click', () => {
            this.handleSearch();
        });

        // Filtres
        document.getElementById('applyFilters')?.addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('resetFilters')?.addEventListener('click', () => {
            this.resetFilters();
        });

        // Load More buttons
        document.querySelectorAll('.load-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.loadMore(category);
            });
        });

        // Modal
        document.getElementById('modalClose')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('detailsModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'detailsModal') {
                this.closeModal();
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    handleSearch() {
        const location = document.getElementById('searchLocation').value.toLowerCase();
        const dateDebut = document.getElementById('searchDateDebut').value;
        const dateFin = document.getElementById('searchDateFin').value;

        if (!location && !dateDebut && !dateFin) {
            this.showToast('Veuillez remplir au moins un champ de recherche');
            return;
        }

        // Filtrer par localisation si renseignée
        if (location) {
            this.filtresActifs.localisation = this.getLocationFromSearch(location);
            this.applyFilters();
        }

        this.showToast('Recherche effectuée avec succès');
    }

    getLocationFromSearch(searchTerm) {
        const locations = {
            'guadeloupe': 'guadeloupe',
            'martinique': 'martinique',
            'saint-martin': 'saint-martin',
            'saint-barthélemy': 'saint-barthelemy',
            'saint-barth': 'saint-barthelemy'
        };

        for (let [key, value] of Object.entries(locations)) {
            if (searchTerm.includes(key)) {
                return value;
            }
        }
        return 'toutes';
    }

    applyFilters() {
        this.filtresActifs = {
            type: document.getElementById('filterType').value,
            prixMin: parseInt(document.getElementById('filterPrixMin').value) || 0,
            prixMax: parseInt(document.getElementById('filterPrixMax').value) || 10000,
            localisation: document.getElementById('filterLocalisation').value
        };

        this.renderAllListings();
        this.showToast('Filtres appliqués');
    }

    resetFilters() {
        document.getElementById('filterType').value = 'tous';
        document.getElementById('filterPrixMin').value = '';
        document.getElementById('filterPrixMax').value = '';
        document.getElementById('filterLocalisation').value = 'toutes';
        document.getElementById('searchLocation').value = '';

        this.filtresActifs = {
            type: 'tous',
            prixMin: 0,
            prixMax: 10000,
            localisation: 'toutes'
        };

        this.renderAllListings();
        this.showToast('Filtres réinitialisés');
    }

    filterBiens(biens) {
        return biens.filter(bien => {
            const matchType = this.filtresActifs.type === 'tous' || bien.type === this.filtresActifs.type;
            const matchPrix = bien.prix >= this.filtresActifs.prixMin && bien.prix <= this.filtresActifs.prixMax;
            const matchLocation = this.filtresActifs.localisation === 'toutes' || bien.localisation === this.filtresActifs.localisation;
            
            return matchType && matchPrix && matchLocation;
        });
    }

    renderAllListings() {
        // Hébergements
        const hebergementsFiltres = this.filterBiens(biensData.hebergements);
        this.renderListings(hebergementsFiltres, 'hebergementsGrid', 'hebergement');
        
        // Populaires (hébergements avec flag populaire)
        const populaires = biensData.hebergements.filter(h => h.populaire);
        this.renderPopulaires(populaires, 'populairesHebergements');

        // Voitures
        const voituresFiltres = this.filterBiens(biensData.voitures);
        this.renderListings(voituresFiltres, 'voituresGrid', 'voiture');

        // Motos
        const motosFiltres = this.filterBiens(biensData.motos);
        this.renderListings(motosFiltres, 'motosGrid', 'moto');
    }

    renderListings(items, containerId, category) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const limit = this.itemsAffiches[category] || 6;
        const itemsToShow = items.slice(0, limit);

        container.innerHTML = itemsToShow.map(item => this.createListingCard(item)).join('');

        // Ajouter les event listeners
        container.querySelectorAll('.listing-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favoris-btn')) {
                    this.showDetails(card.dataset.id);
                }
            });
        });

        container.querySelectorAll('.favoris-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavori(btn.dataset.id);
            });
        });
    }

    createListingCard(item) {
        const isFavori = this.favoris.includes(item.id);
        const typeIcon = this.getTypeIcon(item.type);
        
        let features = '';
        if (item.type === 'hebergement') {
            features = `
                <div class="listing-features">
                    <div class="feature"><i class="fas fa-bed"></i> ${item.chambres} chambres</div>
                    <div class="feature"><i class="fas fa-users"></i> ${item.personnes} pers.</div>
                    ${item.piscine ? '<div class="feature"><i class="fas fa-swimming-pool"></i> Piscine</div>' : ''}
                </div>
            `;
        } else if (item.type === 'voiture') {
            features = `
                <div class="listing-features">
                    <div class="feature"><i class="fas fa-users"></i> ${item.places} places</div>
                    <div class="feature"><i class="fas fa-cog"></i> ${item.transmission}</div>
                    ${item.climatisation ? '<div class="feature"><i class="fas fa-snowflake"></i> Clim</div>' : ''}
                </div>
            `;
        } else if (item.type === 'moto') {
            features = `
                <div class="listing-features">
                    <div class="feature"><i class="fas fa-tachometer-alt"></i> ${item.cylindree}</div>
                    <div class="feature"><i class="fas fa-id-card"></i> Permis ${item.permis}</div>
                    <div class="feature"><i class="fas fa-hard-hat"></i> ${item.casques} casques</div>
                </div>
            `;
        }

        return `
            <div class="listing-card" data-id="${item.id}">
                <div style="position: relative;">
                    <img src="${item.image}" alt="${item.nom}" class="listing-image">
                    <div class="listing-badge">${typeIcon} ${this.getTypeName(item.type)}</div>
                    <button class="favoris-btn ${isFavori ? 'active' : ''}" data-id="${item.id}">
                        <i class="fa${isFavori ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
                <div class="listing-content">
                    <h3 class="listing-title">${item.nom}</h3>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.localisationNom}</span>
                    </div>
                    <p class="listing-description">${item.description}</p>
                    ${features}
                    <div class="listing-footer">
                        <div class="listing-price">
                            ${item.prix}€ <span>/jour</span>
                        </div>
                        <div class="listing-rating">
                            <div class="stars">
                                ${this.renderStars(item.rating)}
                            </div>
                            <span class="rating-value">${item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPopulaires(items, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = items.slice(0, 3).map(item => `
            <div class="populaire-card" data-id="${item.id}">
                <img src="${item.image}" alt="${item.nom}" class="populaire-image">
                <button class="favoris-btn ${this.favoris.includes(item.id) ? 'active' : ''}" data-id="${item.id}">
                    <i class="fa${this.favoris.includes(item.id) ? 's' : 'r'} fa-heart"></i>
                </button>
                <div class="populaire-content">
                    <div>
                        <h3 class="listing-title">${item.nom}</h3>
                        <div class="listing-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${item.localisationNom}</span>
                        </div>
                    </div>
                    <div class="listing-footer">
                        <div class="listing-price">
                            ${item.prix}€ <span>/jour</span>
                        </div>
                        <div class="listing-rating">
                            <div class="stars">
                                ${this.renderStars(item.rating)}
                            </div>
                            <span class="rating-value">${item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Event listeners
        container.querySelectorAll('.populaire-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favoris-btn')) {
                    this.showDetails(card.dataset.id);
                }
            });
        });

        container.querySelectorAll('.favoris-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavori(btn.dataset.id);
            });
        });
    }

    renderActivites() {
        const container = document.getElementById('activitesGrid');
        if (!container) return;

        container.innerHTML = activitesData.map(activite => `
            <div class="activite-card">
                <img src="${activite.image}" alt="${activite.nom}" class="activite-image">
                <div class="activite-content">
                    <h3 class="activite-title">${activite.nom}</h3>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${activite.localisation}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    getTypeIcon(type) {
        const icons = {
            'hebergement': '<i class="fas fa-home"></i>',
            'voiture': '<i class="fas fa-car"></i>',
            'moto': '<i class="fas fa-motorcycle"></i>'
        };
        return icons[type] || '';
    }

    getTypeName(type) {
        const names = {
            'hebergement': 'Hébergement',
            'voiture': 'Voiture',
            'moto': 'Moto'
        };
        return names[type] || '';
    }

    showDetails(id) {
        const allItems = [
            ...biensData.hebergements,
            ...biensData.voitures,
            ...biensData.motos
        ];
        const item = allItems.find(i => i.id === id);
        
        if (!item) return;

        const isFavori = this.favoris.includes(item.id);
        
        let details = '';
        if (item.type === 'hebergement') {
            details = `
                <div class="modal-details">
                    <p><i class="fas fa-bed"></i> <strong>${item.chambres}</strong> chambres</p>
                    <p><i class="fas fa-users"></i> Capacité: <strong>${item.personnes}</strong> personnes</p>
                    <p><i class="fas fa-bath"></i> <strong>${item.sallesBain}</strong> salles de bain</p>
                    ${item.piscine ? '<p><i class="fas fa-swimming-pool"></i> Piscine privée</p>' : ''}
                </div>
            `;
        } else if (item.type === 'voiture') {
            details = `
                <div class="modal-details">
                    <p><i class="fas fa-users"></i> <strong>${item.places}</strong> places</p>
                    <p><i class="fas fa-cog"></i> Transmission: <strong>${item.transmission}</strong></p>
                    ${item.climatisation ? '<p><i class="fas fa-snowflake"></i> Climatisation</p>' : ''}
                </div>
            `;
        } else if (item.type === 'moto') {
            details = `
                <div class="modal-details">
                    <p><i class="fas fa-tachometer-alt"></i> Cylindrée: <strong>${item.cylindree}</strong></p>
                    <p><i class="fas fa-id-card"></i> Permis requis: <strong>${item.permis}</strong></p>
                    <p><i class="fas fa-hard-hat"></i> <strong>${item.casques}</strong> casques fournis</p>
                </div>
            `;
        }

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <img src="${item.image}" alt="${item.nom}" class="modal-image">
            <div class="modal-body">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                    <div>
                        <h2>${item.nom}</h2>
                        <div class="listing-location" style="font-size: 16px; margin-top: 10px;">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${item.localisationNom}</span>
                        </div>
                    </div>
                    <button class="favoris-btn ${isFavori ? 'active' : ''}" data-id="${item.id}" style="position: static;">
                        <i class="fa${isFavori ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
                
                <div class="listing-rating" style="margin-bottom: 20px;">
                    <div class="stars">
                        ${this.renderStars(item.rating)}
                    </div>
                    <span class="rating-value">${item.rating}</span>
                    <span style="color: #666; margin-left: 10px;">(${item.avis} avis)</span>
                </div>

                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 25px;">${item.description}</p>

                ${details}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f5f5f5;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="listing-price" style="font-size: 32px;">
                            ${item.prix}€ <span style="font-size: 18px;">/jour</span>
                        </div>
                        <button class="search-btn" style="padding: 15px 40px;">
                            <i class="fas fa-calendar-check"></i> Réserver
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Event listener pour le bouton favoris du modal
        modalBody.querySelector('.favoris-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavori(item.id);
            // Mettre à jour le bouton dans le modal
            const btn = e.currentTarget;
            const isNowFavori = this.favoris.includes(item.id);
            btn.classList.toggle('active', isNowFavori);
            btn.querySelector('i').className = `fa${isNowFavori ? 's' : 'r'} fa-heart`;
        });

        document.getElementById('detailsModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('detailsModal').classList.remove('active');
    }

    toggleFavori(id) {
        const index = this.favoris.indexOf(id);
        
        if (index > -1) {
            this.favoris.splice(index, 1);
            this.showToast('Retiré des favoris');
        } else {
            this.favoris.push(id);
            this.showToast('Ajouté aux favoris');
        }

        this.saveFavoris();
        this.updateFavorisCount();
        this.renderAllListings();
        this.renderFavoris();
    }

    renderFavoris() {
        const container = document.getElementById('favorisGrid');
        const message = document.getElementById('favorisMessage');
        
        if (!container) return;

        if (this.favoris.length === 0) {
            container.innerHTML = '';
            message.textContent = 'Vous n\'avez pas encore de favoris';
            return;
        }

        message.textContent = `Vous avez ${this.favoris.length} favori${this.favoris.length > 1 ? 's' : ''}`;

        const allItems = [
            ...biensData.hebergements,
            ...biensData.voitures,
            ...biensData.motos
        ];

        const favorisItems = allItems.filter(item => this.favoris.includes(item.id));

        container.innerHTML = favorisItems.map(item => this.createListingCard(item)).join('');

        // Event listeners
        container.querySelectorAll('.listing-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favoris-btn')) {
                    this.showDetails(card.dataset.id);
                }
            });
        });

        container.querySelectorAll('.favoris-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavori(btn.dataset.id);
            });
        });
    }

    loadMore(category) {
        this.itemsAffiches[category] += 6;
        this.renderAllListings();
    }

    updateFavorisCount() {
        const countElement = document.getElementById('favorisCount');
        if (countElement) {
            countElement.textContent = this.favoris.length;
        }
    }

    loadFavoris() {
        const saved = localStorage.getItem('locantilles_favoris');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavoris() {
        localStorage.setItem('locantilles_favoris', JSON.stringify(this.favoris));
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new LocAntillesApp();
});
