import Masonry from 'react-masonry-css';
import _ from "lodash";

const PortThree = () => {
    const BASE_URL = import.meta.env.BASE_URL;
    const items = [
        { id: 1, image: `img/smeg.png`, title: 'smeg',url:"https://hongseockkim.github.io/portpolio/page/01/"},
        { id: 2, image: `img/daelim.png`, title: '대림 코퍼레이션',url:"https://hongseockkim.github.io/portpolio/page/02/" },
        { id: 3, image: `img/children.png`, title: '육아정책연구소',url:"https://hongseockkim.github.io/portpolio/page/03/" },
        { id: 4, image: `img/canvas.png`, title: 'canvas',url:"https://hongseockkim.github.io/portpolio/page/06/" },
        { id: 5, image: `img/sympol.png`, title: 'liveto',url:'' },
        { id: 6, image: `img/ugly.png`, title: '어글리스토브',url:"https://hongseockkim.github.io/portpolio/page/05/" },
        { id: 7, image: `img/seemple.png`, title: '심플',url:'' },
        { id: 8, image: `img/bankx2.png`, title: '뱅크엑스',url:'' },
        { id: 9, image: `img/tankyoy.png`, title: '땡큐마켓',url:'' },
        { id: 10, image: `img/haru.png`, title: '하루세탁',url:'' },
        { id: 11, image: `img/sild.png`, title: '실드',url:'' },
        { id: 11, image: `img/pickko.png`, title: '픽코앱',url:'' },
        { id: 12, image: `img/pickko_kisok.png`, title: '키오스크',url:'' },
    ];

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const handleNavigate = (url) => {
        if(!url) return;
        console.log('#######');
        console.log('url',url);
        console.log('#######');
    }

    return (
        <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
      {
          items.map(item => {
              const linked = _.defaultTo(item.url,false);
              return(
                  <div key={item.id} className="masonry-item" onClick={() => handleNavigate(linked)}>
                      <img src={item.image} alt={item.title} />
                      <h3>{item.title}</h3>
                  </div>
              )
          })
      }
    </Masonry>
    );
};

export default PortThree;