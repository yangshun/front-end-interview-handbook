import { useId, useState } from 'react';

function getAccordionHeaderId(accordionId, value) {
  return accordionId + '-header-' + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + '-panel-' + value;
}

export default function Accordion({ sections }) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(
    new Set(),
  );

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);
        const headerId = getAccordionHeaderId(
          accordionId,
          value,
        );
        const panelId = getAccordionPanelId(
          accordionId,
          value,
        );

        return (
          <div className="accordion-item" key={value}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              id={headerId}
              className="accordion-item-title"
              type="button"
              onClick={() => {
                const newOpenSections = new Set(
                  openSections,
                );
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}>
              {title}{' '}
              <span
                aria-hidden={true}
                className={[
                  'accordion-icon',
                  isExpanded && 'accordion-icon--rotated',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              aria-labelledby={headerId}
              role="region"
              className="accordion-item-contents"
              id={panelId}
              hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
