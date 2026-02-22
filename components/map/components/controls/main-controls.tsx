"use client";

// import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import LayersSwitch from "@/components/map/components/controls/layer-switch/layers-switch";
import OpacityCtrl from "@/components/map/components/controls/opacity-ctrl";
import ShowGeoRefOnMapOnly from "@/components/map/components/controls/show-georef-on-map-only-btn";
import ToggleRefImageButton from "@/components/map/components/controls/toggle-refimg-button";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRefPointsStore } from "../../state/refpoints-store";

export default function MainControls() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const isGeoRefImgVisible = useGeoreferenceStore(
    (state) => state.isGeoRefImgVisible,
  );
  const isImagePathSet = useGeoreferenceStore((state) => state.imagePath);
  const showGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.showGeoRefImgOnMapOnly,
  );
  const isPointsReady = useRefPointsStore(
    (state) =>
      state.refPoints.length >= 2 && state.mainMapRefPoints.length >= 2,
  );

  const showOpacityCtrl =
    isImagePathSet &&
    isPointsReady &&
    ((!isGeoRefVisible && showGeoRefImgOnMapOnly) ||
      (isGeoRefVisible && isGeoRefImgVisible));

  const showOnlyGeoRefBtn = !isGeoRefVisible && isImagePathSet && isPointsReady;
  const showToggleImageBtn = isGeoRefVisible && isImagePathSet && isPointsReady;

  return (
    <>
      <ButtonGroup className="main-controls">
        <ButtonGroup>
          {showOnlyGeoRefBtn && <ShowGeoRefOnMapOnly />}
          {showToggleImageBtn && <ToggleRefImageButton />}
          <GeoreferenceBtn />
        </ButtonGroup>
        {/* <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterIcon />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon />
                  Label As...
                </DropdownMenuSubTrigger>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup> */}
      </ButtonGroup>
      {showOpacityCtrl && <OpacityCtrl />}

      <LayersSwitch />
    </>
  );

  // return (
  //   <>
  //     {!isGeoRefVisible && isImagePathSet && isPointsReady && (
  //       <>
  //         {showGeoRefImgOnMapOnly && <OpacityCtrl />}
  //         <ShowGeoRefOnMapOnly />
  //       </>
  //     )}
  //     {isGeoRefVisible && isImagePathSet && isPointsReady && (
  //       <>
  //         {isGeoRefImgVisible && <OpacityCtrl />}
  //         <ToggleRefImageButton />
  //       </>
  //     )}
  //     <LayersSwitch />
  //     <GeoreferenceBtn />
  //   </>
  // );
}
