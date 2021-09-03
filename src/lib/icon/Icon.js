import React, {useCallback, useEffect, useState} from "react";
import "./Icon.css";

/**
 * An image element that is easier to work with than a regular <img/> element.
 *
 * Mainly it prevents context menu and drag gestures.
 */
const Icon = props => {
  const {enableContextMenu} = props;

  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      id: props.id,
      className: props.className ? props.className : "",
      src: props.src,
      onClick: props.onClick,
      onLoad: props.onLoad,
      onDrop: props.onDrop,
      onDragOver: props.onDragOver,
      onDragEnter: props.onDragEnter,
      onDragLeave: props.onDragLeave,
      onMouseEnter: props.onMouseEnter,
      onTouchStart: props.onTouchStart,
      onMouseLeave: props.onMouseLeave,
      onTouchMove: props.onTouchMove,
      onContextMenu: props.onContextMenu,
      onError: props.onError,
      style: props.style,
    });
  }, [props]);

  const preventContextMenu = useCallback((event) => {
    if (!enableContextMenu) {
      event.preventDefault();
    }
    if (state.onContextMenu) {
      state.onContextMenu();
    }
  }, [enableContextMenu, state]);

  return (
    <img
      id={state.id}
      className={`${state.className} IconNoSelect`}
      src={state.src}
      onClick={state.onClick}
      onLoad={state.onLoad}
      onDrop={state.onDrop}
      onDragOver={state.onDragOver}
      onDragEnter={state.onDragEnter}
      onDragLeave={state.onDragLeave}
      onMouseEnter={state.onMouseEnter}
      onTouchStart={state.onTouchStart}
      onMouseLeave={state.onMouseLeave}
      onTouchMove={state.onTouchMove}
      onError={state.onError}
      style={state.style}
      alt={""}
      draggable={false}
      onContextMenu={preventContextMenu}
    />
  );
}

export default Icon;
