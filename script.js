document.addEventListener("DOMContentLoaded", function () {
   // ==========================================
    // 1. NAVBAR LOADING & ACTIVE LINK HIGHLIGHT
    // ==========================================
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            const navContainer = document.getElementById("navbar-container");
            if (navContainer) {
                navContainer.innerHTML = data;
                highlightActiveLink();
                initNavbarScroll(); 
                
                if (typeof initSearchEngine === "function") initSearchEngine();
            }
        })
        .catch(error => console.error("Error loading the navbar:", error));

    function highlightActiveLink() {
        const path = window.location.pathname;
        const page = path.split("/").pop();

        const links = document.querySelectorAll(".nav-links a");
        links.forEach(link => link.classList.remove("active"));

        if (page === "" || page === "index.html") {
            document.getElementById("nav-home")?.classList.add("active");
        } else if (page === "movies.html") {
            document.getElementById("nav-movies")?.classList.add("active");
        } else if (page === "tvshows.html") {
            document.getElementById("nav-tvshows")?.classList.add("active");
        } else if (page === "mylist.html") {
            document.getElementById("nav-mylist")?.classList.add("active");
        }
    }

    function initNavbarScroll() {
        const navbar = document.querySelector(".navbar");
        const page = window.location.pathname.split("/").pop();

        if (page === "mylist.html") {
            navbar?.classList.add("scrolled");
            return;
        }

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar?.classList.add("scrolled");
            } else {
                navbar?.classList.remove("scrolled");
            }
        });
    }

    // ==========================================
    // 2. HERO SLIDER AUTO-PLAY 
    // ==========================================
   
    const slides = document.querySelectorAll(".hero-slider .slide");
    const indicators = document.querySelectorAll(".hero-slider .slider-indicators .indicator, .slider-indicators span");
    let currentSlide = 0;
    const slideInterval = 3000; 

    if (slides.length > 0) {
        function nextSlide() {
            
            if (slides[currentSlide]) slides[currentSlide].classList.remove("active");
            if (indicators[currentSlide]) indicators[currentSlide].classList.remove("active");

            currentSlide = (currentSlide + 1) % slides.length;

            if (slides[currentSlide]) slides[currentSlide].classList.add("active");
            if (indicators[currentSlide]) indicators[currentSlide].classList.add("active");
        }
        setInterval(nextSlide, slideInterval);
    }

    // ==========================================
    // 3. MULTI-ROW DYNAMIC SCROLL LOGIC
    // ==========================================
    document.querySelectorAll('.movies-wrapper').forEach(wrapper => {
        const container = wrapper.querySelector('.movies-container');
        const prevBtn = wrapper.querySelector('.prev-btn');
        const nextBtn = wrapper.querySelector('.next-btn');

        if (container && prevBtn && nextBtn) {
            const scrollAmount = 600;
            nextBtn.addEventListener("click", () => container.scrollLeft += scrollAmount);
            prevBtn.addEventListener("click", () => container.scrollLeft -= scrollAmount);
        }
    });


    // ==========================================
    // 4. MOVIES DATA ENGINE & DATABASE
    // ==========================================
    window.moviesDatabase = {
    
        "Inception": {
            id: "YoHD9XEInc0", year: "2010", duration: "2h 28m", rating: "8.8",
            genres: ["Adventure", "Sci-Fi", "Thriller"],
            cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
            desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
        },
        "The Dark Knight": {
            id: "EXeTwQWrcwY", year: "2008", duration: "2h 32m", rating: "9.0",
            genres: ["Action", "Crime", "Drama"],
            cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
            desc: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice."
        },
        "Interstellar": {
            id: "zSWdZVtXT7E", year: "2014", duration: "2h 49m", rating: "8.7",
            genres: ["Adventure", "Drama", "Sci-Fi"],
            cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
            desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a new planet."
        },
        "Avengers: Endgame": {
            id: "TcMBFSGVi1c", year: "2019", duration: "3h 1m", rating: "8.4",
            genres: ["Action", "Adventure", "Sci-Fi"],
            cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
            desc: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more."
        },
        "Oppenheimer": {
            id: "uYPbbksJxIg", year: "2023", duration: "3h 0m", rating: "8.3",
            genres: ["Biography", "Drama", "History"],
            cast: "Cillian Murphy, Emily Blunt, Matt Damon",
            desc: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II."
        },
        "Dune: Part Two": {
            id: "Way9Dexny3w", year: "2024", duration: "2h 46m", rating: "8.6",
            genres: ["Action", "Adventure", "Sci-Fi"],
            cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
            desc: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
        },
        "Stranger Things": {
            id: "b9EkMc79ZSU", year: "2016", duration: "5 Seasons", rating: "8.7",
            genres: ["Drama", "Fantasy", "Horror"],
            cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
            desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
        },
        "Spider-Man: No Way Home": {
            id: "JfVOs4VSpmA", year: "2021", duration: "2h 28m", rating: "8.1",
            genres: ["Animation", "Action", "Adventure"],
            cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
            desc: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
        },
        "Blade Runner 2049": {
            id: "gCcx85zbxz4", year: "2017", duration: "2h 43m", rating: "8.7",
            genres: ["Action", "Drama", "Sci-Fi"],
            cast: "Ryan Gosling, Harrison Ford, Ana de Armas",
            desc: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos."
        },
        "Kalki 2898 AD": {
            id: "kQDd1AhGIHk", year: "2024", duration: "3h 1m", rating: "8.3",
            genres: ["Action", "Sci-Fi"],
            cast: "Prabhas, Amitabh Bachchan, Kamal Haasan",
            desc: "A modern avatar of Vishnu, a god, descends to earth to protect the world from evil forces."
        },
        "Avatar: The Way of Water": {
            id: "d9MyW72ELq0", 
            year: "2022", 
            duration: "3h 12m", 
            rating: "8.8",
            genres: ["Action", "Sci-Fi", "Adventure"],
            cast: "Sam Worthington, Zoe Saldaña, Sigourney Weaver",
            desc: "Jake Sully and Neytiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans." // FIX: Cleaned dot syntax
        },
        "3 Idiots": {
             id: "K0eDlFX9GMc", year: "2009", duration: "2h 50m", rating: "8.4",
             genres: ["Comedy", "Drama"],
             cast: "Aamir Khan, Madhavan, Sharman Joshi, Kareena Kapoor",
             desc: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them idiots."
        },
        "Dangal": {
    id: "x_7YlGv9u1g", year: "2016", duration: "2h 41m", rating: "8.3",
    genres: ["Action", "Biography", "Drama"],
    cast: "Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh, Sanya Malhotra",
    desc: "Mahavir Singh Phogat, a former amateur wrestler, decides to fulfill his dream of winning a gold medal for his country by training his daughters, Geeta and Babita, for the Commonwealth Games despite societal stigmas."
},
"RRR": {
    id: "NgBoMJy386M", 
    year: "2022", duration: "3h 2m", rating: "7.8",
    genres: ["Action", "Drama"],
    cast: "NTR Jr., Ram Charan, Ajay Devgn, Alia Bhatt",
    desc: "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in this epic saga set in pre-independent India."
},
"Pathaan": {
    id: "vqu4z34wENw", 
    year: "2023", duration: "2h 26m", rating: "5.9",
    genres: ["Action", "Thriller"],
    cast: "Shah Rukh Khan, Deepika Padukone, John Abraham",
    desc: "An Indian spy takes on the leader of a group of mercenaries who have a heinous plot of a weaponized virus attack against the country."
},
"Jawan": {
    id: "MWOlnZSnXJo", 
    year: "2023", duration: "2h 48m", rating: "7.0",
    genres: ["Action", "Thriller"],
    cast: "Shah Rukh Khan, Nayanthara, Vijay Sethupathi",
    desc: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society."
},
"Gangubai Kathiawadi": {
    id: "N1ZwRv3vJJY", 
    year: "2022", duration: "2h 32m", rating: "7.0",
    genres: ["Biography", "Crime", "Drama"],
    cast: "Alia Bhatt, Shantanu Maheshwari, Ajay Devgn",
    desc: "Dupe-tricked and sold to a brothel, a young woman seamlessly reclaims her power, using underworld connections to rule the territory she was once a captive of."
},
"Fighter": {
    id: "6amIq_mP4xM", 
    year: "2024", duration: "2h 46m", rating: "6.9",
    genres: ["Action", "Thriller"],
    cast: "Hrithik Roshan, Deepika Padukone, Anil Kapoor",
    desc: "Top IAF aviators come together in the face of imminent danger to form Air Dragons, realizing brotherhood and fighting the battles within and without."
},
"O'Romeo": {
    id: "2M4hKmuBzUU", 
    year: "2024", duration: "2h 15m", rating: "7.5",
    genres: ["Romance", "Drama"],
    cast: "Trending Cast",
    desc: "A modern-day adaptation of classical romance, testing the boundaries of love and family ties in a fast-paced urban setting."
},
"12th Fail": {
    id: "KjbtuqENvVE", 
    year: "2023", duration: "2h 27m", rating: "8.9",
    genres: ["Biography", "Drama"],
    cast: "Vikrant Massey, Medha Shankar, Anant V Joshi",
    desc: "The real-life story of IPS Officer Manoj Kumar Sharma and IRS Officer Shraddha Joshi, showcasing their struggles and how millions of students restart their journeys."
},
"Dhurandhar": {
    id: "Pb2KJlBGids", 
    year: "2025", duration: "2h 30m", rating: "8.0",
    genres: ["Action", "Drama"],
    cast: "Ensemble Cast",
    desc: "An intense cinematic tale of grit, power, and determination tracing the rise of a powerful figure fighting structural injustice."
},
"Breaking Bad": {
    id: "HhesaQXLuRY", year: "2008", duration: "5 Seasons", rating: "9.5",
    genres: ["Crime", "Drama", "Thriller"],
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
    desc: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future."
},
"Money Heist": {
    id: "LZKVeYRT7Dk", year: "2017", duration: "5 Seasons", rating: "8.2",
    genres: ["Action", "Crime", "Drama"],
    cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño",
    desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain."
},
"The Witcher": {
    id: "ndl1W4ltcmg", year: "2019", duration: "3 Seasons", rating: "8.4",
    genres: ["Action", "Adventure", "Fantasy"],
    cast: "Henry Cavill, Freya Allan, Anya Chalotra",
    desc: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts."
},
"The Family Man": {
    id: "XatRGut65VI", year: "2019", duration: "3 Seasons", rating: "8.7",
    genres: ["Action", "Comedy", "Drama"],
    cast: "Manoj Bajpayee, Sharib Hashmi, Priyamani",
    desc: "A middle-class man secretly working for a special cell of the National Investigation Agency must protect the nation from terrorism while keeping his family safe from his dangerous job."
},
"Mirzapur": {
    id: "ZNeGF-PvRHY", year: "2018", duration: "3 Seasons", rating: "8.5",
    genres: ["Action", "Crime", "Drama"],
    cast: "Pankaj Tripathi, Ali Fazal, Divyenndu",
    desc: "A shocking incident at a wedding procession ignites a series of events running lawlessness into the lives of two families in the lawless city of Mirzapur."
},
"Peaky Blinders": {
    id: "oVzVdvGIC7U", year: "2013", duration: "6 Seasons", rating: "8.8",
    genres: ["Crime", "Drama"],
    cast: "Cillian Murphy, Paul Anderson, Helen McCrory",
    desc: "A notorious gangster family in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost."
},
"The Mandalorian": {
    id: "aOC8E8z_ifw", year: "2019", duration: "3 Seasons", rating: "8.7",
    genres: ["Action", "Adventure", "Fantasy"],
    cast: "Pedro Pascal, Chris Bartlett, Katee Sackhoff",
    desc: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic after the fall of the Galactic Empire."
},
"Scam 1992": {
    id: "ISORfez27og", year: "2020", duration: "1 Season", rating: "9.3",
    genres: ["Biography", "Crime", "Drama"],
    cast: "Pratik Gandhi, Shreya Dhanwanthary, Hemant Kher",
    desc: "Set in 1980s and 90s Bombay, the series follows the spectacular rise and catastrophic fall of Harshad Mehta, the flamboyant stockbroker who took the stock market to dizzying heights."
},
"Game of Thrones": {
    id: "KPLWWIOCOOQ", year: "2011", duration: "8 Seasons", rating: "9.2",
    genres: ["Action", "Adventure", "Drama"],
    cast: "Emilia Clarke, Kit Harington, Peter Dinklage",
    desc: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia."
},
"Off Campus": {
    id: "4Vin2GSA4V0", year: "2024", duration: "1 Season", rating: "7.4",
    genres: ["Comedy", "Romance"],
    cast: "Trending Cast",
    desc: "A lively youth drama centering around college students navigating hockey, relationships, academic pressure, and life in their off-campus housing."
},
"Wednesday": {
    id: "Di310WS8zLk", year: "2022", duration: "1 Season", rating: "8.1",
    genres: ["Comedy", "Crime", "Fantasy"],
    cast: "Jenna Ortega, Hunter Doohan, Percy Hynes White",
    desc: "Follows Wednesday Addams' years as a student at Nevermore Academy, as she attempts to master her emerging psychic ability and solve a monster mystery."
},
"Alice in Borderland": {
    id: "49_44FFKZ1M", year: "2020", duration: "3 Seasons", rating: "8.0",
    genres: ["Action", "Mystery", "Sci-Fi"],
    cast: "Kento Yamazaki, Tao Tsuchiya, Nijiro Murakami",
    desc: "An obsessed gamer and his friends find themselves in a parallel universe of Tokyo, where they are forced to compete in sadistic games to survive."
},
"All of Us Are Dead": {
    id: "IN5TD4VRcSM", year: "2022", duration: "1 Season", rating: "7.5",
    genres: ["Action", "Drama", "Horror"],
    cast: "Park Ji-hu, Yoon Chan-young, Cho Yi-hyun",
    desc: "A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn into one of the rabid infected."
},
"From": {
    id: "tFMo3UJ4B4g", year: "2022", duration: "4 Seasons", rating: "7.9",
    genres: ["Drama", "Horror", "Mystery"],
    cast: "Harold Perrineau, Catalina Sandino Moreno, Eion Bailey",
    desc: "Unravel the mystery of a nightmarish town in middle America that traps all those who enter. As the unwilling residents fight to keep a sense of normalcy, they must also survive the threats of the surrounding forest."
},
"Mad Max: Fury Road": {
    id: "hEJnMQG9ev8", year: "2015", duration: "2h 0m", rating: "8.2",
    genres: ["Action", "Adventure", "Sci-Fi"],
    cast: "Tom Hardy, Charlize Theron, Nicholas Hoult",
    desc: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max."
},
"John Wick": {
    id: "C0BMx-qxsP4", year: "2014", duration: "1h 41m", rating: "7.4",
    genres: ["Action", "Crime", "Thriller"],
    cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
    desc: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him."
},
"Mission: Impossible - Fallout": {
    id: "wb49-oV0F78", year: "2018", duration: "2h 27m", rating: "8.7",
    genres: ["Action", "Adventure", "Thriller"],
    cast: "Tom Cruise, Henry Cavill, Ving Rhames",
    desc: "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission goes wrong."
},
"Tenet": {
    id: "AZGcmvrTX9M", year: "2020", duration: "2h 30m", rating: "8.8",
    genres: ["Action", "Sci-Fi", "Thriller"],
    cast: "John David Washington, Robert Pattinson, Elizabeth Debicki",
    desc: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time."
},
"Arrival": {
    id: "AMgy7SgS_D8", year: "2016", duration: "1h 56m", rating: "7.9",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    cast: "Amy Adams, Jeremy Renner, Forest Whitaker",
    desc: "A linguist works with the military to communicate with alien lifecorms after twelve mysterious spacecraft appear around the world."
}
    };

    const tModal = document.getElementById("trailer-modal");
    const tIframe = document.getElementById("trailer-video");
    const dModal = document.getElementById("details-modal");
    let currentOpenMovie = ""; 

    function getListData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function toggleListData(key, movieName) {
        let list = getListData(key);
        if (list.includes(movieName)) {
            list = list.filter(item => item !== movieName);
            localStorage.setItem(key, JSON.stringify(list));
            return false; 
        } else {
            list.push(movieName);
            localStorage.setItem(key, JSON.stringify(list));
            return true; 
        }
    }
