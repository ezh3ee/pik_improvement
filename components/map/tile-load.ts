import ImageTile from "ol/ImageTile";
import Tile from "ol/Tile";
import TileState from "ol/TileState";

const retries: Record<string, number> = {};
const xhrMap = new WeakMap<ImageTile, XMLHttpRequest>();

export async function tileLoadFunction(tile: Tile, src: string) {
  if (!(tile instanceof ImageTile)) return;

  const prev = xhrMap.get(tile);
  if (prev) prev.abort();

  const xhr = new XMLHttpRequest();
  xhrMap.set(tile, xhr);

  const image = tile.getImage() as HTMLImageElement;
  xhr.responseType = "blob";

  xhr.addEventListener("loadend", function () {
    const data = this.response;
    if (data !== undefined && data !== null) {
      image.src = URL.createObjectURL(data);
    } else {
      tile.setState(TileState.ERROR);
    }
  });

  xhr.onreadystatechange = function () {
    if ((xhr.readyState === 4 && xhr.status === 0) || xhr.status === 204) {
      retries[src] = (retries[src] || 0) + 1;
      if (retries[src] <= 10) {
        setTimeout(() => tile.load(), retries[src] * 300);
      }
    }
  };

  xhr.open("GET", src);
  return xhr.send();
}
