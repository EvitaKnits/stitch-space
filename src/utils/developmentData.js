// Arrays of sample data from Lorem Picsum, compiled by GPT-4o
const titles = [
    'Sunset Serenity',
    'Mountain Majesty',
    'Urban Exploration',
    'Tranquil Waters',
    'Forest Pathway',
    'Desert Dunes',
    'City Lights',
    'Ocean Waves',
    'Countryside Charm',
    'Winter Wonderland',
    'Blooming Garden',
    'Starry Night',
    'Golden Hour',
    'Historic Landmark',
    'Vibrant Market',
    'Mystic Forest',
    'Rustic Barn',
    'Tropical Paradise',
    'Ancient Ruins',
    'River Reflection',
    'Cloudy Skies',
    'Coastal Cliffs',
    'Lush Greenery',
    'Quiet Village',
    'Rolling Hills',
    'Cultural Festival',
    'Rainy Day',
    'Colorful Street Art',
    'Snow-Capped Peaks',
    'Serene Lake'
];

const images = [
    'https://picsum.photos/seed/1/800/600',
    'https://picsum.photos/seed/2/1200/800',
    'https://picsum.photos/seed/3/600/800',
    'https://picsum.photos/seed/4/800/1200',
    'https://picsum.photos/seed/5/1024/768',
    'https://picsum.photos/seed/6/768/1024',
    'https://picsum.photos/seed/7/1920/1080',
    'https://picsum.photos/seed/8/1080/1920',
    'https://picsum.photos/seed/9/1280/720',
    'https://picsum.photos/seed/10/720/1280',
    'https://picsum.photos/seed/11/1600/900',
    'https://picsum.photos/seed/12/900/1600',
    'https://picsum.photos/seed/13/800/800',
    'https://picsum.photos/seed/14/1024/1024',
    'https://picsum.photos/seed/15/640/480',
    'https://picsum.photos/seed/16/480/640',
    'https://picsum.photos/seed/17/1440/900',
    'https://picsum.photos/seed/18/900/1440',
    'https://picsum.photos/seed/19/2560/1440',
    'https://picsum.photos/seed/20/1440/2560',
    'https://picsum.photos/seed/21/3840/2160',
    'https://picsum.photos/seed/22/2160/3840',
    'https://picsum.photos/seed/23/320/240',
    'https://picsum.photos/seed/24/240/320',
    'https://picsum.photos/seed/25/800/450',
    'https://picsum.photos/seed/26/450/800',
    'https://picsum.photos/seed/27/1366/768',
    'https://picsum.photos/seed/28/768/1366',
    'https://picsum.photos/seed/29/1600/1200',
    'https://picsum.photos/seed/30/1200/1600',
    'https://picsum.photos/seed/31/1920/1200',
    'https://picsum.photos/seed/32/1200/1920',
    'https://picsum.photos/seed/33/1024/576',
    'https://picsum.photos/seed/34/576/1024',
    'https://picsum.photos/seed/35/800/500',
    'https://picsum.photos/seed/36/500/800',
    'https://picsum.photos/seed/37/1280/800',
    'https://picsum.photos/seed/38/800/1280',
    'https://picsum.photos/seed/39/1024/683',
    'https://picsum.photos/seed/40/683/1024',
    'https://picsum.photos/seed/41/1152/864',
    'https://picsum.photos/seed/42/864/1152',
    'https://picsum.photos/seed/43/800/533',
    'https://picsum.photos/seed/44/533/800',
    'https://picsum.photos/seed/45/960/540',
    'https://picsum.photos/seed/46/540/960',
    'https://picsum.photos/seed/47/640/360',
    'https://picsum.photos/seed/48/360/640',
    'https://picsum.photos/seed/49/1280/960',
    'https://picsum.photos/seed/50/960/1280',
    'https://picsum.photos/seed/51/2048/1536',
    'https://picsum.photos/seed/52/1536/2048',
    'https://picsum.photos/seed/53/2560/1600',
    'https://picsum.photos/seed/54/1600/2560',
    'https://picsum.photos/seed/55/3840/2400',
    'https://picsum.photos/seed/56/2400/3840',
    'https://picsum.photos/seed/57/720/480',
    'https://picsum.photos/seed/58/480/720',
    'https://picsum.photos/seed/59/800/480',
    'https://picsum.photos/seed/60/480/800',
    'https://picsum.photos/seed/61/1024/768',
    'https://picsum.photos/seed/62/768/1024',
    'https://picsum.photos/seed/63/1366/1024',
    'https://picsum.photos/seed/64/1024/1366',
    'https://picsum.photos/seed/65/1200/675',
    'https://picsum.photos/seed/66/675/1200',
    'https://picsum.photos/seed/67/1024/512',
    'https://picsum.photos/seed/68/512/1024',
    'https://picsum.photos/seed/69/960/640',
    'https://picsum.photos/seed/70/640/960',
    'https://picsum.photos/seed/71/1400/1050',
    'https://picsum.photos/seed/72/1050/1400',
    'https://picsum.photos/seed/73/800/600',
    'https://picsum.photos/seed/74/600/800',
    'https://picsum.photos/seed/75/1280/1024'
];

