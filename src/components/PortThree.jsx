import Masonry from 'react-masonry-css';

const PortThree = () => {
    const items = [
        { id: 1, image: '/img/smeg.png', title: 'smeg' },
        { id: 2, image: '/img/daelim.png', title: '대림 코퍼레이션' },
        { id: 3, image: '/img/children.png', title: '육아정책연구소' },
        { id: 4, image: '/img/canvas.png', title: 'canvas' },
        { id: 5, image: '/img/sympol.png', title: 'liveto' },
        { id: 6, image: '/img/ugly.png', title: '어글리스토브' },
        { id: 7, image: '/img/seemple.png', title: '심플' },
        { id: 8, image: '/img/bankx2.png', title: '뱅크엑스' },
        { id: 9, image: '/img/tankyoy.png', title: '땡큐마켓' },
        { id: 10, image: '/img/haru.png', title: '하루세탁' },
        { id: 11, image: '/img/sild.png', title: '실드' },
        { id: 11, image: '/img/pickko.png', title: '픽코앱' },
        { id: 12, image: '/img/pickko_kisok.png', title: '키오스크' },
    ];

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
      {items.map(item => (
          <div key={item.id} className="masonry-item">
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </Masonry>
    );
};

export default PortThree;