function openDetailsModal(title, clickedCardImgSrc) {
    window.openDetailsModal = openDetailsModal;  
    
    const detailsModalEl = document.getElementById("details-modal");
    const db = window.moviesDatabase || moviesDatabase;
    
    const data = db ? db[title] : null;
    if (!data || !detailsModalEl) return;

    currentOpenMovie = title;
    
    // Data populate safely checking DOM elements
    if (document.getElementById("modal-movie-title")) document.getElementById("modal-movie-title").textContent = title;
    if (document.getElementById("modal-movie-rating")) document.getElementById("modal-movie-rating").textContent = data.rating;
    if (document.getElementById("modal-movie-year")) document.getElementById("modal-movie-year").textContent = data.year;
    if (document.getElementById("modal-movie-duration")) document.getElementById("modal-movie-duration").textContent = data.duration;
    if (document.getElementById("modal-movie-desc")) document.getElementById("modal-movie-desc").textContent = data.desc;
    if (document.getElementById("modal-movie-cast")) document.getElementById("modal-movie-cast").textContent = data.cast;
    
    if (clickedCardImgSrc && document.getElementById("modal-movie-img")) {
        document.getElementById("modal-movie-img").src = clickedCardImgSrc;
    }

    // Dynamic Genres Tags Render Engine
    const genreContainer = document.getElementById("modal-movie-genres");
    if (genreContainer && data.genres) {
        genreContainer.innerHTML = "";
        data.genres.forEach(g => {
            genreContainer.innerHTML += `<span class="genre-tag">${g}</span>`;
        });
    }

    // Watchlist & Like States Check for inner buttons
    const watchlist = typeof getListData === 'function' ? getListData("watchlist") : [];
    const likedList = typeof getListData === 'function' ? getListData("liked") : [];
    const wlBtn = document.querySelector(".btn-watchlist");
    const lkBtn = document.querySelector(".btn-like");

    if (wlBtn) {
        if (watchlist.includes(title)) {
            wlBtn.innerHTML = `<i class="fa-solid fa-check"></i> In Watchlist`;
            wlBtn.classList.add("active-watchlist");
        } else {
            wlBtn.innerHTML = `<i class="fa-solid fa-plus"></i> In Watchlist`;
            wlBtn.classList.remove("active-watchlist");
        }
    }

    if (lkBtn) {
        if (likedList.includes(title)) {
            lkBtn.innerHTML = `<i class="fa-solid fa-heart-circle-check"></i> Liked`;
            lkBtn.classList.add("active-liked");
        } else {
            lkBtn.innerHTML = `<i class="fa-solid fa-heart"></i> Liked`;
            lkBtn.classList.remove("active-liked");
        }
    }

    // Safe Star Rating triggers execution
    if (typeof resetStars === 'function') resetStars();
    const savedRating = localStorage.getItem(`rating_${title}`);
    if (savedRating && typeof applyStarUI === 'function') {
        applyStarUI(savedRating);
    }

    //  MODAL TO-SHOW ROUTER
    detailsModalEl.classList.add("open");
}
    // Home Page Card Listeners
    document.querySelectorAll(".movie-card").forEach(card => {
        const title = card.querySelector(".card-title")?.textContent.trim();
        const cardImgSrc = card.querySelector(".card-img")?.getAttribute("src");
        
        card.addEventListener("click", () => openDetailsModal(title, cardImgSrc));

        const playBtn = card.querySelector(".fa-play")?.parentElement;
        if(playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation(); 
                playTrailerVideo(moviesDatabase[title]?.id);
            });
        }

        const wlBtn = card.querySelector(".fa-plus, .fa-check")?.parentElement;
        if(wlBtn) {
            if (getListData("watchlist").includes(title)) {
                wlBtn.style.color = "#ff0000";
                wlBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
            }
            
            wlBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isAdded = toggleListData("watchlist", title);
                wlBtn.style.color = isAdded ? "#ff0000" : "#fff";
                wlBtn.innerHTML = isAdded ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-plus"></i>`;
            });
        }

        const likeBtn = card.querySelector(".fa-heart")?.parentElement;
        if(likeBtn) {
            if (getListData("liked").includes(title)) likeBtn.style.color = "#ff0000";

            likeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isLiked = toggleListData("liked", title);
                likeBtn.style.color = isLiked ? "#ff0000" : "#fff";
            });
        }

        const infoBtn = card.querySelector(".fa-info")?.parentElement;
        if(infoBtn) {
            infoBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openDetailsModal(title, cardImgSrc);
            });
        }
    });
