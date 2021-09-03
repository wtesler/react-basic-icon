import React, {useCallback, useEffect, useRef, useState} from "react";
import Icon from "../icon/Icon";
import './SignedIcon.css';

/**
 * A wrapper around Icon which makes it easier to present images coming from signed urls.
 * Pass in `signedUrl` prop if image is coming from a signed url.
 * Pass in `src` prop if image is conventional src.
 */
const SignedIcon = props => {
  const {signedUrl, src} = props;

  const [state, setState] = useState({});
  const [internalSrc, setInternalSrc] = useState(null);

  const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const ref = controllerRef;
    return () => {
      ref.current.abort();
    }
  }, [controllerRef]);

  useEffect(() => {
    setState({
      id: props.id,
      className: props.className ? props.className : '',
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

  const loadImage = useCallback(async (signedUrl) => {
    try {
      const options = {
        headers: new Headers({'content-type': 'text/plain'}),
        signal: controllerRef.current.signal
      };

      const response = await fetch(signedUrl, options);
      const data = await response.text();
      setInternalSrc(data);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.warn(e);
        setInternalSrc(BLANK_IMAGE);
      }
    }
  }, [controllerRef]);

  useEffect(() => {
    if (signedUrl) {
      loadImage(signedUrl);
    }
  }, [signedUrl, loadImage]);

  useEffect(() => {
    if (src) {
      setInternalSrc(src);
    }
  }, [src]);

  return (
    <Icon
      id={state.id}
      className={`${state.className}`}
      src={internalSrc ? internalSrc : BLANK_IMAGE}
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
    />
  );
}

export default SignedIcon;
