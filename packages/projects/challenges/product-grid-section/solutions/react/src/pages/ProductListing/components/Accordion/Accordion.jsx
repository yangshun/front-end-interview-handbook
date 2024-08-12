import clsx from 'clsx';
import { useState, useRef, createContext, useContext } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

const AccordionItemContext = createContext();

const AccordionItem = ({ children, id }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <AccordionItemContext.Provider value={{ id, isOpen, setIsOpen }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
};

const AccordionTrigger = ({ children }) => {
  const { id, isOpen, setIsOpen } = useContext(AccordionItemContext);
  const Icon = isOpen ? RiSubtractLine : RiAddLine;
  return (
    <button
      className={clsx(
        'w-full',
        'flex items-center justify-between gap-6',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        'text-left font-medium text-neutral-900',
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
      id={`accordion-header-${id}`}>
      <span>{children}</span>
      <Icon className="m-0.5 size-5 text-neutral-600" aria-hidden={true} />
    </button>
  );
};

const AccordionContent = ({ children }) => {
  const contentRef = useRef(null);
  const { id, isOpen } = useContext(AccordionItemContext);

  return (
    <div
      id={`accordion-content-${id}`}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      className={clsx(
        'overflow-hidden',
        'pr-12',
        isOpen && 'mt-6',
        'transition-max-height origin-top transform duration-300 ease-in-out',
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
      )}
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
      }}
      ref={contentRef}>
      <div className="text-neutral-600">{children}</div>
    </div>
  );
};

const Accordion = ({ children }) => {
  const hasMultipleItem = Array.isArray(children);
  return (
    <div className="w-full">
      {!hasMultipleItem
        ? children
        : children.map((item) => (
            <div key={item.props.id}>
              {item}
              <div className="my-6 h-[1px] bg-neutral-200" />
            </div>
          ))}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