// ==========================================================================
    // 🎛️ 6. UNIVERSAL TRAILER CONTROLLER & CLOSING ENGINE 
    // ==========================================================================

    window.playTrailerVideo = playTrailerVideo;

    function playTrailerVideo(id) {
        const trailerModalEl = document.getElementById("trailer-modal");
        const trailerIframeEl = document.getElementById("trailer-video");
        
        if (!id || !trailerModalEl || !trailerIframeEl) return;
        
        // 1. YouTube link loaded inside standard sandboxed parameters
        trailerIframeEl.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`;
        
        // 2. Modal frame visible class triggered
        trailerModalEl.classList.add("open");

        const closeBtn = trailerModalEl.querySelector(".modal-close-btn");
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                if(e) e.stopPropagation();
                trailerModalEl.classList.remove("open"); 
                trailerIframeEl.src = ""; 
            };
        }
    }

    // Close buttons aur outside click ko global level par handle karenge 
    document.addEventListener("click", function (e) {
        const trailerModalEl = document.getElementById("trailer-modal");
        const trailerIframeEl = document.getElementById("trailer-video");
        const detailsModalEl = document.getElementById("details-modal");

       
        if (e.target.closest(".modal-close-btn") || e.target === trailerModalEl) {
            if (trailerModalEl) trailerModalEl.classList.remove("open");
            if (trailerIframeEl) trailerIframeEl.src = "";
        }

        //  Details modal target cross text matching fixed
        if (e.target.closest(".details-close-btn") || e.target === detailsModalEl) {
            if (detailsModalEl) detailsModalEl.classList.remove("open");
        }
    });

    // Details Modal ke andar ka "Play Trailer" bada button handle karne ke liye
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("details-btn-play") || e.target.closest(".details-btn-play")) {
            if (typeof currentOpenMovie !== 'undefined' && currentOpenMovie) {
                const db = window.moviesDatabase || moviesDatabase;
                const mId = db[currentOpenMovie]?.id;
                if (mId && typeof window.playTrailerVideo === 'function') {
                    window.playTrailerVideo(mId);
                }
            }
        }
    });

    document.querySelector(".btn-watchlist")?.addEventListener("click", function() {
        if(typeof currentOpenMovie === 'undefined' || !currentOpenMovie) return;
        const isAdded = toggleListData("watchlist", currentOpenMovie);
        this.classList.toggle("active-watchlist", isAdded);
        this.innerHTML = isAdded ? `<i class="fa-solid fa-check"></i> In Watchlist` : `<i class="fa-solid fa-plus"></i> In Watchlist`;
        
        document.querySelectorAll(".movie-card").forEach(card => {
            if(card.querySelector(".card-title")?.textContent.trim() === currentOpenMovie) {
                const wlBtn = card.querySelector(".fa-plus, .fa-check")?.parentElement;
                if(wlBtn) {
                    wlBtn.style.color = isAdded ? "#ff0000" : "#fff";
                    wlBtn.innerHTML = isAdded ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-plus"></i>`;
                }
            }
        });
    });

    document.querySelector(".btn-like")?.addEventListener("click", function() {
        if(typeof currentOpenMovie === 'undefined' || !currentOpenMovie) return;
        const isLiked = toggleListData("liked", currentOpenMovie);
        this.classList.toggle("active-liked", isLiked);
        this.innerHTML = isLiked ? `<i class="fa-solid fa-heart-circle-check"></i> Liked` : `<i class="fa-solid fa-heart"></i> Liked`;
        
        document.querySelectorAll(".movie-card").forEach(card => {
            if(card.querySelector(".card-title")?.textContent.trim() === currentOpenMovie) {
                const likeBtn = card.querySelector(".fa-heart")?.parentElement;
                if(likeBtn) likeBtn.style.color = isLiked ? "#ff0000" : "#fff";
            }
        });
    });

    const stars = document.querySelectorAll(".stars-row i");
    stars.forEach(star => {
        star.addEventListener("click", function() {
            if(typeof currentOpenMovie === 'undefined' || !currentOpenMovie) return;
            const val = this.getAttribute("data-value");
            localStorage.setItem(`rating_${currentOpenMovie}`, val);
            resetStars();
            applyStarUI(val);
        });
    });

    function resetStars() {
        stars.forEach(s => { s.classList.remove("fa-solid", "active"); s.classList.add("fa-regular"); });
        const statusText = document.querySelector(".rating-status");
        if (statusText) statusText.textContent = "Not rated";
    }

    function applyStarUI(value) {
        for(let i=0; i<value; i++) {
            if(stars[i]) {
                stars[i].classList.remove("fa-regular");
                stars[i].classList.add("fa-solid", "active");
            }
        }
        const statusText = document.querySelector(".rating-status");
        if (statusText) statusText.textContent = `Rated ${value}/5`;
    }

   // ==========================================
    // 5. SMART HERO BANNER BUTTONS LINK ENGINE 
    // ==========================================
    
    // 1. Saari slides ke Play Buttons handle karne ke liye
    const heroPlayButtons = document.querySelectorAll(".hero-buttons .play-btn");
    if (heroPlayButtons.length > 0) {
        heroPlayButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation(); 
                e.preventDefault(); 
                
                const parentSlide = this.closest(".slide");
                const movieTitle = parentSlide?.getAttribute("data-movie");
                
                if (movieTitle) {
                    const db = window.moviesDatabase || moviesDatabase;
                    const movieData = db ? db[movieTitle] : null;
                    
                    // Directly calling window layer function
                    if (movieData && movieData.id) {
                        if (typeof window.playTrailerVideo === 'function') {
                            window.playTrailerVideo(movieData.id); 
                        } else if (typeof playTrailerVideo === 'function') {
                            playTrailerVideo(movieData.id);
                        }
                    }
                }
            });
        });
    }

    // 2. Saari slides ke More Info Buttons handle karne ke liye
    const heroInfoButtons = document.querySelectorAll(".hero-buttons .info-btn");
    if (heroInfoButtons.length > 0) {
        heroInfoButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                
                const parentSlide = this.closest(".slide");
                const movieTitle = parentSlide?.getAttribute("data-movie");
                
                if (movieTitle) {
                    let heroImgSrc = "";
                    
                    // Style attributes read routine
                    const bgStyle = parentSlide.style.backgroundImage;
                    if (bgStyle && bgStyle.includes("url")) {
                        const match = bgStyle.match(/url\(['"]?([^'"]*)['"]?\)/);
                        if (match && match[1]) {
                            heroImgSrc = match[1];
                        }
                    } else {
                        heroImgSrc = parentSlide.querySelector(".hero-bg-img, img")?.getAttribute("src") || "";
                    }
                    
                    // Directly calling window layer open function
                    if (typeof window.openDetailsModal === 'function') {
                        window.openDetailsModal(movieTitle, heroImgSrc); 
                    } else if (typeof openDetailsModal === 'function') {
                        openDetailsModal(movieTitle, heroImgSrc);
                    }
                }
            });
        });
    }

  // ==========================================
    // 6. MY LIST PAGE LIVE RENDER ENGINE 
    // ==========================================
    const myListGrid = document.getElementById("mylist-container");
    const emptyMsg = document.getElementById("empty-message");

    if (myListGrid) {
        function renderMyList() {
            myListGrid.innerHTML = ""; 
            
            const savedWatchlist = typeof getListData === 'function' ? getListData("watchlist") : [];
            const savedLiked = typeof getListData === 'function' ? getListData("liked") : [];
            const allSavedMovies = [...new Set([...savedWatchlist, ...savedLiked])];

            if (allSavedMovies.length === 0) {
                if (emptyMsg) emptyMsg.style.display = "block";
                return;
            } else {
                if (emptyMsg) emptyMsg.style.display = "none";
            }

            allSavedMovies.forEach(title => {
                const data = window.moviesDatabase ? window.moviesDatabase[title] : null;
                if (!data) return; 

                let posterPath = "";
                // --- MOVIES & SERIES CUSTOM POSTER ROUTING ---
                if (title === "Kalki 2898 AD") { posterPath = "kalki.jpg"; }
                else if (title === "Blade Runner 2049") { posterPath = "Blade.webp"; }
                else if (title === "Avatar: The Way of Water") { posterPath = "avatar.jpg"; }
                else if (title === "3 Idiots") { posterPath = "3 idiots.jpg"; }
                else if (title === "Dangal") { posterPath = "dangal.jpg"; }
                else if (title === "RRR") { posterPath = "RRR.jpg"; }
                else if (title === "Pathaan") { posterPath = "pathan.jpg"; }
                else if (title === "Jawan") { posterPath = "jawan.webp"; }
                else if (title === "Gangubai Kathiawadi") { posterPath = "gangu.jpg"; }
                else if (title === "Fighter") { posterPath = "fighter.jpg"; }
                else if (title === "O'Romeo") { posterPath = "romeo.jpg"; }
                else if (title === "12th Fail") { posterPath = "12th.jpg"; }
                else if (title === "Dhurandhar") { posterPath = "dhurnder.jpg"; }
                else if (title === "Breaking Bad") { posterPath = "Breaking bad.jpg"; }
                else if (title === "Money Heist") { posterPath = "money heist.jpg"; }
                else if (title === "The Witcher") { posterPath = "The witcher.jpg"; }
                else if (title === "The Family Man") { posterPath = "The family man.jpg"; }
                else if (title === "Mirzapur") { posterPath = "mirzapur.jpg"; }
                else if (title === "Peaky Blinders") { posterPath = "peaky blinders.jpg"; }
                else if (title === "The Mandalorian") { posterPath = "The mandalorian.jpg"; }
                else if (title === "Scam 1992") { posterPath = "Scam 1992.jpg"; }
                else if (title === "Game of Thrones") { posterPath = "gane of thrones.jpg"; }
                else if (title === "Off Campus") { posterPath = "off_campus.jpg"; }
                else if (title === "Wednesday") { posterPath = "wednesday.jpg"; }
                else if (title === "Alice in Borderland") { posterPath = "alice.jpg"; }
                else if (title === "All of Us Are Dead") { posterPath = "all of us.webp"; }
                else if (title === "From") { posterPath = "from.jpg"; }
                else if (title === "Inception") { posterPath = "inception.webp"; }
                else if (title === "The Dark Knight") { posterPath = "the dark knight.webp"; }
                else if (title === "Avengers: Endgame") { posterPath = "Avengers.webp"; }
                else if (title === "Oppenheimer") { posterPath = "Oppenheimer.webp"; }
                else if (title === "Dune: Part Two") { posterPath = "Dune.webp"; }
                else if (title === "Stranger Things") { posterPath = "Stranger Things.jpg"; }
                else if (title === "Spider-Man: No Way Home") { posterPath = "Spider Man.jpg"; }
                else if (title === "Interstellar") { posterPath = "interstellar.webp"; }
                else if (title === "Mad Max: Fury Road") { posterPath = "mad_max.jpg"; }
                else if (title === "John Wick") { posterPath = "john_wick.jpg"; }
                else if (title === "Mission: Impossible - Fallout") { posterPath = "mission.jpg"; }
                else if (title === "Tenet") { posterPath = "tenet.webp"; }
                else if (title === "Arrival") { posterPath = "arrival.webp"; }
                else {
                    const standardKey = Object.keys(window.moviesDatabase).indexOf(title) + 1;
                    posterPath = `images/poster${standardKey <= 8 ? standardKey : 1}.jpg`;
                }

                const card = document.createElement("div");
                card.className = "movie-card";
                card.style.marginBottom = "20px";
                card.innerHTML = `
                    <img src="${posterPath}" alt="${title}" class="card-img">
                    <div class="card-hover-info">
                        <h3 class="card-title">${title}</h3>
                        <div class="card-meta">
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${data.rating}</span>
                            <span>${data.year}</span>
                            <span>${data.duration || ''}</span>
                        </div>
                        <div class="card-actions">
                            <button class="action-circle-btn"><i class="fa-solid fa-play"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-plus"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-heart"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-info"></i></button>
                        </div>
                    </div>
                `;

                // 1. Pure Card par click click logic
                card.addEventListener("click", function (e) {
                    // Agar click kisi button ya icon par hua h, toh card ka click modal mat kholo
                    if (e.target.closest(".action-circle-btn")) return;
                    if (typeof window.openDetailsModal === 'function') {
                        window.openDetailsModal(title, posterPath);
                    }
                });

                // 2.  SMART INDEPENDENT ACTION ICON BINDERS
                card.querySelectorAll(".action-circle-btn").forEach(btn => {
                    const icon = btn.querySelector("i");
                    if (icon) {
                        // --- 🟢 PLAY TRAILER BUTTON ---
                        if (icon.classList.contains("fa-play")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                
                                //  LIVE TESTING LOGS (Inspect Console me dikhega)
                                console.log("Watchlist Card Play Clicked for:", title);
                                console.log("Movie Data Found:", data);
                                
                                if (data && data.id) {
                                    console.log("Triggering Video ID:", data.id);
                                    if (typeof window.playTrailerVideo === 'function') {
                                        window.playTrailerVideo(data.id);
                                    } else if (typeof playTrailerVideo === 'function') {
                                        playTrailerVideo(data.id);
                                    }
                                } else {
                                    console.error("ALERT: Is movie ki ID database me nahi mili ya galat hai!");
                                }
                            });
                        }
                        // ---  WATCHLIST PLUS/CHECK BUTTON ---
                        else if (icon.classList.contains("fa-plus") || icon.classList.contains("fa-check")) {
                            if (savedWatchlist.includes(title)) {
                                btn.style.color = "#ff0000";
                                btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
                            }
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("watchlist", title);
                                    renderMyList();
                                }
                            });
                        }
                        // --- HEART LIKE BUTTON ---
                        else if (icon.classList.contains("fa-heart")) {
                            if (savedLiked.includes(title)) btn.style.color = "#ff0000";
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("liked", title);
                                    renderMyList();
                                }
                            });
                        }
                        // ---  MORE INFO BUTTON ---
                        else if (icon.classList.contains("fa-info")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof window.openDetailsModal === 'function') {
                                    window.openDetailsModal(title, posterPath);
                                }
                            });
                        }
                    }
                });

                myListGrid.appendChild(card);
            });
        }

        renderMyList();

    }

    // ==========================================
    // 6B. MOVIES PAGE 24 CARDS ENGINE & MULTI-GENRE FILTERS 
    // ==========================================
    const moviesPageGrid = document.getElementById("movies-page-grid");
    const categoryPills = document.querySelectorAll(".category-pill");

    if (moviesPageGrid) {
        // Exact 24 Unique Movies Dataset List
        const moviesList24 = [
            { title: "Inception", poster: "inception.webp" },
            { title: "The Dark Knight", poster: "the dark knight.webp" },
            { title: "Interstellar", poster: "interstellar.webp" },
            { title: "Avengers: Endgame", poster: "Avengers.webp" },
            { title: "Oppenheimer", poster: "Oppenheimer.webp" },
            { title: "Dune: Part Two", poster: "Dune.webp" },
            { title: "Kalki 2898 AD", poster: "kalki.jpg" },
            { title: "Blade Runner 2049", poster: "Blade.webp" },
            { title: "Avatar: The Way of Water", poster: "avatar.jpg" },
            { title: "3 Idiots", poster: "3 idiots.jpg" },
            { title: "Dangal", poster: "dangal.jpg" },
            { title: "RRR", poster: "RRR.jpg" },
            { title: "Pathaan", poster: "pathan.jpg" },
            { title: "Jawan", poster: "jawan.webp" },
            { title: "Gangubai Kathiawadi", poster: "gangu.jpg" },
            { title: "Fighter", poster: "fighter.jpg" },
            { title: "O'Romeo", poster: "romeo.jpg" },
            { title: "12th Fail", poster: "12th.jpg" },
            { title: "Dhurandhar", poster: "dhurnder.jpg" },
            { title: "Mad Max: Fury Road", poster: "mad_max.jpg" },
            { title: "John Wick", poster: "john_wick.jpg" },
            { title: "Mission: Impossible - Fallout", poster: "mission.jpg" },
            { title: "Tenet", poster: "tenet.webp" },
            { title: "Arrival", poster: "arrival.webp" }
        ];

        function renderMoviesPage(filterGenre = "all") {
            moviesPageGrid.innerHTML = "";
            let matchFound = false;

            const savedWatchlist = typeof getListData === 'function' ? getListData("watchlist") : [];
            const savedLiked = typeof getListData === 'function' ? getListData("liked") : [];

            moviesList24.forEach((item) => {
                const db = window.moviesDatabase || moviesDatabase;
                const movieData = db ? db[item.title] : null;
                if (!movieData) return;

                // Multi-genre array check validator
                const genresArr = movieData.genres ? movieData.genres.map(g => g.toLowerCase()) : [];
                
                if (filterGenre !== "all" && !genresArr.includes(filterGenre.toLowerCase())) {
                    return; // Dynamic filter check skip condition met
                }

                matchFound = true;

                // Card Element Generator Nodes
                const card = document.createElement("div");
                card.className = "movie-card";
                card.style.marginBottom = "20px";
                card.innerHTML = `
                    <img src="${item.poster}" alt="${item.title}" class="card-img">
                    <div class="card-hover-info">
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-meta">
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${movieData.rating}</span>
                            <span>${movieData.year}</span>
                            <span>${movieData.duration || ''}</span>
                        </div>
                        <div class="card-actions">
                            <button class="action-circle-btn"><i class="fa-solid fa-play"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-plus"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-heart"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-info"></i></button>
                        </div>
                    </div>
                `;

                // 1. Full Body Card Click Action Trigger Details View
                card.addEventListener("click", function (e) {
                    if (e.target.closest(".action-circle-btn")) return;
                    if (typeof window.openDetailsModal === 'function') {
                        window.openDetailsModal(item.title, item.poster);
                    } else if (typeof openDetailsModal === 'function') {
                        openDetailsModal(item.title, item.poster);
                    }
                });

                // 2. Action Icons Internal Event Binders Layer
                card.querySelectorAll(".action-circle-btn").forEach(btn => {
                    const icon = btn.querySelector("i");
                    if (icon) {
                        // --- PLAY TRAILER BUTTON POPUP ---
                        if (icon.classList.contains("fa-play")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (movieData.id) {
                                    if (typeof window.playTrailerVideo === 'function') {
                                        window.playTrailerVideo(movieData.id);
                                    } else if (typeof playTrailerVideo === 'function') {
                                        playTrailerVideo(movieData.id);
                                    }
                                }
                            });
                        }
                        // ---  WATCHLIST ACTION ADD / REMOVE SWAP ---
                        else if (icon.classList.contains("fa-plus") || icon.classList.contains("fa-check")) {
                            if (savedWatchlist.includes(item.title)) {
                                btn.style.color = "#ff0000";
                                btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
                            }
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("watchlist", item.title);
                                    renderMoviesPage(filterGenre);
                                }
                            });
                        }
                        // ---  HEART LIKE BUTTON SUB-CONTROLLER ---
                        else if (icon.classList.contains("fa-heart")) {
                            if (savedLiked.includes(item.title)) btn.style.color = "#ff0000";
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("liked", item.title);
                                    renderMoviesPage(filterGenre);
                                }
                            });
                        }
                        // ---  MORE INFO MODAL CONTROLLER VIEW ---
                        else if (icon.classList.contains("fa-info")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof window.openDetailsModal === 'function') {
                                    window.openDetailsModal(item.title, item.poster);
                                } else if (typeof openDetailsModal === 'function') {
                                    openDetailsModal(item.title, item.poster);
                                }
                            });
                        }
                    }
                });

                moviesPageGrid.appendChild(card);
            });

            if (!matchFound) {
                moviesPageGrid.innerHTML = `<p style="color: #666; font-size: 1.1rem; padding: 40px; width:100%; text-align:center;"><i class="fa-solid fa-video-slash" style="display:block; font-size:2rem; margin-bottom:10px;"></i> No movies found in this genre yet.</p>`;
            }
        }

        // Pill Click Filter Core Rigging
        categoryPills.forEach(pill => {
            pill.addEventListener("click", function () {
                categoryPills.forEach(p => p.classList.remove("active"));
                this.classList.add("active");
                const selectedGenre = this.getAttribute("data-genre");
                renderMoviesPage(selectedGenre);
            });
        });

        // Execute render on setup load trigger
        renderMoviesPage("all");
    }

    // ==========================================
    // 6C. TV SHOWS PAGE CARDS ENGINE & MULTI-GENRE FILTERS 
    // ==========================================
    const tvShowsPageGrid = document.getElementById("tvshows-page-grid");
    // Select filter elements specific to the TV shows view layer
    const tvCategoryPills = document.querySelectorAll("#main-tvshows-page-section .category-pill");

    if (tvShowsPageGrid) {
        
        // Exact 24 Unique Movies Dataset List (FIXED CASE-SENSITIVITY)
        const moviesList24 = [
            { title: "Inception", poster: "Inception.webp" }, 
            { title: "The Dark Knight", poster: "the dark knight.webp" },
            { title: "Interstellar", poster: "interstellar.webp" },
            { title: "Avengers: Endgame", poster: "Avengers.webp" }, 
            { title: "Oppenheimer", poster: "Oppenheimer.webp" },    
            { title: "Dune: Part Two", poster: "Dune.webp" },           
            { title: "Kalki 2898 AD", poster: "kalki.jpg" },
            { title: "Blade Runner 2049", poster: "Blade.webp" },       
            { title: "Avatar: The Way of Water", poster: "Avatar.jpg" }, 
            { title: "3 Idiots", poster: "3 idiots.jpg" },
            { title: "Dangal", poster: "Dangal.jpg" },                   
            { title: "RRR", poster: "RRR.jpg" },
            { title: "Pathaan", poster: "Pathan.jpg" },
            { title: "Jawan", poster: "Jawan.webp" },
            { title: "Gangubai Kathiawadi", poster: "gangu.jpg" },
            { title: "Fighter", poster: "fighter.jpg" },
            { title: "O'Romeo", poster: "romeo.jpg" },
            { title: "12th Fail", poster: "12th.jpg" },
            { title: "Dhurandhar", poster: "dhurnder.jpg" },
            { title: "Mad Max: Fury Road", poster: "mad_max.jpg" },
            { title: "John Wick", poster: "john_wick.jpg" },
            { title: "Mission: Impossible - Fallout", poster: "mission.jpg" },
            { title: "Tenet", poster: "tenet.webp" },
            { title: "Arrival", poster: "arrival.webp" }
        ];

        function renderTVShowsPage(filterGenre = "all") {
            tvShowsPageGrid.innerHTML = "";
            let matchFound = false;

            const savedWatchlist = typeof getListData === 'function' ? getListData("watchlist") : [];
            const savedLiked = typeof getListData === 'function' ? getListData("liked") : [];

            tvShowsList.forEach((item) => {
                const db = window.moviesDatabase || moviesDatabase;
                const seriesData = db ? db[item.title] : null;
                if (!seriesData) return;

                // Validate multi-genre mapping tracks parameters
                const genresArr = seriesData.genres ? seriesData.genres.map(g => g.toLowerCase()) : [];
                
                if (filterGenre !== "all" && !genresArr.includes(filterGenre.toLowerCase())) {
                    return; 
                }

                matchFound = true;

                // Build Card Dynamic Factory
                const card = document.createElement("div");
                card.className = "movie-card";
                card.style.marginBottom = "20px";
                card.innerHTML = `
                    <img src="${item.poster}" alt="${item.title}" class="card-img">
                    <div class="card-hover-info">
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-meta">
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${seriesData.rating}</span>
                            <span>${seriesData.year}</span>
                            <span>${seriesData.duration || ''}</span>
                        </div>
                        <div class="card-actions">
                            <button class="action-circle-btn"><i class="fa-solid fa-play"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-plus"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-heart"></i></button>
                            <button class="action-circle-btn"><i class="fa-solid fa-info"></i></button>
                        </div>
                    </div>
                `;

                // 1. Full Body Card Click Action Trigger Details Modal
                card.addEventListener("click", function (e) {
                    if (e.target.closest(".action-circle-btn")) return;
                    if (typeof window.openDetailsModal === 'function') {
                        window.openDetailsModal(item.title, item.poster);
                    } else if (typeof openDetailsModal === 'function') {
                        openDetailsModal(item.title, item.poster);
                    }
                });

                // 2. Core Internal Icon Buttons Listeners
                card.querySelectorAll(".action-circle-btn").forEach(btn => {
                    const icon = btn.querySelector("i");
                    if (icon) {
                        // ---  PLAY POPUP TRAILER BUTTON ---
                        if (icon.classList.contains("fa-play")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (seriesData.id) {
                                    if (typeof window.playTrailerVideo === 'function') {
                                        window.playTrailerVideo(seriesData.id);
                                    } else if (typeof playTrailerVideo === 'function') {
                                        playTrailerVideo(seriesData.id);
                                    }
                                }
                            });
                        }
                        // ---  WATCHLIST SYNC PLUS / CHECK OVERLAYS ---
                        else if (icon.classList.contains("fa-plus") || icon.classList.contains("fa-check")) {
                            if (savedWatchlist.includes(item.title)) {
                                btn.style.color = "#ff0000";
                                btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
                            }
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("watchlist", item.title);
                                    renderTVShowsPage(filterGenre);
                                }
                            });
                        }
                        // ---  HEART LIKE ACTIONS CONFIGURATION ---
                        else if (icon.classList.contains("fa-heart")) {
                            if (savedLiked.includes(item.title)) btn.style.color = "#ff0000";
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof toggleListData === 'function') {
                                    toggleListData("liked", item.title);
                                    renderTVShowsPage(filterGenre);
                                }
                            });
                        }
                        // ---  DETAILS MODAL MANIFEST POPUP LINK ---
                        else if (icon.classList.contains("fa-info")) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (typeof window.openDetailsModal === 'function') {
                                    window.openDetailsModal(item.title, item.poster);
                                } else if (typeof openDetailsModal === 'function') {
                                    openDetailsModal(item.title, item.poster);
                                }
                            });
                        }
                    }
                });

                tvShowsPageGrid.appendChild(card);
            });

            if (!matchFound) {
                tvShowsPageGrid.innerHTML = `<p style="color: #666; font-size: 1.1rem; padding: 40px; width:100%; text-align:center;"><i class="fa-solid fa-video-slash" style="display:block; font-size:2rem; margin-bottom:10px;"></i> No web series found in this genre yet.</p>`;
            }
        }

        // Pill Click Filter Event Interceptor
        tvCategoryPills.forEach(pill => {
            pill.addEventListener("click", function () {
                tvCategoryPills.forEach(p => p.classList.remove("active"));
                this.classList.add("active");
                const selectedGenre = this.getAttribute("data-genre");
                renderTVShowsPage(selectedGenre);
            });
        });

        // Initialize runtime sequence parameters
        renderTVShowsPage("all");
    }
    // ==========================================
    // PLANS SECTION MODAL INTERACTION CONTROLLER
    // ==========================================
    
    const planCards = document.querySelectorAll(".plan-card");
    const paymentModal = document.getElementById("payment-modal");
    const closePaymentBtn = document.getElementById("close-payment-btn");
    
    const summaryPlanName = document.getElementById("summary-plan-name");
    const summaryPlanPrice = document.getElementById("summary-plan-price");
    const checkoutForm = document.getElementById("normal-checkout-form");

    planCards.forEach(card => {
        card.addEventListener("click", function () {
            const planName = this.getAttribute("data-plan-name");
            const planPrice = this.getAttribute("data-plan-price");

            if (summaryPlanName && summaryPlanPrice) {
                summaryPlanName.textContent = planName;
                summaryPlanPrice.textContent = planPrice;
            }

            if (paymentModal) {
                paymentModal.classList.add("open");
            }
        });
    });

    closePaymentBtn?.addEventListener("click", () => {
        paymentModal?.classList.remove("open");
    });

    window.addEventListener("click", (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove("open");
        }
    });

    checkoutForm?.addEventListener("submit", function (e) {
        e.preventDefault(); 
        const activatedPlan = summaryPlanName.textContent;
        alert(`Success! Your Cinewave "${activatedPlan}" plan is now active.`);
        paymentModal?.classList.remove("open");
        checkoutForm.reset(); 
    });

    // ==========================================
    // INTERACTIVE TESTIMONIAL FEEDBACK CONTROLLER
    // ==========================================
    const starContainer = document.getElementById("interactive-stars-box");
    const feedbackForm = document.getElementById("cine-feedback-form");
    const reviewsGrid = document.getElementById("reviews-display-grid");
    
    let userSelectedRating = 0; 

    if (starContainer) {
        const stars = starContainer.querySelectorAll("i");

        stars.forEach(star => {
            star.addEventListener("mouseover", function () {
                const index = parseInt(this.getAttribute("data-index"));
                highlightStars(stars, index, "hover-state");
            });

            star.addEventListener("mouseout", function () {
                removeHighlight(stars, "hover-state");
            });

            star.addEventListener("click", function () {
                userSelectedRating = parseInt(this.getAttribute("data-index"));
                stars.forEach((s, idx) => {
                    if (idx < userSelectedRating) {
                        s.classList.remove("fa-regular");
                        s.classList.add("fa-solid", "active");
                    } else {
                        s.classList.remove("fa-solid", "active");
                        s.classList.add("fa-regular");
                    }
                });
            });
        });
    }

    function highlightStars(starArray, count, className) {
        starArray.forEach((s, idx) => {
            if (idx < count) s.classList.add(className);
        });
    }

    function removeHighlight(starArray, className) {
        starArray.forEach(s => s.classList.remove(className));
    }

    if (feedbackForm && reviewsGrid) {
        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            if (userSelectedRating === 0) {
                alert("Please select a star rating before submitting your feedback!");
                return;
            }

            const nameInput = document.getElementById("fb-user-name").value.trim();
            const textInput = document.getElementById("fb-user-text").value.trim();
            const firstLetter = nameInput.charAt(0).toUpperCase();
            const randomGradientNum = Math.floor(Math.random() * 4) + 1;

            let generatedStarsHTML = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= userSelectedRating) {
                    generatedStarsHTML += `<i class="fa-solid fa-star"></i>`;
                } else {
                    generatedStarsHTML += `<i class="fa-regular fa-star"></i>`;
                }
            }

            const newCardHTML = `
                <div class="review-card" style="opacity: 0; transform: translateY(10px); transition: all 0.4s ease;">
                    <div class="stars-row">${generatedStarsHTML}</div>
                    <p class="review-text">"${textInput}"</p>
                    <div class="reviewer-info">
                        <div class="avatar gradient-${randomGradientNum}">${firstLetter}</div>
                        <div class="reviewer-details">
                            <h3>${nameInput}</h3>
                            <p>Verified User</p>
                        </div>
                    </div>
                </div>
            `;

            reviewsGrid.insertAdjacentHTML("beforeend", newCardHTML);

            setTimeout(() => {
                const newlyAddedCard = reviewsGrid.lastElementChild;
                if (newlyAddedCard) {
                    newlyAddedCard.style.opacity = "1";
                    newlyAddedCard.style.transform = "translateY(0)";
                }
            }, 50);

            alert("Success! Thank you for sharing your feedback with CineWave.");
            feedbackForm.reset();
            
            userSelectedRating = 0;
            const stars = starContainer.querySelectorAll("i");
            stars.forEach(s => {
                s.classList.remove("fa-solid", "active");
                s.classList.add("fa-regular");
            });
        });
    }

    // ==========================================
    // FAQ ACCORDION TRANSITION CONTROLLER
    // ==========================================
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const currentItem = this.parentElement;
            const currentAnswer = this.nextElementSibling;

            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== currentItem && item.classList.contains("active")) {
                    item.classList.remove("active");
                    item.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            currentItem.classList.toggle("active");

            if (currentItem.classList.contains("active")) {
                currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
            } else {
                currentAnswer.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 6b. DYNAMIC EXTERNAL FOOTER RENDER ENGINE
    // ==========================================
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("footer.html")
            .then(response => response.text())
            .then(htmlContent => { 
                footerPlaceholder.innerHTML = htmlContent; 
            })
            .catch(error => console.error("Failed to load footer:", error));
    }
  // ==========================================
// 7. REAL-TIME LIVE SEARCH BAR ENGINE 
// ==========================================
document.addEventListener("input", function (e) {
    if (e.target && e.target.placeholder && e.target.placeholder.toLowerCase().includes("search")) {
        const query = e.target.value.trim().toLowerCase();

        const searchSection = document.getElementById("search-results-section");
        const searchCardsContainer = document.getElementById("search-cards-container");
        const searchQueryText = document.getElementById("search-query-text");

        const mainHeroSlider = document.querySelector(".hero-slider");
        const allPageSliders = document.querySelectorAll(".movies-section, .plans-section, .reviews-section, .faq-section, .movies-wrapper, #main-mylist-section");

        const posterMap = {
            "Inception": "inception.webp", "The Dark Knight": "the dark knight.webp", "Interstellar": "interstellar.webp",
            "Avengers: Endgame": "Avengers.webp", "Oppenheimer": "Oppenheimer.webp", "Dune: Part Two": "Dune.webp",
            "Stranger Things": "Stranger Things.jpg", "Spider-Man: No Way Home": "Spider Man.jpg",
            "Kalki 2898 AD": "kalki.jpg", "Blade Runner 2049": "Blade.webp", "Avatar: The Way of Water": "avatar.jpg",
            "3 Idiots": "3 idiots.jpg", "Dangal": "dangal.jpg", "RRR": "RRR.jpg", "Pathaan": "pathan.jpg",
            "Jawan": "jawan.webp", "Gangubai Kathiawadi": "gangu.jpg", "Fighter": "fighter.jpg",
            "O'Romeo": "romeo.jpg", "12th Fail": "12th.jpg", "Dhurandhar": "dhurnder.jpg",
            "Breaking Bad": "Breaking bad.jpg", "Money Heist": "money heist.jpg", "The Witcher": "The witcher.jpg",
            "The Family Man": "The family man.jpg", "Mirzapur": "mirzapur.jpg", "Peaky Blinders": "peaky blinders.jpg",
            "The Mandalorian": "The mandalorian.jpg", "Scam 1992": "Scam 1992.jpg", "Game of Thrones": "gane of thrones.jpg",
            "Off Campus": "off_campus.jpg", "Wednesday": "wednesday.jpg", "Alice in Borderland": "alice.jpg",
            "All of Us Are Dead": "all of us.webp", "From": "from.jpg", "Mad Max: Fury Road": "mad_max.jpg", 
            "John Wick": "john_wick.jpg", "Mission: Impossible - Fallout": "mission.jpg", "Tenet": "tenet.webp", 
            "Arrival": "arrival.webp"
        };

        if (query.length === 0) {
            if (searchSection) searchSection.style.display = "none";
            if (mainHeroSlider) mainHeroSlider.style.display = "block";
            allPageSliders.forEach(s => { if(s) s.style.display = "block"; });
            return;
        }

        if (searchQueryText) searchQueryText.textContent = `"${e.target.value}"`;
        if (mainHeroSlider) mainHeroSlider.style.display = "none";
        allPageSliders.forEach(s => { if(s) s.style.display = "none"; });
        if (searchSection) searchSection.style.display = "block";

        if (searchCardsContainer) {
            searchCardsContainer.innerHTML = "";
            let matchCount = 0;

            if (typeof window.moviesDatabase !== 'undefined') {
                Object.keys(window.moviesDatabase).forEach(title => {
                    const movie = window.moviesDatabase[title];
                    if (title.toLowerCase().includes(query) || (movie.cast && movie.cast.toLowerCase().includes(query))) {
                        matchCount++;
                        
                        // Fallback fallback to dynamic matching names
                        const imgPath = posterMap[title] || "dhurnder.jpg";

                        const card = document.createElement("div");
                        card.className = "movie-card";
                        card.innerHTML = `
                            <img src="${imgPath}" alt="${title}" class="card-img">
                            <div class="card-hover-info">
                                <h3 class="card-title">${title}</h3>
                                <div class="card-meta">
                                    <span class="card-rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                                    <span>${movie.year}</span>
                                    <span>${movie.duration || ''}</span>
                                </div>
                                <div class="card-actions">
                                    <button class="action-circle-btn"><i class="fa-solid fa-play"></i></button>
                                    <button class="action-circle-btn"><i class="fa-solid fa-plus"></i></button>
                                    <button class="action-circle-btn"><i class="fa-solid fa-heart"></i></button>
                                    <button class="action-circle-btn"><i class="fa-solid fa-info"></i></button>
                                </div>
                            </div>
                        `;

                        // Whole card overlay click details logic
                        card.addEventListener("click", () => {
                            if (typeof window.openDetailsModal === 'function') {
                                window.openDetailsModal(title, imgPath);
                            }
                        });

                        // Deep smart inner handlers linking configuration logic
                        card.querySelectorAll(".action-circle-btn").forEach(btn => {
                            const icon = btn.querySelector("i");
                            if (icon) {
                                // 1. Play Button Click Handler
                                if (icon.classList.contains("fa-play")) {
                                    btn.addEventListener("click", (e) => {
                                        e.stopPropagation();
                                        if (typeof window.playTrailerVideo === 'function') {
                                            window.playTrailerVideo(movie.id);
                                        }
                                    });
                                }
                                // 2. Watchlist Trigger Logic Configuration
                                else if (icon.classList.contains("fa-plus") || icon.classList.contains("fa-check")) {
                                    if (typeof getListData === 'function' && getListData("watchlist").includes(title)) {
                                        btn.style.color = "#ff0000";
                                        btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
                                    }
                                    btn.addEventListener("click", (e) => {
                                        e.stopPropagation();
                                        if (typeof toggleListData === 'function') {
                                            const isAdded = toggleListData("watchlist", title);
                                            e.currentTarget.style.color = isAdded ? "#ff0000" : "#fff";
                                            e.currentTarget.innerHTML = isAdded ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-plus"></i>`;
                                            if (typeof renderMyList === 'function') renderMyList(); 
                                        }
                                    });
                                }
                                // 3. Heart Like Tracker Action Linking
                                else if (icon.classList.contains("fa-heart")) {
                                    if (typeof getListData === 'function' && getListData("liked").includes(title)) {
                                        btn.style.color = "#ff0000";
                                    }
                                    btn.addEventListener("click", (e) => {
                                        e.stopPropagation();
                                        if (typeof toggleListData === 'function') {
                                            const isLiked = toggleListData("liked", title);
                                            e.currentTarget.style.color = isLiked ? "#ff0000" : "#fff";
                                            if (typeof renderMyList === 'function') renderMyList();
                                        }
                                    });
                                }
                                // 4. Info Modal Pop-up Display Trigger
                                else if (icon.classList.contains("fa-info")) {
                                    btn.addEventListener("click", (e) => {
                                        e.stopPropagation();
                                        if (typeof window.openDetailsModal === 'function') {
                                            window.openDetailsModal(title, imgPath);
                                        }
                                    });
                                }
                            }
                        });

                        searchCardsContainer.appendChild(card);
                    }
                });
            }

            if (matchCount === 0) {
                searchCardsContainer.innerHTML = `<p style="color: #aaa; font-size: 1.1rem; padding: 20px 0;">No movies found matching "${e.target.value}".</p>`;
            }
        }
    }
});

// Close cross X handler event logic controller rules
document.addEventListener("click", function(e) {
    if (e.target && (e.target.id === "clear-search-btn" || e.target.parentElement.id === "clear-search-btn")) {
        const activeInput = document.querySelector('input[placeholder*="Search"]');
        if (activeInput) activeInput.value = "";
        
        const searchSection = document.getElementById("search-results-section");
        const mainHeroSlider = document.querySelector(".hero-slider");
        const allPageSliders = document.querySelectorAll(".movies-section, .plans-section, .reviews-section, .faq-section, .movies-wrapper, #main-mylist-section");
        
        if (searchSection) searchSection.style.display = "none";
        if (mainHeroSlider) mainHeroSlider.style.display = "block";
        allPageSliders.forEach(s => { if(s) s.style.display = "block"; });
    }
});
});
// ==========================================================================
// 🚀 GLOBAL DOCUMENT CLICK LISTENER FOR MYLIST CARDS & MODAL CLOSE FIX
// ==========================================================================
document.addEventListener("click", function (e) {
    
    // 🔥 FIX 1: Agar user Close Button (×) par click kare, toh modal turant band karo
    const closeBtn = e.target.closest(".modal-close-btn");
    if (closeBtn) {
        e.stopPropagation();
        e.preventDefault();
        
        const trailerModal = document.getElementById('trailer-modal');
        const trailerVideo = document.getElementById('trailer-video');
        
        if (trailerModal) {
            trailerModal.classList.remove('open'); // Modal ko screen se chupayega
        }
        if (trailerVideo) {
            trailerVideo.src = ""; // Video ko background me chalne se rokega
        }
        return; // Code ko yahi rok do
    }

    // Baaki aapka purana card buttons ka logic as it is:
    const btn = e.target.closest(".action-circle-btn");
    if (!btn) return;

    if (btn.closest("#search-results-section")) return;

    const card = btn.closest(".movie-card");
    const title = card ? card.querySelector(".card-title")?.textContent.trim() : null;
    if (!title) return;

    const db = window.moviesDatabase || moviesDatabase;
    const movieData = db ? db[title] : null;
    const icon = btn.querySelector("i");

    if (icon) {
        // 1. Play Trailer Popup Button Trigger
        if (icon.classList.contains("fa-play")) {
            e.stopPropagation();
            e.preventDefault();
            
            if (movieData && movieData.id) {
                if (typeof window.playTrailerVideo === 'function') {
                    window.playTrailerVideo(movieData.id);
                } else if (typeof playTrailerVideo === 'function') {
                    playTrailerVideo(movieData.id);
                }
            } else {
                console.error("Movie ID missing for title:", title);
            }
        }
        // 2. Info / Details Modal View Button Trigger
        else if (icon.classList.contains("fa-info")) {
            e.stopPropagation();
            e.preventDefault();
            const cardImgSrc = card.querySelector(".card-img")?.getAttribute("src");
            
            if (typeof window.openDetailsModal === 'function') {
                window.openDetailsModal(title, cardImgSrc);
            } else if (typeof openDetailsModal === 'function') {
                openDetailsModal(title, cardImgSrc);
            }
        }
    }
});
// ==========================================
// 8. GLOBAL NAVBAR AUTH STATES & MODAL CONTROLLER 
// ==========================================

