import { FC, memo, useEffect } from 'react';
import './BulkAction.scss';
interface IBulkAction {
  onRemoveMultiple: () => void;
}

const BulkAction: FC<IBulkAction> = ({ onRemoveMultiple }) => {
  return (
    <div className="bulk__container">
      <span>Bulk Action:</span>
      <div className="bulk__button-group">
        <button className="bulk__done-button">Done</button>
        <button className="bulk__remove-button" onClick={onRemoveMultiple}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default memo(BulkAction);
