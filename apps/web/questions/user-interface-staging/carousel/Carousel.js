import React, { useEffect, useRef, useState } from 'react';

const Carousel = ({ delay, children }) => {
  const ref = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    clearInterval(ref.current);
    ref.current = setInterval(() => {
      setIndex((index) => (children.length === index + 1 ? 0 : index + 1));
    }, delay);
    return () => clearInterval(ref.current);
  }, []);

  return (
    <div className="carousel">
      <div className="current">
        {children && children.length ? children[index] : null}
      </div>
      {children && children.length >= 2 && (
        <div
          className="buttons"
          style={{
            display: 'flex',
            direction: 'row',
          }}>
          <button
            className="button-previous"
            onClick={() => {
              setIndex((index) => (index - 1 < 0 ? 0 : index - 1));
              clearInterval(ref.current);
              ref.current = setInterval(() => {
                setIndex((index) =>
                  children.length === index + 1 ? 0 : index + 1,
                );
              }, delay);
            }}>
            Previous
          </button>
          <button
            className="button-next"
            onClick={() => {
              setIndex((index) =>
                children.length === index + 1 ? 0 : index + 1,
              );
              clearInterval(ref.current);
              ref.current = setInterval(() => {
                setIndex((index) =>
                  children.length === index + 1 ? 0 : index + 1,
                );
              }, delay);
            }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
