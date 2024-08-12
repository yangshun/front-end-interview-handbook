import Modal from 'src/components/ui/Modal';
import Reviews from 'src/components/Reviews';
import ProductReviewsContextProvider from 'src/components/Reviews/ProductReviewsContext';

const ProductReviewsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ProductReviewsContextProvider>
        <Reviews />
      </ProductReviewsContextProvider>
    </Modal>
  );
};

export default ProductReviewsModal;