// --- Function: Check Login Session State on Load ---
function checkAuthSession() {
    const activeUser = localStorage.getItem("cineWaveUser");
    const signInBtn = document.querySelector(".signin-btn");
    const profileWrapper = document.getElementById("user-profile-wrapper");
    const avatarEl = document.getElementById("nav-user-avatar");

    if (activeUser) {
        // Agar user logged in hai: Sign In button hide karo, profile show karo
        if (signInBtn) signInBtn.style.display = "none";
        if (profileWrapper) profileWrapper.style.display = "flex";
        if (avatarEl) {
            // Name ka 1st letter nikal kar avatar me daalna
            avatarEl.textContent = activeUser.trim().charAt(0).toUpperCase();
        }
    } else {
        // Agar user logged out hai: Defaults toggle layout
        if (signInBtn) signInBtn.style.display = "block";
        if (profileWrapper) profileWrapper.style.display = "none";
    }
}

// Global Actions Delegation Event Triggers
document.addEventListener("click", function (e) {
    const authModal = document.getElementById("auth-modal");
    
    // 1. Open Modal Trigger
    if (e.target.classList.contains("signin-btn")) {
        if (authModal) authModal.classList.add("open");
        document.getElementById("tab-signin")?.click(); // Open with Sign In layout default
    }

    // 2. Close Modal Trigger
    if (e.target.classList.contains("auth-close-btn") || e.target === authModal) {
        if (authModal) authModal.classList.remove("open");
    }

    // 3. Tab: Sign In View Toggle Rules
    if (e.target.id === "tab-signin") {
        document.getElementById("tab-signin")?.classList.add("active");
        document.getElementById("tab-signup")?.classList.remove("active");
        
        document.getElementById("auth-heading").textContent = "Welcome back";
        document.getElementById("auth-subheading").textContent = "Sign in to continue streaming.";
        document.getElementById("label-password").textContent = "Password";
        document.getElementById("submit-text").textContent = "Sign In";
        document.getElementById("submit-icon").className = "fa-solid fa-right-to-bracket";
        document.getElementById("auth-footer-toggle").innerHTML = `New here? <span class="switch-link">Create an account</span>`;
        
        // Hide Extra fields
        document.getElementById("group-fullname").style.display = "none";
        document.getElementById("group-confirm").style.display = "none";
    }
    
    // 4. Tab: Create Account View Toggle Rules (Matching your layout!)
    if (e.target.id === "tab-signup" || e.target.classList.contains("switch-link")) {
        const isSignIn = document.getElementById("submit-text")?.textContent === "Sign In";
        if (e.target.classList.contains("switch-link") && !isSignIn) {
            document.getElementById("tab-signin")?.click();
            return;
        }

        document.getElementById("tab-signup")?.classList.add("active");
        document.getElementById("tab-signin")?.classList.remove("active");
        
        document.getElementById("auth-heading").textContent = "Create your account";
        document.getElementById("auth-subheading").textContent = "Join CineWave and start your watchlist.";
        document.getElementById("label-password").textContent = "Password (min 6 chars)";
        document.getElementById("submit-text").textContent = "Create Account";
        document.getElementById("submit-icon").className = "fa-solid fa-user-plus";
        document.getElementById("auth-footer-toggle").innerHTML = `Already have an account? <span class="switch-link">Sign in now</span>`;
        
        // Show Extra inputs fields from screenshot
        document.getElementById("group-fullname").style.display = "flex";
        document.getElementById("group-confirm").style.display = "flex";
    }

    // 5. Password Vision Eye togglers
    if (e.target.id === "toggle-pwd") {
        const pwd = document.getElementById("auth-password");
        if (pwd.type === "password") { pwd.type = "text"; e.target.className = "fa-regular fa-eye-slash toggle-password-visibility"; }
        else { pwd.type = "password"; e.target.className = "fa-regular fa-eye toggle-password-visibility"; }
    }
    if (e.target.id === "toggle-confirm-pwd") {
        const cpwd = document.getElementById("auth-confirm");
        if (cpwd.type === "password") { cpwd.type = "text"; e.target.className = "fa-regular fa-eye-slash toggle-password-visibility"; }
        else { cpwd.type = "password"; e.target.className = "fa-regular fa-eye toggle-password-visibility"; }
    }

    // 6. 🚨 LOGOUT ACTION TRIGGER
    if (e.target.id === "nav-logout-trigger" || e.target.closest("#nav-logout-trigger")) {
        localStorage.removeItem("cineWaveUser");
        alert("Logged out successfully!");
        checkAuthSession(); // Session update status refresh
    }
});

