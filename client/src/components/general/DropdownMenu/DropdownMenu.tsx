import React, { useEffect, useRef, useState } from "react";
import "./DropdownMenu.scss";
import Portal from "components/layout/Portal";
import useWindowSize from "Hooks/useWindowSize";
import { DropdownMenuProps } from ".";
import { useClickOutside } from "Hooks/useClickOutside";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  anchorEl,
  offset = { x: 0, y: 0 },
  onClickClose = true,
  scrollableAt,
}) => {
  const [width] = useWindowSize();
  const [cords, setCords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [show, setShow] = useState(false);
  const offsetRef = useRef(offset);
  const dropDownMenuRef = useRef<HTMLUListElement>(null);

  const closeMenuClickHandler = () => setShow(false);
  useClickOutside(dropDownMenuRef, closeMenuClickHandler);

  useEffect(() => {
    const dropDownMenuAnchorElement = anchorEl.current;

    const openMenu = () => {
      const rect = anchorEl.current.getBoundingClientRect();
      setCords({
        left: rect.x + rect.width + offsetRef.current.x,
        top: rect.y + window.scrollY + offsetRef.current.y,
      });
      setShow(true);
    };

    dropDownMenuAnchorElement.addEventListener("click", openMenu);

    setShow(false);
    return () => {
      dropDownMenuAnchorElement.removeEventListener("click", openMenu);
    };
  }, [width, anchorEl]);

  const computeClassName = () => {
    const classes: string[] = ["drop-down-menu", "scrollbar"];
    classes.push(className || "");
    return classes.join(" ");
  };

  if (show) {
    return (
      <Portal mountTo="root-menu">
        <ul
          ref={dropDownMenuRef}
          style={{ top: cords.top, left: cords.left, maxHeight: scrollableAt }}
          onClick={onClickClose ? closeMenuClickHandler : undefined}
          className={computeClassName()}>
          {children}
        </ul>
      </Portal>
    );
  } else {
    return null;
  }
};

export default DropdownMenu;