const artTypes = ['Embroidery', 'Weaving', 'Knitting', 'Crochet', 'Dyeing', 'Other'];

const users = [
    { userId: '1', userName: 'Alice Johnson' },
    { userId: '2', userName: 'Bob Smith' },
    { userId: '3', userName: 'Charlie Brown' },
    { userId: '4', userName: 'Diana Prince' },
    { userId: '5', userName: 'Ethan Hunt' },
    { userId: '6', userName: 'Fiona Davis' },
    { userId: '7', userName: 'George Miller' },
    { userId: '8', userName: 'Hannah Wilson' },
    { userId: '9', userName: 'Isaac Clark' },
    { userId: '10', userName: 'Julia Roberts' },
    { userId: '11', userName: 'Kevin Lee' },
    { userId: '12', userName: 'Laura King' },
    { userId: '13', userName: 'Mike Turner' },
    { userId: '14', userName: 'Nina Scott' },
    { userId: '15', userName: 'Oscar White' },
    { userId: '16', userName: 'Paula Green' },
    { userId: '17', userName: 'Quincy Adams' },
    { userId: '18', userName: 'Rachel Taylor' },
    { userId: '19', userName: 'Sam Young' },
    { userId: '20', userName: 'Tina Hill' },
    { userId: '21', userName: 'Uma Carter' },
    { userId: '22', userName: 'Victor Moore' },
    { userId: '23', userName: 'Wendy Lewis' },
    { userId: '24', userName: 'Xander Harris' },
    { userId: '25', userName: 'Yara Collins' },
    { userId: '26', userName: 'Zane Reed' },
    { userId: '27', userName: 'Aaron Evans' },
    { userId: '28', userName: 'Bella Stone' },
    { userId: '29', userName: 'Caleb James' },
    { userId: '30', userName: 'Dana Brooks' }
];

// Generates a random integer to select a random element from each array
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generates JSON for mock pieces
export function generateMockPieces(count = 10) {
    const pieces = [];

    for (let i = 0; i < count; i++) {
        const title = titles[getRandomInt(0, titles.length - 1)];
        const image = images[getRandomInt(0, images.length - 1)];
        const artType = artTypes[getRandomInt(0, artTypes.length - 1)];
        const user = users[getRandomInt(0, users.length - 1)];
        const rating = parseFloat((Math.random() * 5).toFixed(1));
        const id = (i + 1).toString();

        const piece = {
            id,
            title,
            image,
            userId: user.userId,
            userName: user.userName,
            artType,
            rating,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        pieces.push(piece);
    }

    return {
        pieces,
        pagination: {
            total: count,
            page: 1,
            pageSize: count,
            totalPages: 1,
        },
    };
}