// Form Submissions Event Logic Handling
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "universal-auth-form") {
        e.preventDefault();
        
        const modeText = document.getElementById("submit-text").textContent;
        const nameVal = document.getElementById("auth-fullname").value.trim();
        const emailVal = document.getElementById("auth-email").value.trim();
        const passVal = document.getElementById("auth-password").value.trim();
        const confirmVal = document.getElementById("auth-confirm").value.trim();

        // Error Nodes
        const nameErr = document.getElementById("fullname-error");
        const emailErr = document.getElementById("email-error");
        const passErr = document.getElementById("password-error");
        const confirmErr = document.getElementById("confirm-error");

        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation Rules checking
        if (modeText === "Create Account") {
            if (!nameVal) { nameErr.textContent = "Please enter your name."; isValid = false; }
            else { nameErr.textContent = ""; }

            if (!confirmVal) { confirmErr.textContent = "Please confirm your password."; isValid = false; }
            else if (passVal !== confirmVal) { confirmErr.textContent = "Passwords do not match!"; isValid = false; }
            else { confirmErr.textContent = ""; }
        }

        if (!emailVal || !emailPattern.test(emailVal)) { emailErr.textContent = "Enter a valid email."; isValid = false; }
        else { emailErr.textContent = ""; }

        if (!passVal || passVal.length < 6) { passErr.textContent = "Must be min 6 characters."; isValid = false; }
        else { passErr.textContent = ""; }

        if (isValid) {
            // Save state based on login or creation name parameters
            const userSessionName = (modeText === "Create Account") ? nameVal : emailVal.split("@")[0];
            localStorage.setItem("cineWaveUser", userSessionName);
            
            alert(`${modeText} Successful!`);
            document.getElementById("auth-modal").classList.remove("open");
            e.target.reset();
            
            checkAuthSession(); // Instantly apply profile layout changes!
        }
    }
});

