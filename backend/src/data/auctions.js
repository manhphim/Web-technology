const auctions = [
    {
        id: 1,
        item : 'Fair Rosamond',
        image: 'http://localhost:3000/images/fair-rosamund.jpg',
        category : 'arts',
        status : 'Open',
        startTime : 'October 12, 2021 8:00 PM',
        endTime : 'December 15, 2021 8:00 PM',
        details : 'Painting by Kate Muriel Mason',
        startPrice : '30000'
    },
    {
        id: 2,
        item : 'Chromatic Harmonica',
        image: 'http://localhost:3000/images/chromatic-harmonica.jpg',
        category : 'instruments',
        status : 'Open',
        startTime : 'October 15, 2021 6:00 PM',
        endTime : 'January 10, 2022 6:00 PM',
        details : 'Huang Professional 1248, Chromatic Harmonica.',
        startPrice : '1695'
    },
    {
        id: 3,
        item : 'Pottery Vase',
        image: 'http://localhost:3000/images/pottery-vase.jpg',
        category : 'crafts',
        status : 'Open',
        startTime : 'October 14, 2021 3:00 PM',
        endTime : 'December 20, 2021 3:00 PM',
        details : 'Pottery vase by George Cartlidge.',
        startPrice : '595'
    },
    {
        id: 4,
        item : 'Guillaume Berleur Pistol',
        image: 'http://localhost:3000/images/pistol.jpg',
        category : 'guns',
        status : 'Open',
        startTime : 'October 20, 2021 8:00 PM',
        endTime : 'November 31, 2021 8:00 PM',
        details : 'Double barrel and trigger side by side flintlock pistol by the Belgian gunsmith Guillaume Berleur.',
        startPrice : '125'
    },
    {
        id: 5,
        item : 'Cactus Bloom',
        image: 'http://localhost:3000/images/cactus-bloom.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : 'December 20, 2021 4:00 PM',
        endTime : 'December 30, 2021 4:00 PM',
        details : 'Painting by Edmund Paul',
        startPrice : '6100'
    },
    {
        id: 6,
        item : 'Musical Putti',
        image: 'http://localhost:3000/images/musical-putti.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : 'December 31, 2021 6:00 PM',
        endTime : 'January 15, 2022 6:00 PM',
        details : 'Musical Putti and Shell Silver Plated Salt',
        startPrice : '4000'
    },
    {
        id: 7,
        item : '20th Century Banjo',
        image: 'http://localhost:3000/images/banjo.jpg',
        category : 'instruments',
        status : 'Closed',
        startTime : 'December 17, 2021 6:00 PM',
        endTime : 'December 30, 2021 6:00 PM',
        details : 'Early to mid 20thC Banjo.',
        startPrice : '2000'
    },

    {
        id: 8,
        item : '19th Century German Violin',
        image: 'http://localhost:3000/images/german-violin.jpg',
        category : 'instruments',
        status : 'Closed',
        startTime : 'December 25, 2021 2:00 PM',
        endTime : 'December 30, 2021 2:00 PM',
        details : '19thC German violin, of stained maple construction with carved lion\'s head scroll, the tailpiece with inlaid floral decoration.',
        startPrice : '500'
    },

    {
        id: 9,
        item : 'Pottery Face Jug',
        image: 'http://localhost:3000/images/pottery-face-jug.jpg',
        category : 'crafts',
        status : 'Closed',
        startTime : 'November 30, 2021 3:00 PM',
        endTime : 'December 10, 2021 2:00 PM',
        details : 'Late 20th Century; Original, 11" height, Overall excellent condition. Appears to be complete and all original.',
        startPrice : '120'
    },

    {
        id: 10,
        item : 'Charter Arms Revolver',
        image: 'http://localhost:3000/images/revolver.jpg',
        category : 'guns',
        status : 'Closed',
        startTime : 'November 30, 2021 7:00 PM',
        endTime : 'December 10, 2021 2:00 PM',
        details : 'Traditional DA 5 shot sm. frame revolver',
        startPrice : '200'
    },

    {
        id: 11,
        item : 'Gold Eagle Diamond Necklace',
        image: 'http://localhost:3000/images/gold-necklace.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : 'December 12, 2021 5:00 PM',
        endTime : 'December 20, 2021 10:00 PM',
        details : 'Gold Eagle pendant necklace',
        startPrice : '300'
    },

    {
        id: 12,
        item : 'Copper Hanging Parrot Sculpture',
        image: 'http://localhost:3000/images/parrot-sculpture.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : 'December 16, 2021 1:00 PM',
        endTime : 'December 21, 2021 3:00 PM',
        details : 'Mid-Century Modern Brass & Copper Hanging Parrot Sculpture.',
        startPrice : '185'
    },

    {
        id: 13,
        item : 'Crystal Ducks & Turtle Figurines',
        image: 'http://localhost:3000/images/crystal-figurines.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : 'December 18, 2021 12:00 PM',
        endTime : 'January 12, 2022 3:00 PM',
        details : 'Crystal Ducks & Turtle Figurines',
        startPrice : '240'
    },

    {
        id: 14,
        item : 'Pocket Watch Hunter Case',
        image: 'http://localhost:3000/images/pocket-watch.jpg',
        category : 'jewelry',
        status : 'Closed',
        startTime : 'January 10, 2022 5:00 PM',
        endTime : 'January 25, 2022 3:00 PM',
        details : 'Early 20th Century pocket watch; Original, 1.5" diameter',
        startPrice : '150'
    },

    {
        id: 15,
        item : 'Autographed Warner Bros Sericel',
        image: 'http://localhost:3000/images/autographed-sericel.jpg',
        category : 'arts',
        status : 'Closed',
        startTime : 'January 31, 2022 8:00 AM',
        endTime : 'February 19, 2022 3:00 PM',
        details : 'Autographed Warner Bros Sylvester Hippetys Mummy sericel',
        startPrice : '142'
    },

    {
        id: 16,
        item : 'Bronze Bust',
        image: 'http://localhost:3000/images/bronze-bust.jpg',
        category : 'crafts',
        status : 'Closed',
        startTime : 'January 10, 2022 4:00 AM',
        endTime : 'February 12, 2022 12:00 PM',
        details : 'A vintage limited edition bronze bust by Gerson Frank',
        startPrice : '500'
    }
]

module.exports = auctions;