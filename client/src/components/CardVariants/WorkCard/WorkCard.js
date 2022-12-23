import { useState } from 'react';

import WorkCardPopup from '@components/CardVariants/WorkCard/WorkCardPopup';

export default function WorkCard({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="min-w-full rounded-lg overflow-hidden shadow-lg transition-colors bg-white hover:bg-green-250"
      >
        {info.details.thumbnail ? (
          <div className="overflow-hidden max-h-56 flex justify-center">
            <img
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.company}`}
              className="w-full object-cover"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="m-3 grid grid-rows-2 grid-cols-1 divide-y ">
          <div>
            <h2 className="text-xl font-bold">{info.details.company}</h2>
            <h3 className="italic">{info.details.title}</h3>
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

      <WorkCardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </div>
  );
}
