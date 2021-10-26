const auctions = [
    {
        id: 1,
        item : 'Fair Rosamond',
        image: 'http://localhost:3000/images/fair-rosamund.jpg',
        category : 'arts',
        status : 'Open',
        startTime : '2021-10-12 20:00',
        endTime : '2021-12-15 20:00',
        details : 'Painting by Kate Muriel Mason',
        startPrice : '30000'
    },
    {
        id: 2,
        item : 'Chromatic Harmonica',
        image: 'http://localhost:3000/images/chromatic-harmonica.jpg',
        category : 'instruments',
        status : 'Open',
        startTime : '2021-10-15 18:00',
        endTime : '2022-01-10 18:00',
        details : 'Huang Professional 1248, Chromatic Harmonica.',
        startPrice : '1695'
    },
    {
        id: 3,
        item : 'Pottery Vase',
        image: 'http://localhost:3000/images/pottery-vase.jpg',
        category : 'crafts',
        status : 'Open',
        startTime : '2021-10-14 15:00',
        endTime : '2021-12-20 15:00',
        details : 'Pottery vase by George Cartlidge.',
        startPrice : '595'
    },
    {
        id: 4,
        item : 'Guillaume Berleur Pistol',
        image: 'http://localhost:3000/images/pistol.jpg',
        category : 'guns',
        status : 'Open',
        startTime : '2021-10-20 20:00',
        endTime : '2021-11-31 20:00',
        details : 'Double barrel and trigger side by side flintlock pistol by the Belgian gunsmith Guillaume Berleur.',
        startPrice : '125'
    },
    {
        id: 5,
        item : 'Cactus Bloom',
        image: 'http://localhost:3000/images/cactus-bloom.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : '2021-12-20 16:00',
        endTime : '2021-12-30 16:00',
        details : 'Painting by Edmund Paul',
        startPrice : '6100'
    },
    {
        id: 6,
        item : 'Musical Putti',
        image: 'http://localhost:3000/images/musical-putti.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : '2021-12-31 18:00',
        endTime : '2022-01-15 18:00',
        details : 'Musical Putti and Shell Silver Plated Salt',
        startPrice : '4000'
    },
    {
        id: 7,
        item : '20th Century Banjo',
        image: 'http://localhost:3000/images/banjo.jpg',
        category : 'instruments',
        status : 'Closed',
        startTime : '2021-12-17 18:00',
        endTime : '2021-12-30 18:00',
        details : 'Early to mid 20thC Banjo.',
        startPrice : '2000'
    },

    {
        id: 8,
        item : '19th Century German Violin',
        image: 'http://localhost:3000/images/german-violin.jpg',
        category : 'instruments',
        status : 'Closed',
        startTime : '2021-12-25 14:00',
        endTime : '2021-12-30 14:00',
        details : '19thC German violin, of stained maple construction with carved lion\'s head scroll, the tailpiece with inlaid floral decoration.',
        startPrice : '500'
    },

    {
        id: 9,
        item : 'Pottery Face Jug',
        image: 'http://localhost:3000/images/pottery-face-jug.jpg',
        category : 'crafts',
        status : 'Closed',
        startTime : '2021-11-30 15:00',
        endTime : '2021-12-10 14:00',
        details : 'Late 20th Century; Original, 11" height, Overall excellent condition. Appears to be complete and all original.',
        startPrice : '120'
    },

    {
        id: 10,
        item : 'Charter Arms Revolver',
        image: 'http://localhost:3000/images/revolver.jpg',
        category : 'guns',
        status : 'Closed',
        startTime : '2021-11-30 19:00',
        endTime : '2021-12-10 14:00',
        details : 'Traditional DA 5 shot sm. frame revolver',
        startPrice : '200'
    },

    {
        id: 11,
        item : 'Gold Eagle Diamond Necklace',
        image: 'http://localhost:3000/images/gold-necklace.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : '2021-12-12 17:00',
        endTime : '2021-12-20 22:00',
        details : 'Gold Eagle pendant necklace',
        startPrice : '300'
    },

    {
        id: 12,
        item : 'Copper Hanging Parrot Sculpture',
        image: 'http://localhost:3000/images/parrot-sculpture.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : '2021-12-16 13:00',
        endTime : '2021-12-21 15:00',
        details : 'Mid-Century Modern Brass & Copper Hanging Parrot Sculpture.',
        startPrice : '185'
    },

    {
        id: 13,
        item : 'Crystal Ducks & Turtle Figurines',
        image: 'http://localhost:3000/images/crystal-figurines.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : '2021-12-18 12:00',
        endTime : '2022-01-12 15:00',
        details : 'Crystal Ducks & Turtle Figurines',
        startPrice : '240'
    },

    {
        id: 14,
        item : 'Pocket Watch Hunter Case',
        image: 'http://localhost:3000/images/pocket-watch.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : '2022-01-10 17:00',
        endTime : '2022-01-25 15:00',
        details : 'Early 20th Century pocket watch; Original, 1.5" diameter',
        startPrice : '150'
    },

    {
        id: 15,
        item : 'Autographed Warner Bros Sericel',
        image: 'http://localhost:3000/images/autographed-sericel.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : 'J2022-01-31 8:00',
        endTime : '2022-02-19 15:00',
        details : 'Autographed Warner Bros Sylvester Hippetys Mummy sericel',
        startPrice : '142'
    },

    {
        id: 16,
        item : 'Bronze Bust',
        image: 'http://localhost:3000/images/bronze-bust.jpg',
        category : 'crafts',
        status : 'Closed',
        startTime : '2022-01-10 16:00',
        endTime : '2022-02-12 12:00',
        details : 'A vintage limited edition bronze bust by Gerson Frank',
        startPrice : '500'
    }
]

module.exports = auctions;