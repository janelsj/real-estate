import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Content({isLoaded, dataToShow}){

  const override = css`
    display: block;
    margin: 0 auto;
    padding-top: 20px;
    border-color: blue;
`;

  return(<div className="graph">
    {isLoaded ? 
        dataToShow
        : <ScaleLoader color='gray' loading={!isLoaded} css={override} height={70} width={10} radius={30} margin={5}/>
      }
    </div>)
}

export default Content;