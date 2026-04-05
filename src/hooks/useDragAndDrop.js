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
    removeGhost();
    const ghost = element.cloneNode(true);
    ghost.style.cssText = `
      position: fixed;
      top: ${y - 40}px;
      left: ${x - 70}px;
      width: min(${element.offsetWidth}px, 180px);
      pointer-events: none;
      opacity: 0.9;
      z-index: 9999;
      transition: none;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(59,130,246,0.4);
    `;
    document.body.appendChild(ghost);
    ghostRef.current = ghost;
    return ghost;
  }, []);

  const removeGhost = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  }, []);

  const getDropZoneAtPoint = useCallback((x, y) => {
    // Temporarily hide ghost to get element underneath
    if (ghostRef.current) ghostRef.current.style.display = 'none';
    const elements = document.elementsFromPoint(x, y);
    if (ghostRef.current) ghostRef.current.style.display = '';
    for (const el of elements) {
      // Check data-zoneid on the element or its ancestors
      const zoneEl = el.closest('[data-zoneid]');
      if (zoneEl) return zoneEl.dataset.zoneid;
    }
    return null;
  }, []);

  const handleTouchStart = useCallback((e, boneId) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStateRef.current = { boneId, startX: touch.clientX, startY: touch.clientY };
    setDraggingId(boneId);
    createGhost(e.currentTarget, touch.clientX, touch.clientY);
  }, [createGhost]);

  const handleTouchMove = useCallback((e) => {
    if (!touchStateRef.current || e.touches.length !== 1) return;
    e.preventDefault(); // Prevent page scroll
    const touch = e.touches[0];

    if (ghostRef.current) {
      ghostRef.current.style.top = `${touch.clientY - 40}px`;
      ghostRef.current.style.left = `${touch.clientX - 70}px`;
    }

    const zoneId = getDropZoneAtPoint(touch.clientX, touch.clientY);
    setDragOverZone(zoneId);
  }, [getDropZoneAtPoint]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStateRef.current || e.changedTouches.length !== 1) return;
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
