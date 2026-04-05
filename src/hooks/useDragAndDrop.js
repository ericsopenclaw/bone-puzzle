import { useState, useCallback, useRef } from 'react';

export function useDragAndDrop(onDrop) {
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(null);
  const dragDataRef = useRef(null);

  const handleDragStart = useCallback((e, boneId) => {
    setDraggingId(boneId);
    dragDataRef.current = boneId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', boneId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverZone(null);
    dragDataRef.current = null;
  }, []);

  const handleDragOver = useCallback((e, zoneId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverZone(zoneId);
  }, []);

  const handleDragLeave = useCallback((e) => {
    // Only clear if leaving the drop zone entirely (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverZone(null);
    }
  }, []);

  const handleDrop = useCallback((e, zoneId) => {
    e.preventDefault();
    const boneId = e.dataTransfer.getData('text/plain') || dragDataRef.current;
    setDragOverZone(null);
    setDraggingId(null);
    dragDataRef.current = null;
    if (boneId && onDrop) {
      onDrop(boneId, zoneId);
    }
  }, [onDrop]);

  return {
    draggingId,
    dragOverZone,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

// Touch drag and drop hook for mobile/tablet support
export function useTouchDragAndDrop(onDrop) {
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(null);
  const touchStateRef = useRef(null);
  const ghostRef = useRef(null);

  const createGhost = useCallback((element, x, y) => {
    const ghost = element.cloneNode(true);
    ghost.style.cssText = `
      position: fixed;
      top: ${y - 30}px;
      left: ${x - 60}px;
      width: ${element.offsetWidth}px;
      pointer-events: none;
      opacity: 0.85;
      transform: scale(1.05);
      z-index: 9999;
      transition: none;
    `;
    document.body.appendChild(ghost);
    return ghost;
  }, []);

  const removeGhost = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  }, []);

  const getDropZoneAtPoint = useCallback((x, y) => {
    const elements = document.elementsFromPoint(x, y);
    for (const el of elements) {
      const zoneId = el.dataset.zoneid;
      if (zoneId) return zoneId;
    }
    return null;
  }, []);

  const handleTouchStart = useCallback((e, boneId) => {
    const touch = e.touches[0];
    touchStateRef.current = { boneId, startX: touch.clientX, startY: touch.clientY };
    setDraggingId(boneId);

    const ghost = createGhost(e.currentTarget, touch.clientX, touch.clientY);
    ghostRef.current = ghost;
  }, [createGhost]);

  const handleTouchMove = useCallback((e) => {
    if (!touchStateRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];

    if (ghostRef.current) {
      ghostRef.current.style.top = `${touch.clientY - 30}px`;
      ghostRef.current.style.left = `${touch.clientX - 60}px`;
    }

    const zoneId = getDropZoneAtPoint(touch.clientX, touch.clientY);
    setDragOverZone(zoneId);
  }, [getDropZoneAtPoint]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStateRef.current) return;
    const touch = e.changedTouches[0];
    const { boneId } = touchStateRef.current;

    removeGhost();
    const zoneId = getDropZoneAtPoint(touch.clientX, touch.clientY);

    setDraggingId(null);
    setDragOverZone(null);
    touchStateRef.current = null;

    if (zoneId && onDrop) {
      onDrop(boneId, zoneId);
    }
  }, [getDropZoneAtPoint, removeGhost, onDrop]);

  return {
    draggingId,
    dragOverZone,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
