import ImageTile from "ol/ImageTile";
import Tile from "ol/Tile";
import TileState from "ol/TileState";

export async function tileLoadFunction(tile: Tile, src: string) {
  /*взято отсюда. Спасибо Mike https://gis.stackexchange.com/questions/368119/retrying-failed-tilewms-tile-load-in-openlayers*/

  console.log("tileLoadFunction called");
  if (!(tile instanceof ImageTile)) return;

  const image = tile.getImage() as HTMLImageElement;

  function attempt(attemptNo: number) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onload = () => {
      if (xhr.status === 200 && xhr.response) {
        const url = URL.createObjectURL(xhr.response);
        image.onload = () => URL.revokeObjectURL(url);
        image.src = url;
      } else {
        fail();
      }
    };

    xhr.onerror = fail;

    function fail() {
      if (attemptNo < 10) {
        // setTimeout(() => attempt(attemptNo + 1), attemptNo * 300);
        setTimeout(() => attempt(attemptNo + 1), 300);
      } else {
        tile.setState(TileState.ERROR);
      }
    }

    xhr.open("GET", src);
    return xhr.send();
  }

  attempt(1);
}

/**ВАРИАНТ который работал без tileLoad */

// const retries: Record<string, number> = {};
// const xhrMap = new WeakMap<ImageTile, XMLHttpRequest>();

// export async function tileLoadFunction(tile: Tile, src: string) {
//   // console.log("tileLoadFunction called");
//   if (!(tile instanceof ImageTile)) return;
//   const prev = xhrMap.get(tile);
//   if (prev) prev.abort();

//   const xhr = new XMLHttpRequest();
//   xhrMap.set(tile, xhr);

//   const image = tile.getImage() as HTMLImageElement;
//   xhr.responseType = "blob";

//   xhr.addEventListener("loadend", function () {
//     const data = this.response;
//     if (data !== undefined && data !== null) {
//       image.src = URL.createObjectURL(data);
//     } else {
//       tile.setState(TileState.ERROR);
//     }
//   });

//   xhr.onreadystatechange = function () {
//     // console.log(
//     //   "xhr.readyState, xhr.status, xhr: ",
//     //   xhr.readyState,
//     //   xhr.status,
//     //   xhr,
//     // );
//     if ((xhr.readyState === 4 && xhr.status === 0) || xhr.status === 204) {
//       retries[src] = (retries[src] || 0) + 1;
//       // console.log("retries ", retries[src]);
//       if (retries[src] <= 100) {
//         setTimeout(() => tile.load(), retries[src] * 300);
//       }
//     }
//   };

//   xhr.open("GET", src);
//   return xhr.send();
// }
