import React, {useEffect, useState} from 'react';
import './Winkel.css';
import axios from 'axios';
import SideBar from "../../components/navigation/Sidebar.jsx";
import GenreList from "../../components/RawgComponents/GenreList.jsx";
import GlobalApi from "../../Services/GlobalApi.jsx";
import Banner from "../../components/RawgComponents/Banner.jsx";
import TrendingGames from "../../components/RawgComponents/TrendingGames.jsx";

function Home() {
/* Todo
*alle getallgames stuff en calls moeten uiteindelijk naar de zoek pagina
* generalised classnames als gridCOl2 kunnen naar een meer centrale plek misschien
* */
    const [allGameList,setAllGameList] = useState();
    useEffect(() => {
        getAllGamesList();
    },[])

  const getAllGamesList=()=>{
      GlobalApi.getAllGames.then((response) => {
          console.log(response.data.results);
          setAllGameList(response.data.results);
      })
  }
  return (

      /*
      meerdere classnames syntax
      <div className={`${class1} ${class2}`}>My Component</div>
       */

      <>
          <div className="gridCol2">
              <div className="home-sidebar">
                  Genre
                      <h2 className="SidebarH2">
                          Categorieën
                      </h2>
                      <p>
                          Nieuw
                      </p>
                      <p>
                          Populair
                      </p>
                      <p>
                          Gratis
                      </p>
                      <GenreList/>
              </div>
              <div className="homepage-container">
                  Game List
                  <featured>
                      <h2 className="description">Uitgelicht</h2>
                  </featured>
                  <div className="gameBanner">
                      {allGameList?.length > 0 ?
                          <div>
                          <Banner gameBanner={allGameList[0]}/>
                          <TrendingGames></TrendingGames>
                          </div>
                          : null}
                  </div>

                  <p className="content-container-center">
                      Consectetur adipisicing elit. Blanditiis cum, dolor ea enim fugiat fugit id inventore ipsam libero
                      magni
                      modi natus
                      necessitatibus nisi optio quas qui quis quo, reprehenderit saepe similique sint sit soluta ut
                      veritatis
                      voluptatem.
                      Ab aliquid amet animi aperiam assumenda, atque autem dolorum ducimus et excepturi ipsa magnam nemo
                      nulla
                      possimus provident,
                      quos ratione repellendus sed sequi tempore! Accusantium amet commodi deleniti exercitationem
                      impedit
                      obcaecati quis repudiandae!
                      Consectetur eligendi ipsam odio repellendus sequi veniam voluptas? Adipisci at consectetur eaque
                      fuga hic
                      inventore ipsa magnam
                      provident vitae. Ad animi commodi consectetur, corporis dicta doloremque dolorum error hic
                      inventore iste
                      laudantium libero magnam
                      mollitia necessitatibus nemo nesciunt nihil non obcaecati odio odit pariatur quae quaerat quas
                      quisquam
                      quos rem sapiente sequi
                      similique sint vero? Accusamus aliquam aliquid blanditiis consequatur est et minima mollitia neque
                      non,
                      odit perspiciatis placeat
                      provident quos, similique sit totam vero. Beatae consequatur cupiditate rerum?
                  </p>
              </div>
          </div>
      </>
  );
}

export default Home;