import { useState } from 'react';

import InvolvementCardPopup from '@components/CardVariants/InvolvementCard/InvolvementCardPopup';

export default function InvolvementCard({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="max-w-xs rounded overflow-hidden shadow-lg transition-colors bg-white hover:bg-green-250"
      >
        {info.details.thumbnail ? (
            <img
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.activity}`}
              className="w-full"
            />
        ) : (
          <></>
        )}
        <div className="px-3 py-4">
            <h2 className="text-xl font-bold">{info.details.activity}</h2>
            <h3 className="italic">{info.details.position}</h3>
            <h3 className='mb-2'>
              {info.details['start-date']}
              {info.details['end-date'] === info.details['start-date'] ? (
                <></>
              ) : info.details['end-date'] === '' ? (
                ' - Present'
              ) : (
                ` - ${info.details['end-date']}`
              )}
            </h3>
          <h3>{info.details['short-description']}</h3>
        </div>
      </button>

      <InvolvementCardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </>
  );
}
