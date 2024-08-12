import clsx from 'clsx';
import { useState, useRef, createContext, useContext } from 'react';
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';

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
  const Icon = isOpen ? RiIndeterminateCircleLine : RiAddCircleLine;
  return (
    <button
      className={clsx(
        'w-full',
        'flex gap-6 justify-between items-center',
        'rounded',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        'text-left text-lg text-neutral-900 font-medium'
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
      id={`accordion-header-${id}`}>
      <span>{children}</span>
      <Icon className="size-6 text-neutral-400" />
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
        'overflow-hidden transition-max-height duration-300',
        'pr-12',
        isOpen && 'mt-2'
      )}
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
      }}
      ref={contentRef}>
      {children}
    </div>
  );
};

const Accordion = ({ children }) => {
  return (
    <div className="w-full">
      {children.map((item, index) => (
        <div key={item.props.id}>
          {item}
          {index !== children.length - 1 && (
            <div className="h-[1px] bg-neutral-200 mt-8 mb-[23px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
