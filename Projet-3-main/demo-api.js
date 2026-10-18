// ============================================
// API DE DÉMONSTRATION
// ============================================
// Le projet d'origine appelle un back-end Node.js sur http://localhost:5678,
// qui n'existe que sur la machine de développement. Pour que la version en ligne
// fonctionne, ce fichier intercepte ces appels et y répond depuis le navigateur.
// Les ajouts et suppressions sont conservés dans le localStorage du visiteur.
(function () {
    const API = 'http://localhost:5678/api';
    const STORAGE_KEY = 'demo-works';
    const DEMO_EMAIL = 'sophie.bluel@test.tld';
    const DEMO_PASSWORD = 'S0phie';
    const IMG = './assets/images/';

    const categories = [
        { id: 1, name: 'Objets' },
        { id: 2, name: 'Appartements' },
        { id: 3, name: 'Hotels & restaurants' }
    ];

    const defaultWorks = [
        { id: 1, title: 'Abajour Tahina', imageUrl: IMG + 'abajour-tahina.png', categoryId: 1 },
        { id: 2, title: 'Appartement Paris V', imageUrl: IMG + 'appartement-paris-v.png', categoryId: 2 },
        { id: 3, title: 'Restaurant Sushisen - Londres', imageUrl: IMG + 'restaurant-sushisen-londres.png', categoryId: 3 },
        { id: 4, title: 'Villa “La Balisiere” - Port-Louis', imageUrl: IMG + 'la-balisiere.png', categoryId: 2 },
        { id: 5, title: 'Structures Thermopolis', imageUrl: IMG + 'structures-thermopolis.png', categoryId: 1 },
        { id: 6, title: 'Appartement Paris X', imageUrl: IMG + 'appartement-paris-x.png', categoryId: 2 },
        { id: 7, title: 'Pavillon “Le coteau” - Cassis', imageUrl: IMG + 'le-coteau-cassis.png', categoryId: 2 },
        { id: 8, title: 'Villa Ferneze - Isola d’Elba', imageUrl: IMG + 'villa-ferneze.png', categoryId: 2 },
        { id: 9, title: 'Appartement Paris XVIII', imageUrl: IMG + 'appartement-paris-xviii.png', categoryId: 2 },
        { id: 10, title: 'Bar “Lullaby” - Paris', imageUrl: IMG + 'bar-lullaby-paris.png', categoryId: 3 },
        { id: 11, title: 'Hotel First Arte - New Delhi', imageUrl: IMG + 'hotel-first-arte-new-delhi.png', categoryId: 3 }
    ];

    function loadWorks() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (Array.isArray(saved)) return saved;
        } catch (e) {}
        return defaultWorks.slice();
    }

    function saveWorks(works) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
            return true;
        } catch (e) {
            // Quota dépassé (image trop lourde) : la modification reste en mémoire
            return false;
        }
    }

    function reply(status, body) {
        return Promise.resolve(new Response(body === undefined ? null : JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    function isAuthorized(options) {
        const headers = new Headers(options.headers || {});
        return headers.get('Authorization') === 'Bearer ' + localStorage.getItem('jeton');
    }

    function readFile(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    let works = loadWorks();
    const realFetch = window.fetch.bind(window);

    window.fetch = function (input, options = {}) {
        const url = typeof input === 'string' ? input : input.url;
        if (!url.startsWith(API)) return realFetch(input, options);

        const path = url.slice(API.length);
        const method = (options.method || 'GET').toUpperCase();

        if (method === 'GET' && path === '/works') return reply(200, works);
        if (method === 'GET' && path === '/categories') return reply(200, categories);

        if (method === 'POST' && path === '/users/login') {
            const { email, password } = JSON.parse(options.body || '{}');
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                return reply(200, { userId: 1, token: 'demo-' + Date.now() });
            }
            return reply(401, { message: 'Identifiants incorrects' });
        }

        if (method === 'DELETE' && path.startsWith('/works/')) {
            if (!isAuthorized(options)) return reply(401, { message: 'Non autorisé' });
            const id = Number(path.split('/')[2]);
            works = works.filter(work => work.id !== id);
            saveWorks(works);
            return reply(200, {});
        }

        if (method === 'POST' && path === '/works') {
            if (!isAuthorized(options)) return reply(401, { message: 'Non autorisé' });
            const data = options.body;
            return readFile(data.get('image')).then(imageUrl => {
                const work = {
                    id: works.reduce((max, w) => Math.max(max, w.id), 0) + 1,
                    title: data.get('title'),
                    imageUrl: imageUrl,
                    categoryId: Number(data.get('category'))
                };
                works.push(work);
                saveWorks(works);
                return reply(201, work);
            });
        }

        return reply(404, { message: 'Route inconnue' });
    };
})();