//  Execute profile check on fetch initialization trigger inside script.js navbar loading segment
setTimeout(checkAuthSession, 500); 

// ==========================================================================
// 9. DYNAMIC MOBILE HAMBURGER SLIDE MENU CONTROLLER (CROSS ICON FIXED)
// ==========================================================================
document.addEventListener("click", function (e) {
    const menuDrawer = document.getElementById("nav-links-menu");
    const hamburgerBtn = document.getElementById("mobile-menu-bar");

    // 1. Hamburger button or its inner icon click trigger
    if (e.target.closest("#mobile-menu-bar")) {
        e.stopPropagation();
        if (!menuDrawer) return;

        menuDrawer.classList.toggle("open");
        
        const icon = hamburgerBtn.querySelector("i");
        if (icon) {
            if (menuDrawer.classList.contains("open")) {
                // Cross sign toggle update
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                // Return to normal 3 lines bars
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    }

    // 2. Side drawer se bahar click hone par menu automatic close ho jaye
    if (menuDrawer && menuDrawer.classList.contains("open")) {
        if (!e.target.closest("#nav-links-menu") && !e.target.closest("#mobile-menu-bar")) {
            menuDrawer.classList.remove("open");
            const icon = hamburgerBtn ? hamburgerBtn.querySelector("i") : null;
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    }
});

// ==========================================================================
// 10. MOBILE SEARCH MANDATORY INTERACTION HOOK (100% FIXED)
// ==========================================================================
document.addEventListener("click", function (e) {
    const searchIcon = e.target.closest(".search-icon");
    const searchInput = document.querySelector(".search-box input");

    // Agar mobile scale par icon ya uske check points par tap hua
    if (searchIcon && window.innerWidth <= 768) {
        e.stopPropagation();
        e.preventDefault();
        
        if (searchInput) {
            // Force focus out element styles expansion state toggle
            searchInput.classList.toggle("active-expand");
            
            if (searchInput.classList.contains("active-expand")) {
                searchInput.focus(); // Instant keypad pop up focus
            } else {
                searchInput.blur();
            }
        }
    } 
    // Agar pure search area ke bahar kahi click ho to input auto collapse kardo
    else if (searchInput && !e.target.closest(".search-box")) {
        searchInput.classList.remove("active-expand");
    }
});