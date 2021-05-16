import { useState } from 'react';

import CardPopup from '@components/Card/CardPopup';

export default function Card({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="w-9/12 rounded-lg overflow-hidden shadow-lg bg-white hover:bg-green-100"
      >
        {info.details.thumbnail ? (
          <div className="overflow-hidden">
            <img
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.title}`}
              className="w-full object-cover transform scale-125"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="my-3">
          <h2 className="text-xl font-bold">{info.details.title}</h2>
          <h3 className="italic text-sm text-gray-600">
            {/* Regex from https://beutelevision.com/blog2/2011/06/17/get-the-first-n-words-with-javascript/ */}
            {info.details.technologies.replace(/(([^\s]+\s\s*){5})(.*)/, '$1…')}
          </h3>
        </div>
      </button>

      <CardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </div>
  );
}
