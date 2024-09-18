import { Masonry } from "masonic";
import Piece, { PieceCard } from "../../components/Piece/Piece";

const pieces = [];

// Testing Code for Development
const testImageUrls = [
    'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg',
    './src/assets/examplecarouselimage.jpg',
    'https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L',
    'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
]


for (let i = 0; i < 200; i++) {
    const randomIndex = Math.floor(Math.random() * testImageUrls.length)
    const randomUrl = testImageUrls[randomIndex]
    pieces.push(new Piece({ imageUrl: randomUrl }))
}

// Testing code END

const Feed = () => {
    return (
        <div className="p-3">
            <Masonry items={pieces} render={MasonryTile} columnGutter={5} className="p-5" />
        </div>
    )
};

const MasonryTile = ({ data }) => (
    <PieceCard {...data} />
);

export default Feed;