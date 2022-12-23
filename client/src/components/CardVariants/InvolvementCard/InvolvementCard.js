import { useState } from 'react';

import InvolvementCardPopup from '@components/CardVariants/InvolvementCard/InvolvementCardPopup';

export default function InvolvementCard({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="min-w-full rounded-lg overflow-hidden shadow-lg transition-colors bg-white hover:bg-green-300"
      >
        {info.details.thumbnail ? (
          <div className="overflow-hidden max-h-56 flex justify-center">
            <img
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.activity}`}
              className="w-full object-cover transform scale-75"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="m-3 grid grid-rows-2 grid-cols-1 divide-y ">
          <div>
            <h2 className="text-xl font-bold">{info.details.activity}</h2>
            <h3 className="italic">{info.details.position}</h3>
            <h3>
              {info.details['start-date']}
              {info.details['end-date'] === info.details['start-date'] ? (
                <></>
              ) : info.details['end-date'] === '' ? (
                ' - Present'
              ) : (
                ` - ${info.details['end-date']}`
              )}
            </h3>
          </div>
          <h3>{info.details['short-description']}</h3>
        </div>
      </button>

      <InvolvementCardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </div>
  );
}
